"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Trash2, Loader2, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";

export type PlaygroundLang = "python" | "javascript" | "html" | "shell";

interface OutputLine {
  type: "log" | "error" | "system" | "prompt";
  text: string;
}

interface CodePlaygroundProps {
  defaultLang?: PlaygroundLang;
}

const STARTERS: Record<PlaygroundLang, string> = {
  python: `# Pythonda yozing va sinab ko'ring\nfor i in range(1, 6):\n    print(f"{i} x {i} = {i * i}")`,
  javascript: `// JavaScriptda yozing va sinab ko'ring\nconst names = ["Ali", "Vali", "Soli"];\nnames.forEach((n) => console.log("Salom, " + n));`,
  html: `<!-- HTML va CSS yozing, natija o'ngda ko'rinadi -->\n<div style="font-family: sans-serif; text-align:center; padding:24px">\n  <h1 style="color:#6d28d9">Salom, dunyo!</h1>\n  <p>Bu mening birinchi sahifam.</p>\n</div>`,
  shell: `# Buyruqlarni sinab ko'ring (simulyatsiya)\npwd\nmkdir loyiha\nls\ngit init\ngit status`,
};

const LANGS: { id: PlaygroundLang; labelKey: "langPython" | "langJs" | "langHtml" | "langShell" }[] = [
  { id: "python", labelKey: "langPython" },
  { id: "javascript", labelKey: "langJs" },
  { id: "html", labelKey: "langHtml" },
  { id: "shell", labelKey: "langShell" },
];

// ── JavaScript runner (Web Worker, infinite-loop safe) ───────────────────────
const JS_WORKER_SRC = `
self.onmessage = (e) => {
  const fmt = (v) => {
    try {
      if (typeof v === "string") return v;
      if (typeof v === "object") return JSON.stringify(v, null, 0);
      return String(v);
    } catch { return String(v); }
  };
  const send = (type, args) => self.postMessage({ type, text: args.map(fmt).join(" ") });
  const console = {
    log: (...a) => send("log", a),
    error: (...a) => send("error", a),
    warn: (...a) => send("log", a),
    info: (...a) => send("log", a),
  };
  try {
    const fn = new Function("console", e.data);
    const r = fn(console);
    if (r !== undefined) send("log", [r]);
    self.postMessage({ type: "done" });
  } catch (err) {
    self.postMessage({ type: "error", text: (err && err.message) ? (err.name + ": " + err.message) : String(err) });
    self.postMessage({ type: "done" });
  }
};
`;

export const CodePlayground = ({ defaultLang = "javascript" }: CodePlaygroundProps) => {
  const { t } = useLanguage();
  const [lang, setLang] = useState<PlaygroundLang>(defaultLang);
  const [code, setCode] = useState<string>(STARTERS[defaultLang]);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [running, setRunning] = useState(false);
  const [pyLoading, setPyLoading] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState<string | null>(null);
  const pyodideRef = useRef<any>(null);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [output]);

  const push = (line: OutputLine) => setOutput((prev) => [...prev, line]);

  const switchLang = (next: PlaygroundLang) => {
    setLang(next);
    setCode(STARTERS[next]);
    setOutput([]);
    setHtmlPreview(null);
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + "    " + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  };

  // ── runners ────────────────────────────────────────────────────────────────
  const runJs = () =>
    new Promise<void>((resolve) => {
      let worker: Worker;
      try {
        const blob = new Blob([JS_WORKER_SRC], { type: "application/javascript" });
        worker = new Worker(URL.createObjectURL(blob));
      } catch {
        push({ type: "error", text: "Web Worker is not available in this browser." });
        return resolve();
      }
      const timer = setTimeout(() => {
        worker.terminate();
        push({ type: "error", text: "⏱ Timeout (3s) — possible infinite loop." });
        resolve();
      }, 3000);
      worker.onmessage = (ev: MessageEvent) => {
        const { type, text } = ev.data || {};
        if (type === "done") {
          clearTimeout(timer);
          worker.terminate();
          return resolve();
        }
        if (type === "log") push({ type: "log", text });
        if (type === "error") push({ type: "error", text });
      };
      worker.onerror = (err) => {
        clearTimeout(timer);
        worker.terminate();
        push({ type: "error", text: err.message || "Worker error" });
        resolve();
      };
      worker.postMessage(code);
    });

  const ensurePyodide = async () => {
    if (pyodideRef.current) return pyodideRef.current;
    setPyLoading(true);
    push({ type: "system", text: t.playground.loadingPython });
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Pyodide yuklanmadi"));
        document.head.appendChild(s);
      });
    }
    const pyodide = await (window as any).loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
    });
    pyodideRef.current = pyodide;
    setPyLoading(false);
    return pyodide;
  };

  const runPython = async () => {
    let pyodide;
    try {
      pyodide = await ensurePyodide();
    } catch (e: any) {
      push({ type: "error", text: e?.message || "Pyodide error" });
      return;
    }
    // Capture output inside Python (redirect_stdout/stderr into buffers).
    // Avoids Pyodide's setStdout batched callback, which throws OSError[29].
    try {
      pyodide.globals.set("__user_code__", code);
      await pyodide.runPythonAsync(`
import io, contextlib, traceback, builtins, js

# input() has no stdin in Pyodide -> use the browser prompt() dialog instead.
def __pg_input__(__p__=""):
    __v__ = js.prompt(str(__p__))
    if __v__ is None:
        raise EOFError("input bekor qilindi")
    print(str(__p__) + str(__v__))
    return str(__v__)
builtins.input = __pg_input__

__out__, __err__ = io.StringIO(), io.StringIO()
with contextlib.redirect_stdout(__out__), contextlib.redirect_stderr(__err__):
    try:
        exec(__user_code__, {"__name__": "__main__"})
    except SystemExit:
        pass
    except BaseException:
        traceback.print_exc()
__stdout__ = __out__.getvalue()
__stderr__ = __err__.getvalue()
`);
      const out = pyodide.globals.get("__stdout__");
      const err = pyodide.globals.get("__stderr__");
      if (out) push({ type: "log", text: String(out).replace(/\n$/, "") });
      if (err) push({ type: "error", text: String(err).replace(/\n$/, "") });
    } catch (e: any) {
      const msg = String(e?.message || e).trim().split("\n");
      push({ type: "error", text: msg.slice(-3).join("\n") });
    }
  };

  const runHtml = () => {
    setHtmlPreview(code);
  };

  // Tiny shell simulator for the terminal/git course.
  const runShell = () => {
    let cwd = "~/loyiha";
    const fs = new Set<string>(["README.md", "main.py"]);
    let gitInit = false;
    const out: OutputLine[] = [];
    for (const raw of code.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      out.push({ type: "prompt", text: `$ ${line}` });
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(" ");
      switch (cmd) {
        case "pwd":
          out.push({ type: "log", text: cwd.replace("~", "/home/student") });
          break;
        case "ls":
          out.push({ type: "log", text: [...fs].join("  ") || "(bo'sh)" });
          break;
        case "echo":
          out.push({ type: "log", text: arg.replace(/^["']|["']$/g, "") });
          break;
        case "whoami":
          out.push({ type: "log", text: "student" });
          break;
        case "date":
          out.push({ type: "log", text: new Date().toString() });
          break;
        case "cd":
          cwd = arg ? `~/${arg.replace(/^~?\/?/, "")}` : "~";
          break;
        case "mkdir":
          if (arg) {
            fs.add(arg + "/");
            out.push({ type: "log", text: "" });
          } else out.push({ type: "error", text: "mkdir: operand kerak" });
          break;
        case "touch":
          if (arg) fs.add(arg);
          break;
        case "git":
          out.push(...runGit(args, () => (gitInit = true), () => gitInit));
          break;
        case "clear":
          out.length = 0;
          break;
        default:
          out.push({ type: "error", text: `${cmd}: buyruq topilmadi (simulyatsiya)` });
      }
    }
    setOutput(out);
  };

  const run = async () => {
    setHtmlPreview(null);
    if (lang !== "shell") setOutput([]);
    setRunning(true);
    try {
      if (lang === "javascript") await runJs();
      else if (lang === "python") await runPython();
      else if (lang === "html") runHtml();
      else if (lang === "shell") runShell();
    } finally {
      setRunning(false);
    }
  };

  const busy = running || pyLoading;

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2">
          <TerminalSquare className="h-4 w-4 text-violet-600" />
          <span className="text-sm font-semibold text-slate-800">{t.playground.title}</span>
        </div>
        <div className="flex items-center gap-1">
          {LANGS.map((l) => (
            <button
              key={l.id}
              onClick={() => switchLang(l.id)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                lang === l.id
                  ? "bg-violet-600 text-white"
                  : "text-slate-600 hover:bg-slate-200"
              )}
            >
              {t.playground[l.labelKey]}
            </button>
          ))}
        </div>
      </div>

      <p className="px-4 pt-2 text-xs text-slate-500">
        {lang === "shell" ? t.playground.shellNote : t.playground.subtitle}
      </p>

      {/* editor */}
      <div className="p-3">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleTab}
          spellCheck={false}
          placeholder={t.playground.placeholder}
          className="w-full h-44 resize-y rounded-lg bg-slate-950 text-slate-100 font-mono text-[13px] leading-relaxed p-3 outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-slate-500"
        />
      </div>

      {/* actions */}
      <div className="flex items-center gap-2 px-3 pb-3">
        <button
          onClick={run}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60 transition-colors"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {busy ? t.playground.running : t.playground.run}
        </button>
        <button
          onClick={() => setCode(STARTERS[lang])}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60 transition-colors"
          title={t.playground.reset}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setOutput([]);
            setHtmlPreview(null);
          }}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60 transition-colors"
          title={t.playground.clear}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* output */}
      {lang === "html" ? (
        <div className="border-t border-slate-200">
          <div className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400 bg-slate-50">
            {t.playground.output}
          </div>
          {htmlPreview !== null ? (
            <iframe
              title="html-preview"
              sandbox="allow-scripts"
              srcDoc={htmlPreview}
              className="w-full h-56 bg-white"
            />
          ) : (
            <div className="px-4 py-6 text-sm text-slate-400">{t.playground.empty}</div>
          )}
        </div>
      ) : (
        <div className="border-t border-slate-200">
          <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              {t.playground.output}
            </span>
            {!busy && output.length > 0 && (
              <span className="text-[11px] text-emerald-400">✓ {t.playground.done}</span>
            )}
          </div>
          <div
            ref={outRef}
            className="max-h-56 overflow-auto bg-slate-950 px-4 py-3 font-mono text-[13px] leading-relaxed"
          >
            {output.length === 0 ? (
              <span className="text-slate-500">{t.playground.empty}</span>
            ) : (
              output.map((line, i) => (
                <pre
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    line.type === "error" && "text-red-400",
                    line.type === "log" && "text-slate-100",
                    line.type === "system" && "text-amber-400 italic",
                    line.type === "prompt" && "text-emerald-400"
                  )}
                >
                  {line.type === "error" && `⛔ ${t.playground.errorLabel}: `}
                  {line.text}
                </pre>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// canned git responses for the simulator
function runGit(args: string[], markInit: () => void, isInit: () => boolean): OutputLine[] {
  const sub = args[0];
  switch (sub) {
    case "init":
      markInit();
      return [{ type: "log", text: "Initialized empty Git repository in ~/loyiha/.git/" }];
    case "status":
      if (!isInit()) return [{ type: "error", text: "fatal: not a git repository (git init?)" }];
      return [
        { type: "log", text: "On branch main" },
        { type: "log", text: "No commits yet" },
        { type: "log", text: 'Untracked files:\n  README.md\n  main.py' },
      ];
    case "add":
      return [{ type: "log", text: "" }];
    case "commit":
      return [{ type: "log", text: "[main (root-commit) a1b2c3d] " + (args.includes("-m") ? args.slice(args.indexOf("-m") + 1).join(" ").replace(/^["']|["']$/g, "") : "commit") }];
    case "log":
      return [{ type: "log", text: "commit a1b2c3d (HEAD -> main)\nAuthor: student <student@example.com>\n\n    birinchi commit" }];
    case "branch":
      return [{ type: "log", text: "* main" }];
    case "remote":
      return [{ type: "log", text: "" }];
    case "push":
      return [{ type: "log", text: "Everything up-to-date" }];
    default:
      return [{ type: "error", text: `git: '${sub}' — simulyatsiyada qo'llab-quvvatlanmaydi` }];
  }
}
