/**
 * Seed script: 4 beginner courses (Python, JavaScript, Web HTML/CSS, Git & Terminal).
 * Descriptions are bilingual (Uzbek + Russian), matching the rest of the platform.
 *
 * Run with:
 *   npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/seed-beginner-courses.ts
 *
 * The owner (teacher) userId defaults to an existing account in the DB. Override with:
 *   SEED_TEACHER_ID=<clerk_user_id> npx ts-node ... scripts/seed-beginner-courses.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Owner of the courses. Defaults to the existing teacher account found in the DB.
const TEACHER_USER_ID = process.env.SEED_TEACHER_ID || "user_3EaoK50SCLTNkG8mwj6TMEDU3U7";

interface ChapterData {
  title: string;
  description: string;
  position: number;
  isFree: boolean;
}

interface CourseData {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  chapters: ChapterData[];
}

// ── COURSES ──────────────────────────────────────────────────────────────────

const courses: CourseData[] = [
  // ───────────────────────── 1. PYTHON ─────────────────────────
  {
    title: "Python asoslari — Boshlang'ichlar uchun | Основы Python — для начинающих",
    category: "Dasturlash",
    imageUrl: "/courses/python.svg",
    description:
      "Python dasturlash tilini noldan o'rganamiz: o'zgaruvchilar, shartlar, tsikllar va funksiyalar. " +
      "Dasturlashni hech qachon ko'rmaganlar uchun ideal.\n\n" +
      "Изучаем Python с нуля: переменные, условия, циклы и функции. Идеально для тех, кто никогда не программировал.",
    chapters: [
      {
        position: 1,
        isFree: true,
        title: "1. Python bilan tanishuv | Знакомство с Python",
        description: `<h2>UZ: Python nima?</h2>
<p>Python — o'rganish oson, kuchli dasturlash tili. U veb-saytlar, sun'iy intellekt va avtomatlashtirish uchun ishlatiladi.</p>
<p>python.org dan Python 3 ni o'rnating va birinchi dasturingizni yozing:</p>
<pre><code>print("Salom, dunyo!")</code></pre>
<hr/>
<h2>RU: Что такое Python?</h2>
<p>Python — простой в изучении и мощный язык. Его используют для сайтов, ИИ и автоматизации.</p>
<p>Установите Python 3 с python.org и напишите первую программу:</p>
<pre><code>print("Привет, мир!")</code></pre>`,
      },
      {
        position: 2,
        isFree: true,
        title: "2. O'zgaruvchilar va turlar | Переменные и типы",
        description: `<h2>UZ: O'zgaruvchilar</h2>
<pre><code>ism = "Ali"      # matn (str)
yosh = 20         # butun son (int)
bo'y = 1.75       # kasr son (float)
talaba = True     # mantiqiy (bool)
print(ism, yosh)</code></pre>
<hr/>
<h2>RU: Переменные</h2>
<pre><code>имя = "Али"      # строка (str)
возраст = 20      # целое (int)
рост = 1.75       # дробное (float)
студент = True    # логическое (bool)
print(имя, возраст)</code></pre>`,
      },
      {
        position: 3,
        isFree: false,
        title: "3. Shartlar va tsikllar | Условия и циклы",
        description: `<h2>UZ: if va for</h2>
<pre><code>yosh = 18
if yosh >= 18:
    print("Voyaga yetgan")
else:
    print("Yosh")

for i in range(1, 6):
    print(i)   # 1 2 3 4 5</code></pre>
<hr/>
<h2>RU: if и for</h2>
<pre><code>возраст = 18
if возраст >= 18:
    print("Совершеннолетний")
else:
    print("Молодой")

for i in range(1, 6):
    print(i)   # 1 2 3 4 5</code></pre>`,
      },
      {
        position: 4,
        isFree: false,
        title: "4. Funksiyalar va ro'yxatlar | Функции и списки",
        description: `<h2>UZ: Funksiya va list</h2>
<pre><code>def salomlash(ism):
    return f"Salom, {ism}!"

print(salomlash("Ali"))

mevalar = ["olma", "nok", "uzum"]
for meva in mevalar:
    print(meva)</code></pre>
<hr/>
<h2>RU: Функция и список</h2>
<pre><code>def приветствие(имя):
    return f"Привет, {имя}!"

print(приветствие("Али"))

фрукты = ["яблоко", "груша", "виноград"]
for фрукт in фрукты:
    print(фрукт)</code></pre>`,
      },
      {
        position: 5,
        isFree: false,
        title: "5. Kichik loyiha: kalkulyator | Мини-проект: калькулятор",
        description: `<h2>UZ: Oddiy kalkulyator</h2>
<pre><code>a = float(input("Birinchi son: "))
b = float(input("Ikkinchi son: "))
amal = input("Amal (+ - * /): ")

if amal == "+":
    print(a + b)
elif amal == "-":
    print(a - b)
elif amal == "*":
    print(a * b)
elif amal == "/":
    print(a / b if b != 0 else "Nolga bo'lib bo'lmaydi")</code></pre>
<hr/>
<h2>RU: Простой калькулятор</h2>
<pre><code>a = float(input("Первое число: "))
b = float(input("Второе число: "))
действие = input("Действие (+ - * /): ")

if действие == "+":
    print(a + b)
elif действие == "-":
    print(a - b)
elif действие == "*":
    print(a * b)
elif действие == "/":
    print(a / b if b != 0 else "Деление на ноль")</code></pre>`,
      },
    ],
  },

  // ───────────────────────── 2. JAVASCRIPT ─────────────────────────
  {
    title: "JavaScript asoslari — Boshlang'ichlar uchun | Основы JavaScript — для начинающих",
    category: "Dasturlash",
    imageUrl: "/courses/javascript.svg",
    description:
      "Brauzer tili JavaScript ni noldan o'rganamiz: o'zgaruvchilar, funksiyalar va sahifani jonlantirish (DOM). " +
      "Veb-dasturchi bo'lishni xohlovchilar uchun birinchi qadam.\n\n" +
      "Изучаем язык браузера JavaScript с нуля: переменные, функции и работа со страницей (DOM). Первый шаг к веб-разработке.",
    chapters: [
      {
        position: 1,
        isFree: true,
        title: "1. JavaScript bilan tanishuv | Знакомство с JavaScript",
        description: `<h2>UZ: JavaScript nima?</h2>
<p>JavaScript — veb-sahifalarni interaktiv qiladigan til. Har bir brauzerda ishlaydi.</p>
<pre><code>console.log("Salom, dunyo!");
alert("Birinchi dasturim!");</code></pre>
<hr/>
<h2>RU: Что такое JavaScript?</h2>
<p>JavaScript делает веб-страницы интерактивными. Работает в каждом браузере.</p>
<pre><code>console.log("Привет, мир!");
alert("Моя первая программа!");</code></pre>`,
      },
      {
        position: 2,
        isFree: true,
        title: "2. O'zgaruvchilar: let va const | Переменные: let и const",
        description: `<h2>UZ: let, const</h2>
<pre><code>let ism = "Ali";       // o'zgaradi
const PI = 3.14;        // o'zgarmas
let yosh = 20;
console.log(ism, yosh);</code></pre>
<hr/>
<h2>RU: let, const</h2>
<pre><code>let имя = "Али";        // изменяемая
const PI = 3.14;         // постоянная
let возраст = 20;
console.log(имя, возраст);</code></pre>`,
      },
      {
        position: 3,
        isFree: false,
        title: "3. Funksiyalar va shartlar | Функции и условия",
        description: `<h2>UZ: Funksiya va if</h2>
<pre><code>function salomlash(ism) {
  return "Salom, " + ism + "!";
}
console.log(salomlash("Ali"));

let yosh = 18;
if (yosh >= 18) {
  console.log("Voyaga yetgan");
} else {
  console.log("Yosh");
}</code></pre>
<hr/>
<h2>RU: Функция и if</h2>
<pre><code>function приветствие(имя) {
  return "Привет, " + имя + "!";
}
console.log(приветствие("Али"));

let возраст = 18;
if (возраст >= 18) {
  console.log("Совершеннолетний");
} else {
  console.log("Молодой");
}</code></pre>`,
      },
      {
        position: 4,
        isFree: false,
        title: "4. Massivlar va tsikllar | Массивы и циклы",
        description: `<h2>UZ: Array va for</h2>
<pre><code>const mevalar = ["olma", "nok", "uzum"];
for (const meva of mevalar) {
  console.log(meva);
}
mevalar.push("banan");
console.log(mevalar.length);  // 4</code></pre>
<hr/>
<h2>RU: Массив и for</h2>
<pre><code>const фрукты = ["яблоко", "груша", "виноград"];
for (const фрукт of фрукты) {
  console.log(фрукт);
}
фрукты.push("банан");
console.log(фрукты.length);  // 4</code></pre>`,
      },
      {
        position: 5,
        isFree: false,
        title: "5. DOM — sahifani o'zgartirish | DOM — изменение страницы",
        description: `<h2>UZ: Tugma bosilganda</h2>
<pre><code>&lt;button id="btn"&gt;Bosing&lt;/button&gt;
&lt;p id="matn"&gt;&lt;/p&gt;

&lt;script&gt;
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () =&gt; {
    document.getElementById("matn").textContent = "Salom!";
  });
&lt;/script&gt;</code></pre>
<hr/>
<h2>RU: По клику на кнопку</h2>
<pre><code>&lt;button id="btn"&gt;Нажми&lt;/button&gt;
&lt;p id="text"&gt;&lt;/p&gt;

&lt;script&gt;
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () =&gt; {
    document.getElementById("text").textContent = "Привет!";
  });
&lt;/script&gt;</code></pre>`,
      },
    ],
  },

  // ───────────────────────── 3. HTML & CSS ─────────────────────────
  {
    title: "HTML va CSS — Veb-sahifa yaratish | HTML и CSS — создание веб-страницы",
    category: "Web dasturlash",
    imageUrl: "/courses/htmlcss.svg",
    description:
      "O'z veb-saytingizni yaratishni o'rganing. HTML bilan sahifa tuzilishi, CSS bilan dizayn — boshlang'ichlar uchun.\n\n" +
      "Научитесь создавать свой сайт. Структура страницы с HTML, дизайн с CSS — для начинающих.",
    chapters: [
      {
        position: 1,
        isFree: true,
        title: "1. HTML asoslari | Основы HTML",
        description: `<h2>UZ: Birinchi sahifa</h2>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Mening saytim&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Salom!&lt;/h1&gt;
    &lt;p&gt;Bu mening birinchi sahifam.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<hr/>
<h2>RU: Первая страница</h2>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Мой сайт&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Привет!&lt;/h1&gt;
    &lt;p&gt;Это моя первая страница.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>`,
      },
      {
        position: 2,
        isFree: true,
        title: "2. Teglar: rasm, havola, ro'yxat | Теги: картинка, ссылка, список",
        description: `<h2>UZ: Asosiy teglar</h2>
<pre><code>&lt;img src="rasm.jpg" alt="Rasm"&gt;
&lt;a href="https://example.com"&gt;Havola&lt;/a&gt;
&lt;ul&gt;
  &lt;li&gt;Birinchi&lt;/li&gt;
  &lt;li&gt;Ikkinchi&lt;/li&gt;
&lt;/ul&gt;</code></pre>
<hr/>
<h2>RU: Основные теги</h2>
<pre><code>&lt;img src="pic.jpg" alt="Картинка"&gt;
&lt;a href="https://example.com"&gt;Ссылка&lt;/a&gt;
&lt;ul&gt;
  &lt;li&gt;Первый&lt;/li&gt;
  &lt;li&gt;Второй&lt;/li&gt;
&lt;/ul&gt;</code></pre>`,
      },
      {
        position: 3,
        isFree: false,
        title: "3. CSS bilan ranglar va shriftlar | Цвета и шрифты в CSS",
        description: `<h2>UZ: Stil berish</h2>
<pre><code>body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}
h1 {
  color: #6d28d9;
  text-align: center;
}</code></pre>
<hr/>
<h2>RU: Стилизация</h2>
<pre><code>body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}
h1 {
  color: #6d28d9;
  text-align: center;
}</code></pre>`,
      },
      {
        position: 4,
        isFree: false,
        title: "4. Flexbox bilan joylashuv | Вёрстка с Flexbox",
        description: `<h2>UZ: Elementlarni qatorga joylash</h2>
<pre><code>.menu {
  display: flex;
  gap: 16px;
  justify-content: center;
}</code></pre>
<p>Bu uchta elementni bir qatorda, markazda joylashtiradi.</p>
<hr/>
<h2>RU: Расположить элементы в ряд</h2>
<pre><code>.menu {
  display: flex;
  gap: 16px;
  justify-content: center;
}</code></pre>
<p>Это разместит элементы в ряд по центру.</p>`,
      },
    ],
  },

  // ───────────────────────── 4. GIT & TERMINAL ─────────────────────────
  {
    title: "Git va Terminal asoslari | Основы Git и терминала",
    category: "Dasturlash vositalari",
    imageUrl: "/courses/git.svg",
    description:
      "Har bir dasturchiga kerak bo'ladigan vositalar: buyruqlar qatori (terminal) va Git versiya nazorati. " +
      "Loyihalaringizni saqlang va GitHub'ga yuklang.\n\n" +
      "Инструменты, нужные каждому разработчику: командная строка (терминал) и система контроля версий Git. Сохраняйте проекты и загружайте на GitHub.",
    chapters: [
      {
        position: 1,
        isFree: true,
        title: "1. Terminal asoslari | Основы терминала",
        description: `<h2>UZ: Asosiy buyruqlar</h2>
<pre><code>pwd          # qaysi papkadaman
ls           # fayllar ro'yxati
cd loyiha    # papkaga kirish
mkdir yangi  # papka yaratish
touch a.txt  # fayl yaratish</code></pre>
<hr/>
<h2>RU: Основные команды</h2>
<pre><code>pwd          # в какой я папке
ls           # список файлов
cd project   # зайти в папку
mkdir new    # создать папку
touch a.txt  # создать файл</code></pre>`,
      },
      {
        position: 2,
        isFree: true,
        title: "2. Git nima va sozlash | Что такое Git и настройка",
        description: `<h2>UZ: Git nima?</h2>
<p>Git — kodingiz tarixini saqlaydigan vosita. Xatolardan oson qaytishingiz mumkin.</p>
<pre><code>git config --global user.name "Ism"
git config --global user.email "email@example.com"
git init      # repozitoriya yaratish</code></pre>
<hr/>
<h2>RU: Что такое Git?</h2>
<p>Git хранит историю вашего кода. Можно легко откатиться к рабочей версии.</p>
<pre><code>git config --global user.name "Имя"
git config --global user.email "email@example.com"
git init      # создать репозиторий</code></pre>`,
      },
      {
        position: 3,
        isFree: false,
        title: "3. Commit qilish | Делаем коммиты",
        description: `<h2>UZ: O'zgarishlarni saqlash</h2>
<pre><code>git status              # holatni ko'rish
git add .               # barcha o'zgarishlar
git commit -m "Birinchi commit"
git log                 # tarix</code></pre>
<hr/>
<h2>RU: Сохраняем изменения</h2>
<pre><code>git status              # посмотреть состояние
git add .               # все изменения
git commit -m "Первый коммит"
git log                 # история</code></pre>`,
      },
      {
        position: 4,
        isFree: false,
        title: "4. GitHub'ga yuklash | Загрузка на GitHub",
        description: `<h2>UZ: Onlayn saqlash</h2>
<pre><code>git remote add origin https://github.com/user/repo.git
git branch -M main
git push -u origin main</code></pre>
<p>Endi kodingiz GitHub'da xavfsiz saqlanadi.</p>
<hr/>
<h2>RU: Хранение онлайн</h2>
<pre><code>git remote add origin https://github.com/user/repo.git
git branch -M main
git push -u origin main</code></pre>
<p>Теперь ваш код безопасно хранится на GitHub.</p>`,
      },
    ],
  },
];

// ── MAIN ─────────────────────────────────────────────────────────────────────

async function ensureCategory(name: string): Promise<string> {
  const existing = await db.category.findFirst({ where: { name } });
  if (existing) return existing.id;
  const created = await db.category.create({ data: { name } });
  console.log(`✅ Kategoriya yaratildi: "${name}"`);
  return created.id;
}

async function main() {
  console.log("📚 Boshlang'ich kurslar yaratilmoqda...\n");
  console.log(`   Egasi (teacher): ${TEACHER_USER_ID}\n`);

  for (const c of courses) {
    const categoryId = await ensureCategory(c.category);

    const course = await db.course.create({
      data: {
        userId: TEACHER_USER_ID,
        title: c.title,
        description: c.description,
        imageUrl: c.imageUrl,
        categoryId,
        isPublished: true,
        chapters: {
          create: c.chapters.map((ch) => ({
            title: ch.title,
            description: ch.description,
            position: ch.position,
            isFree: ch.isFree,
            isPublished: true,
          })),
        },
      },
    });

    console.log(`✅ Kurs: "${c.title.split(" | ")[0]}" (${c.chapters.length} bob) — ${course.id}`);
  }

  console.log(`\n🎉 Tayyor! ${courses.length} ta kurs yaratildi.`);
}

main()
  .catch((e) => {
    console.error("❌ Xato:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
