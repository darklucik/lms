/**
 * Seed script: Full-Stack Python Developer course (Uzbek + Russian descriptions)
 *
 * Run with:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-python-course.ts
 *
 * Requires DATABASE_URL in .env and a valid TEACHER_USER_ID below.
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ── CONFIG ──────────────────────────────────────────────────────────────────
// Set to the Clerk userId of the teacher account that will own this course.
const TEACHER_USER_ID = process.env.PYTHON_COURSE_TEACHER_ID || "REPLACE_WITH_YOUR_USER_ID";

// ── CHAPTER DATA ─────────────────────────────────────────────────────────────

interface ChapterData {
  title: string;
  description: string;
  position: number;
  isFree: boolean;
}

const chapters: ChapterData[] = [
  {
    position: 1,
    isFree: true,
    title: "1. Kirish: Python nima? | Введение: Что такое Python?",
    description: `<h2>UZ: Python nima?</h2>
<p>Python — bu 1991-yilda Guido van Rossum tomonidan yaratilgan yuqori darajali, umumiy maqsadli dasturlash tili. U o'qish va yozish uchun juda qulay bo'lgan sintaksisga ega.</p>
<h3>Pythonning afzalliklari:</h3>
<ul>
  <li>Oddiy va tushunarli sintaksis</li>
  <li>Ko'p platformali (Windows, Mac, Linux)</li>
  <li>Katta kutubxonalar to'plami (PyPI)</li>
  <li>Veb-dasturlash, sun'iy intellekt, ma'lumotlar tahlili uchun ideal</li>
</ul>
<h3>O'rnatish:</h3>
<p>python.org saytidan Python 3.11+ versiyasini yuklab oling. VS Code yoki PyCharm IDE o'rnating.</p>
<pre><code>print("Salom, Dunyo!")  # Birinchi Python dasturingiz</code></pre>

<hr/>

<h2>RU: Что такое Python?</h2>
<p>Python — это высокоуровневый язык программирования общего назначения, созданный Гвидо ван Россумом в 1991 году. Он известен своим простым и читаемым синтаксисом.</p>
<h3>Преимущества Python:</h3>
<ul>
  <li>Простой и понятный синтаксис</li>
  <li>Кроссплатформенность (Windows, Mac, Linux)</li>
  <li>Огромная экосистема библиотек (PyPI)</li>
  <li>Идеален для веб-разработки, ИИ, анализа данных</li>
</ul>
<h3>Установка:</h3>
<p>Скачайте Python 3.11+ с python.org. Установите VS Code или PyCharm.</p>
<pre><code>print("Привет, Мир!")  # Ваша первая программа на Python</code></pre>`,
  },
  {
    position: 2,
    isFree: true,
    title: "2. O'zgaruvchilar va ma'lumot turlari | Переменные и типы данных",
    description: `<h2>UZ: O'zgaruvchilar va ma'lumot turlari</h2>
<p>Pythonda o'zgaruvchilar e'lon qilish uchun tur ko'rsatish shart emas.</p>
<pre><code>ism = "Ali"              # str (matn)
yosh = 25               # int (butun son)
baland = 1.75           # float (kasr son)
talaba = True           # bool (mantiqiy)
fanlar = ["Python", "Django", "SQL"]  # list (ro'yxat)
ma_lumot = {"ism": "Ali", "yosh": 25}  # dict (lug'at)

print(type(ism))        # <class 'str'>
print(type(yosh))       # <class 'int'>
</code></pre>
<h3>Muhim operatorlar:</h3>
<pre><code>a = 10
b = 3
print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.333...
print(a // b)  # 3 (butun bo'linma)
print(a % b)   # 1 (qoldiq)
print(a ** b)  # 1000 (daraja)
</code></pre>

<hr/>

<h2>RU: Переменные и типы данных</h2>
<p>В Python не нужно объявлять тип переменной заранее.</p>
<pre><code>имя = "Али"              # str (строка)
возраст = 25            # int (целое число)
рост = 1.75             # float (число с плавающей точкой)
студент = True          # bool (булево значение)
предметы = ["Python", "Django", "SQL"]  # list (список)
данные = {"имя": "Али", "возраст": 25}  # dict (словарь)
</code></pre>`,
  },
  {
    position: 3,
    isFree: false,
    title: "3. Shartli operatorlar va tsikllar | Условия и циклы",
    description: `<h2>UZ: if/elif/else va tsikllar</h2>
<pre><code># Shartli operator
ball = 85

if ball >= 90:
    print("A'lo")
elif ball >= 70:
    print("Yaxshi")
elif ball >= 50:
    print("Qoniqarli")
else:
    print("Qoniqarsiz")

# for tsikli
mevalар = ["olma", "nok", "uzum"]
for meva in mevalar:
    print(meva)

# while tsikli
son = 1
while son <= 5:
    print(f"{son} x {son} = {son**2}")
    son += 1

# range() bilan
for i in range(1, 11):
    print(i, end=" ")  # 1 2 3 4 5 6 7 8 9 10
</code></pre>

<hr/>

<h2>RU: Условия и циклы</h2>
<pre><code># Условный оператор
оценка = 85

if оценка >= 90:
    print("Отлично")
elif оценка >= 70:
    print("Хорошо")
elif оценка >= 50:
    print("Удовлетворительно")
else:
    print("Неудовлетворительно")

# Цикл for
фрукты = ["яблоко", "груша", "виноград"]
for фрукт in фрукты:
    print(фрукт)

# Цикл while
число = 1
while число <= 5:
    print(f"{число} x {число} = {число**2}")
    число += 1
</code></pre>`,
  },
  {
    position: 4,
    isFree: false,
    title: "4. Funksiyalar | Функции",
    description: `<h2>UZ: Funksiyalar</h2>
<p>Funksiyalar kodni qayta ishlatish imkonini beradi.</p>
<pre><code>def salomlash(ism, tilak="Xush kelibsiz"):
    """Foydalanuvchini salomlash funksiyasi"""
    return f"{tilak}, {ism}!"

print(salomlash("Ali"))              # Xush kelibsiz, Ali!
print(salomlash("Vali", "Salom"))   # Salom, Vali!

# Lambda funksiya
ikkilantir = lambda x: x * 2
print(ikkilantir(5))  # 10

# *args va **kwargs
def yig'im(*sonlar):
    return sum(sonlar)

print(yig'im(1, 2, 3, 4, 5))  # 15

# Ichki funksiya va closure
def ko'paytuvchi(n):
    def ko'paytir(x):
        return x * n
    return ko'paytir

uch_marta = ko'paytuvchi(3)
print(uch_marta(7))  # 21
</code></pre>

<hr/>

<h2>RU: Функции</h2>
<pre><code>def приветствие(имя, пожелание="Добро пожаловать"):
    """Функция приветствия пользователя"""
    return f"{пожелание}, {имя}!"

print(приветствие("Али"))
print(приветствие("Вали", "Привет"))

# Lambda функция
удвоить = lambda x: x * 2
print(удвоить(5))  # 10

# *args и **kwargs
def сумма(*числа):
    return sum(числа)

print(сумма(1, 2, 3, 4, 5))  # 15
</code></pre>`,
  },
  {
    position: 5,
    isFree: false,
    title: "5. Ro'yxatlar, Lug'atlar, To'plamlar | Списки, Словари, Множества",
    description: `<h2>UZ: Kolleksiyalar</h2>
<pre><code># LIST (ro'yxat)
talabalar = ["Ali", "Vali", "Soli"]
talabalar.append("Holi")
talabalar.insert(0, "Baxtiyor")
talabalar.remove("Vali")
print(talabalar[0])      # Baxtiyor
print(talabalar[-1])     # Holi
print(len(talabalar))    # 4

# List comprehension
kvadratlar = [x**2 for x in range(1, 11)]
print(kvadratlar)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# DICT (lug'at)
talaba = {
    "ism": "Ali",
    "yosh": 20,
    "fanlar": ["Python", "Math"]
}
print(talaba["ism"])           # Ali
talaba["email"] = "ali@test.com"
print(talaba.get("tel", "Yo'q"))  # Yo'q

# SET (to'plam) — takrorlanmaydi
mevalar = {"olma", "nok", "olma", "uzum"}
print(mevalar)  # {'olma', 'nok', 'uzum'}

# TUPLE (o'zgarmas)
koordinatlar = (40.7128, -74.0060)
print(koordinatlar[0])  # 40.7128
</code></pre>

<hr/>

<h2>RU: Коллекции</h2>
<pre><code># LIST (список)
студенты = ["Али", "Вали", "Соли"]
студенты.append("Холи")

# Dict comprehension
квадраты = {x: x**2 for x in range(1, 6)}
print(квадраты)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# SET (множество)
фрукты = {"яблоко", "груша", "яблоко"}
print(фрукты)  # {'яблоко', 'груша'}
</code></pre>`,
  },
  {
    position: 6,
    isFree: false,
    title: "6. Ob'ektga Yo'naltirilgan Dasturlash (OOP) | ООП",
    description: `<h2>UZ: OOP — Sinf va Ob'ektlar</h2>
<pre><code>class Talaba:
    """Talaba sinfi"""
    maktab = "MTLearning"  # Sinf atributi

    def __init__(self, ism, yosh):
        self.ism = ism     # ob'ekt atributi
        self.yosh = yosh
        self._ballar = []

    def ball_qo_sh(self, ball):
        self._ballar.append(ball)

    @property
    def o_rtacha(self):
        return sum(self._ballar) / len(self._ballar) if self._ballar else 0

    def __str__(self):
        return f"Talaba: {self.ism}, {self.yosh} yosh"

    def __repr__(self):
        return f"Talaba('{self.ism}', {self.yosh})"


# Meros (Inheritance)
class FanTalabasi(Talaba):
    def __init__(self, ism, yosh, mutaxassislik):
        super().__init__(ism, yosh)
        self.mutaxassislik = mutaxassislik

    def __str__(self):
        return f"{super().__str__()} | {self.mutaxassislik}"


ali = FanTalabasi("Ali", 20, "Python dasturlash")
ali.ball_qo_sh(90)
ali.ball_qo_sh(85)
ali.ball_qo_sh(95)
print(ali)           # Talaba: Ali, 20 yosh | Python dasturlash
print(ali.o_rtacha)  # 90.0
print(Talaba.maktab) # MTLearning
</code></pre>

<hr/>

<h2>RU: ООП — Классы и объекты</h2>
<pre><code>class Студент:
    учебное_заведение = "MTLearning"

    def __init__(self, имя, возраст):
        self.имя = имя
        self.возраст = возраст
        self._оценки = []

    def добавить_оценку(self, оценка):
        self._оценки.append(оценка)

    @property
    def средняя(self):
        return sum(self._оценки) / len(self._оценки) if self._оценки else 0

    def __str__(self):
        return f"Студент: {self.имя}, {self.возраст} лет"
</code></pre>`,
  },
  {
    position: 7,
    isFree: false,
    title: "7. Fayl bilan ishlash | Работа с файлами",
    description: `<h2>UZ: Fayllar bilan ishlash</h2>
<pre><code>import os
import json
import csv

# Matn faylini o'qish va yozish
with open("matn.txt", "w", encoding="utf-8") as f:
    f.write("Salom, Dunyo!\\n")
    f.write("Bu Python dasturidir.\\n")

with open("matn.txt", "r", encoding="utf-8") as f:
    matn = f.read()
    print(matn)

# Satr bo'yicha o'qish
with open("matn.txt", "r", encoding="utf-8") as f:
    for qator in f:
        print(qator.strip())

# JSON bilan ishlash
ma_lumot = {
    "ism": "Ali",
    "yosh": 25,
    "fanlar": ["Python", "Django"]
}

with open("talaba.json", "w", encoding="utf-8") as f:
    json.dump(ma_lumot, f, ensure_ascii=False, indent=2)

with open("talaba.json", "r", encoding="utf-8") as f:
    yuklangan = json.load(f)
    print(yuklangan["ism"])  # Ali

# CSV bilan ishlash
talabalar = [
    ["Ali", 90, "Python"],
    ["Vali", 85, "Django"],
]

with open("talabalar.csv", "w", newline="", encoding="utf-8") as f:
    yozuvchi = csv.writer(f)
    yozuvchi.writerow(["Ism", "Ball", "Fan"])
    yozuvchi.writerows(talabalar)

# OS moduli
print(os.getcwd())        # Joriy papka
print(os.listdir("."))    # Papka tarkibi
os.makedirs("yangi", exist_ok=True)  # Papka yaratish
</code></pre>

<hr/>

<h2>RU: Работа с файлами</h2>
<pre><code>import json

# Чтение и запись текстового файла
with open("текст.txt", "w", encoding="utf-8") as f:
    f.write("Привет, Мир!\\n")

with open("текст.txt", "r", encoding="utf-8") as f:
    содержимое = f.read()
    print(содержимое)

# JSON
данные = {"имя": "Али", "возраст": 25}
with open("данные.json", "w", encoding="utf-8") as f:
    json.dump(данные, f, ensure_ascii=False, indent=2)
</code></pre>`,
  },
  {
    position: 8,
    isFree: false,
    title: "8. Xatolarni Boshqarish (Exception Handling) | Обработка исключений",
    description: `<h2>UZ: Exception Handling</h2>
<pre><code># try/except/else/finally
def bo_lish(a, b):
    try:
        natija = a / b
    except ZeroDivisionError:
        print("Xato: Nolga bo'lib bo'lmaydi!")
        return None
    except TypeError as e:
        print(f"Tur xatosi: {e}")
        return None
    else:
        print(f"Natija: {natija}")
        return natija
    finally:
        print("Funksiya tugadi")

bo'lish(10, 2)   # Natija: 5.0
bo'lish(10, 0)   # Xato: Nolga bo'lib bo'lmaydi!

# Custom exception
class YoshXatosi(Exception):
    def __init__(self, yosh):
        self.yosh = yosh
        super().__init__(f"Noto'g'ri yosh: {yosh}")

def yosh_tekshir(yosh):
    if yosh < 0 or yosh > 150:
        raise YoshXatosi(yosh)
    return f"Yosh to'g'ri: {yosh}"

try:
    print(yosh_tekshir(-5))
except YoshXatosi as e:
    print(f"Ushlab olindi: {e}")

# Context manager
class FaylBoshqaruvi:
    def __init__(self, nom):
        self.nom = nom
        self.fayl = None

    def __enter__(self):
        self.fayl = open(self.nom, "w")
        return self.fayl

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.fayl:
            self.fayl.close()
        return False

with FaylBoshqaruvi("test.txt") as f:
    f.write("Salom!")
</code></pre>

<hr/>

<h2>RU: Обработка исключений</h2>
<pre><code>def деление(a, b):
    try:
        результат = a / b
    except ZeroDivisionError:
        print("Ошибка: деление на ноль!")
        return None
    except TypeError as e:
        print(f"Ошибка типа: {e}")
        return None
    else:
        return результат
    finally:
        print("Функция завершена")

# Пользовательское исключение
class ВозрастОшибка(Exception):
    pass

def проверить_возраст(возраст):
    if возраст < 0 or возраст > 150:
        raise ВозрастОшибка(f"Неверный возраст: {возраст}")
    return True
</code></pre>`,
  },
  {
    position: 9,
    isFree: false,
    title: "9. Modullar va Paketlar | Модули и пакеты",
    description: `<h2>UZ: Modullar</h2>
<pre><code># Standart kutubxona modullari
import math
import datetime
import random
import re
from collections import Counter, defaultdict
from itertools import chain, combinations

# math moduli
print(math.pi)          # 3.14159...
print(math.sqrt(144))   # 12.0
print(math.ceil(4.2))   # 5
print(math.floor(4.8))  # 4

# datetime
bugun = datetime.date.today()
hozir = datetime.datetime.now()
print(bugun)   # 2024-01-15
print(hozir.strftime("%d.%m.%Y %H:%M"))

# random
print(random.randint(1, 100))
print(random.choice(["olma", "nok", "uzum"]))
random.shuffle(["a", "b", "c"])

# regex
matn = "Telefon: +998-90-123-45-67"
pattern = r"\\+998-\\d{2}-\\d{3}-\\d{2}-\\d{2}"
match = re.search(pattern, matn)
if match:
    print(match.group())  # +998-90-123-45-67

# O'z modulingizni yaratish
# fayl: hisoblagich.py
def qo_shish(a, b): return a + b
def ayirish(a, b): return a - b

# boshqa faylda:
# from hisoblagich import qo'shish, ayirish

# pip bilan paket o'rnatish
# pip install requests
# pip install pandas numpy matplotlib

import requests
javob = requests.get("https://api.github.com")
print(javob.status_code)  # 200
print(javob.json()["current_user_url"])
</code></pre>

<hr/>

<h2>RU: Модули и пакеты</h2>
<pre><code>import math, datetime, random, re
from collections import Counter

# math
print(math.pi)         # 3.14159...
print(math.sqrt(144))  # 12.0

# datetime
сегодня = datetime.date.today()
сейчас = datetime.datetime.now()

# regex
текст = "Email: user@example.com"
pattern = r"[\\w.-]+@[\\w.-]+\\.\\w+"
совпадение = re.search(pattern, текст)
if совпадение:
    print(совпадение.group())  # user@example.com

# pip install requests
import requests
ответ = requests.get("https://api.github.com")
print(ответ.status_code)  # 200
</code></pre>`,
  },
  {
    position: 10,
    isFree: false,
    title: "10. Flask — Veb-dasturlash asoslari | Flask — Основы веб-разработки",
    description: `<h2>UZ: Flask bilan veb-dastur yaratish</h2>
<pre><code># pip install flask flask-sqlalchemy flask-login

from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mtlearning.db"
app.config["SECRET_KEY"] = "maxfiy-kalit"

db = SQLAlchemy(app)

# Model
class Kurs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sarlavha = db.Column(db.String(200), nullable=False)
    tavsif = db.Column(db.Text)
    narx = db.Column(db.Float, default=0)
    nashr = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "sarlavha": self.sarlavha,
            "narx": self.narx,
        }

# Marshrutlar (Routes)
@app.route("/")
def bosh_sahifa():
    kurslar = Kurs.query.filter_by(nashr=True).all()
    return render_template("index.html", kurslar=kurslar)

@app.route("/api/kurslar")
def kurslar_api():
    kurslar = Kurs.query.all()
    return jsonify([k.to_dict() for k in kurslar])

@app.route("/api/kurs", methods=["POST"])
def kurs_yaratish():
    ma_lumot = request.get_json()
    kurs = Kurs(
        sarlavha=ma_lumot["sarlavha"],
        narx=ma_lumot.get("narx", 0)
    )
    db.session.add(kurs)
    db.session.commit()
    return jsonify(kurs.to_dict()), 201

@app.route("/api/kurs/&lt;int:id&gt;", methods=["PUT", "DELETE"])
def kurs_tahrir(id):
    kurs = Kurs.query.get_or_404(id)
    if request.method == "DELETE":
        db.session.delete(kurs)
        db.session.commit()
        return "", 204
    ma_lumot = request.get_json()
    kurs.sarlavha = ma_lumot.get("sarlavha", kurs.sarlavha)
    db.session.commit()
    return jsonify(kurs.to_dict())

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
</code></pre>

<hr/>

<h2>RU: Flask — создание веб-приложения</h2>
<pre><code>from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///courses.db"
db = SQLAlchemy(app)

class Курс(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    название = db.Column(db.String(200), nullable=False)
    цена = db.Column(db.Float, default=0)

@app.route("/api/курсы")
def получить_курсы():
    курсы = Курс.query.all()
    return jsonify([{"id": k.id, "название": k.название} for k in курсы])

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
</code></pre>`,
  },
  {
    position: 11,
    isFree: false,
    title: "11. Django Framework — Professional LMS | Django Framework",
    description: `<h2>UZ: Django bilan LMS yaratish</h2>
<pre><code># pip install django djangorestframework pillow

# Yangi Django loyiha yaratish:
# django-admin startproject mtlearning
# cd mtlearning
# python manage.py startapp kurslar

# kurslar/models.py
from django.db import models
from django.contrib.auth.models import User

class Kategoriya(models.Model):
    nomi = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Kategoriyalar"

    def __str__(self):
        return self.nomi


class Kurs(models.Model):
    o_qituvchi = models.ForeignKey(User, on_delete=models.CASCADE)
    kategoriya = models.ForeignKey(
        Kategoriya, on_delete=models.SET_NULL, null=True
    )
    sarlavha = models.CharField(max_length=200)
    tavsif = models.TextField(blank=True)
    rasm = models.ImageField(upload_to="kurslar/", blank=True)
    narx = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    nashr = models.BooleanField(default=False)
    yaratildi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sarlavha


class Bob(models.Model):
    kurs = models.ForeignKey(Kurs, related_name="boblar", on_delete=models.CASCADE)
    sarlavha = models.CharField(max_length=200)
    tavsif = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    tartib = models.PositiveIntegerField(default=0)
    bepul = models.BooleanField(default=False)
    nashr = models.BooleanField(default=False)

    class Meta:
        ordering = ["tartib"]

    def __str__(self):
        return f"{self.kurs.sarlavha} — {self.sarlavha}"


# kurslar/serializers.py
from rest_framework import serializers

class BobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bob
        fields = ["id", "sarlavha", "tartib", "bepul", "nashr"]


class KursSerializer(serializers.ModelSerializer):
    boblar = BobSerializer(many=True, read_only=True)

    class Meta:
        model = Kurs
        fields = "__all__"


# kurslar/views.py
from rest_framework import viewsets, permissions

class KursViewSet(viewsets.ModelViewSet):
    queryset = Kurs.objects.filter(nashr=True)
    serializer_class = KursSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(o_qituvchi=self.request.user)


# mtlearning/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"kurslar", KursViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]

# Migratsiyalar:
# python manage.py makemigrations
# python manage.py migrate
# python manage.py createsuperuser
# python manage.py runserver
</code></pre>

<hr/>

<h2>RU: Django — создание LMS</h2>
<pre><code># pip install django djangorestframework

# models.py
from django.db import models
from django.contrib.auth.models import User

class Курс(models.Model):
    преподаватель = models.ForeignKey(User, on_delete=models.CASCADE)
    название = models.CharField(max_length=200)
    описание = models.TextField(blank=True)
    цена = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    опубликован = models.BooleanField(default=False)
    создан = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.название


class Глава(models.Model):
    курс = models.ForeignKey(Курс, related_name="главы", on_delete=models.CASCADE)
    название = models.CharField(max_length=200)
    видео_url = models.URLField(blank=True)
    порядок = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["порядок"]
</code></pre>`,
  },
  {
    position: 12,
    isFree: false,
    title: "12. Ma'lumotlar Bazasi — SQLAlchemy va PostgreSQL | БД — SQLAlchemy и PostgreSQL",
    description: `<h2>UZ: SQLAlchemy bilan ishlash</h2>
<pre><code># pip install sqlalchemy psycopg2-binary alembic

from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime

DATABASE_URL = "postgresql://user:password@localhost:5432/mtlearning"
engine = create_engine(DATABASE_URL, echo=True)

Base = declarative_base()
Session = sessionmaker(bind=engine)

class Kategoriya(Base):
    __tablename__ = "kategoriyalar"
    id = Column(Integer, primary_key=True)
    nomi = Column(String(100), unique=True, nullable=False)
    kurslar = relationship("Kurs", back_populates="kategoriya")

class Kurs(Base):
    __tablename__ = "kurslar"
    id = Column(Integer, primary_key=True)
    sarlavha = Column(String(200), nullable=False)
    tavsif = Column(Text)
    narx = Column(Float, default=0)
    nashr = Column(Boolean, default=False)
    yaratildi = Column(DateTime, default=datetime.utcnow)
    kategoriya_id = Column(Integer, ForeignKey("kategoriyalar.id"))
    kategoriya = relationship("Kategoriya", back_populates="kurslar")
    boblar = relationship("Bob", back_populates="kurs", cascade="all, delete-orphan")

class Bob(Base):
    __tablename__ = "boblar"
    id = Column(Integer, primary_key=True)
    sarlavha = Column(String(200), nullable=False)
    tartib = Column(Integer, default=0)
    kurs_id = Column(Integer, ForeignKey("kurslar.id"))
    kurs = relationship("Kurs", back_populates="boblar")

# Jadvallarni yaratish
Base.metadata.create_all(engine)

# CRUD operatsiyalari
def kurs_yaratish(sarlavha: str, narx: float = 0) -> Kurs:
    with Session() as session:
        kurs = Kurs(sarlavha=sarlavha, narx=narx)
        session.add(kurs)
        session.commit()
        session.refresh(kurs)
        return kurs

def kurslarni_olish(nashr: bool = True):
    with Session() as session:
        return session.query(Kurs).filter_by(nashr=nashr).all()

# Raw SQL bilan ishlash
from sqlalchemy import text
with engine.connect() as conn:
    natija = conn.execute(text("SELECT COUNT(*) FROM kurslar"))
    print(natija.fetchone()[0])
</code></pre>

<hr/>

<h2>RU: SQLAlchemy и PostgreSQL</h2>
<pre><code>from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/mtlearning"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

class Курс(Base):
    __tablename__ = "курсы"
    id = Column(Integer, primary_key=True)
    название = Column(String(200), nullable=False)
    цена = Column(Float, default=0)
    опубликован = Column(Boolean, default=False)

Base.metadata.create_all(engine)

# CRUD
def создать_курс(название: str) -> Курс:
    with Session() as session:
        курс = Курс(название=название)
        session.add(курс)
        session.commit()
        return курс
</code></pre>`,
  },
  {
    position: 13,
    isFree: false,
    title: "13. REST API yaratish | Создание REST API",
    description: `<h2>UZ: FastAPI bilan REST API</h2>
<pre><code># pip install fastapi uvicorn sqlalchemy pydantic

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session

app = FastAPI(
    title="MTLearning API",
    description="Python kurslari uchun REST API",
    version="1.0.0"
)

# Pydantic modellar (schema)
class KursYaratish(BaseModel):
    sarlavha: str
    tavsif: Optional[str] = None
    narx: float = 0.0

class KursJavob(BaseModel):
    id: int
    sarlavha: str
    narx: float
    nashr: bool

    class Config:
        from_attributes = True

# Endpoint'lar
@app.get("/")
async def ildiz():
    return {"xabar": "MTLearning API ishlamoqda!"}

@app.get("/api/kurslar", response_model=List[KursJavob])
async def kurslarni_olish(
    nashr: bool = True,
    sahifa: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    kurslar = db.query(Kurs).filter_by(nashr=nashr)
    return kurslar.offset((sahifa - 1) * limit).limit(limit).all()

@app.post("/api/kurslar", response_model=KursJavob, status_code=201)
async def kurs_yaratish(
    ma_lumot: KursYaratish,
    db: Session = Depends(get_db)
):
    kurs = Kurs(**ma_lumot.dict())
    db.add(kurs)
    db.commit()
    db.refresh(kurs)
    return kurs

@app.get("/api/kurslar/{kurs_id}", response_model=KursJavob)
async def kurs_olish(kurs_id: int, db: Session = Depends(get_db)):
    kurs = db.query(Kurs).filter(Kurs.id == kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    return kurs

@app.put("/api/kurslar/{kurs_id}")
async def kurs_yangilash(
    kurs_id: int,
    ma_lumot: KursYaratish,
    db: Session = Depends(get_db)
):
    kurs = db.query(Kurs).filter(Kurs.id == kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    for maydon, qiymat in ma_lumot.dict().items():
        setattr(kurs, maydon, qiymat)
    db.commit()
    return kurs

@app.delete("/api/kurslar/{kurs_id}", status_code=204)
async def kurs_o_chirish(kurs_id: int, db: Session = Depends(get_db)):
    kurs = db.query(Kurs).filter(Kurs.id == kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs topilmadi")
    db.delete(kurs)
    db.commit()

# Ishga tushirish:
# uvicorn main:app --reload
# Swagger UI: http://127.0.0.1:8000/docs
</code></pre>

<hr/>

<h2>RU: REST API с FastAPI</h2>
<pre><code>from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="MTLearning API", version="1.0.0")

class КурсСоздание(BaseModel):
    название: str
    описание: Optional[str] = None
    цена: float = 0.0

@app.get("/api/курсы")
async def получить_курсы():
    return {"курсы": []}

@app.post("/api/курсы", status_code=201)
async def создать_курс(данные: КурсСоздание):
    return {"id": 1, **данные.dict()}

# uvicorn main:app --reload
# Документация: http://127.0.0.1:8000/docs
</code></pre>`,
  },
  {
    position: 14,
    isFree: false,
    title: "14. Asinxron Dasturlash — asyncio | Асинхронное программирование",
    description: `<h2>UZ: asyncio va asinxron dasturlash</h2>
<pre><code">import asyncio
import aiohttp
import aiofiles
import time

# Oddiy coroutine
async def salomlash(ism: str, kechikish: float) -> str:
    await asyncio.sleep(kechikish)
    return f"Salom, {ism}!"

# Bir nechta coroutine bir vaqtda
async def asosiy():
    start = time.perf_counter()

    # Ketma-ket (sekin)
    # natija1 = await salomlash("Ali", 2)
    # natija2 = await salomlash("Vali", 1)

    # Parallel (tez)
    natijalar = await asyncio.gather(
        salomlash("Ali", 2),
        salomlash("Vali", 1),
        salomlash("Soli", 1.5),
    )

    end = time.perf_counter()
    print(f"Vaqt: {end - start:.2f}s")  # ~2s, 4.5s emas!
    return natijalar

asyncio.run(asosiy())

# aiohttp bilan HTTP so'rovlari
async def url_olish(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as javob:
        return await javob.json()

async def ko'p_so'rov():
    urllar = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]
    async with aiohttp.ClientSession() as session:
        vazifalar = [url_olish(session, url) for url in urllar]
        natijalar = await asyncio.gather(*vazifalar)
        return natijalar

# Task yaratish
async def task_misol():
    task1 = asyncio.create_task(salomlash("Ali", 1))
    task2 = asyncio.create_task(salomlash("Vali", 2))

    print("Ishlamoqda...")
    natija1 = await task1
    natija2 = await task2
    print(natija1, natija2)

asyncio.run(task_misol())

# asyncio.Queue
async def ishlab_chiqaruvchi(navbat: asyncio.Queue):
    for i in range(5):
        await navbat.put(i)
        print(f"Qo'shildi: {i}")
        await asyncio.sleep(0.5)

async def iste'molchi(navbat: asyncio.Queue):
    while True:
        element = await navbat.get()
        print(f"Qayta ishlandi: {element}")
        navbat.task_done()
        if element == 4:
            break
</code></pre>

<hr/>

<h2>RU: Асинхронное программирование</h2>
<pre><code>import asyncio
import aiohttp

async def приветствие(имя: str, задержка: float) -> str:
    await asyncio.sleep(задержка)
    return f"Привет, {имя}!"

async def главная():
    результаты = await asyncio.gather(
        приветствие("Али", 2),
        приветствие("Вали", 1),
        приветствие("Соли", 1.5),
    )
    print(результаты)

asyncio.run(главная())

# Параллельные HTTP-запросы
async def получить_данные(session, url):
    async with session.get(url) as ответ:
        return await ответ.json()

async def много_запросов():
    urls = ["https://api.example.com/1", "https://api.example.com/2"]
    async with aiohttp.ClientSession() as session:
        задачи = [получить_данные(session, url) for url in urls]
        return await asyncio.gather(*задачи)
</code></pre>`,
  },
  {
    position: 15,
    isFree: false,
    title: "15. Testlar yozish — unittest va pytest | Написание тестов",
    description: `<h2>UZ: Unit testlar va pytest</h2>
<pre><code"># pip install pytest pytest-asyncio coverage

import unittest
import pytest
from unittest.mock import MagicMock, patch, AsyncMock

# Sinov uchun funksiyalar
def qo_shish(a: float, b: float) -> float:
    return a + b

def bo_lish(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Nolga bo'lib bo'lmaydi")
    return a / b

class Kurs:
    def __init__(self, sarlavha: str, narx: float):
        self.sarlavha = sarlavha
        self.narx = narx
        self.nashr = False

    def nashr_qil(self):
        if not self.sarlavha:
            raise ValueError("Sarlavha kerak")
        self.nashr = True

# unittest bilan
class KursTesti(unittest.TestCase):
    def setUp(self):
        self.kurs = Kurs("Python", 99.99)

    def test_sarlavha(self):
        self.assertEqual(self.kurs.sarlavha, "Python")

    def test_narx(self):
        self.assertGreater(self.kurs.narx, 0)

    def test_nashr_qilish(self):
        self.kurs.nashr_qil()
        self.assertTrue(self.kurs.nashr)

    def test_bo'sh_sarlavha(self):
        kurs = Kurs("", 0)
        with self.assertRaises(ValueError):
            kurs.nashr_qil()

    def tearDown(self):
        pass

# pytest bilan
@pytest.fixture
def yangi_kurs():
    return Kurs("Django", 149.0)

def test_qo_shish():
    assert qo_shish(2, 3) == 5
    assert qo_shish(-1, 1) == 0

def test_nolga_bo_lish():
    with pytest.raises(ZeroDivisionError):
        bo_lish(10, 0)

def test_kurs_nashr(yangi_kurs):
    yangi_kurs.nashr_qil()
    assert yangi_kurs.nashr is True

@pytest.mark.parametrize("a, b, kutilgan", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (100, -50, 50),
])
def test_qo_shish_parametrli(a, b, kutilgan):
    assert qo_shish(a, b) == kutilgan

# Mock bilan
def test_db_bilan_mock():
    mock_db = MagicMock()
    mock_db.kurs_yaratish.return_value = Kurs("Test", 0)
    kurs = mock_db.kurs_yaratish("Test", 0)
    mock_db.kurs_yaratish.assert_called_once_with("Test", 0)

# Ishga tushirish:
# pytest -v
# pytest --cov=. --cov-report=html
</code></pre>

<hr/>

<h2>RU: Написание тестов</h2>
<pre><code>import pytest
from unittest.mock import MagicMock

def сложение(a, b): return a + b
def деление(a, b):
    if b == 0: raise ZeroDivisionError
    return a / b

def test_сложение():
    assert сложение(2, 3) == 5

def test_деление_на_ноль():
    with pytest.raises(ZeroDivisionError):
        деление(10, 0)

@pytest.mark.parametrize("a, b, ожидаемое", [
    (1, 2, 3), (0, 0, 0), (-1, 1, 0)
])
def test_сложение_параметрически(a, b, ожидаемое):
    assert сложение(a, b) == ожидаемое

# pytest -v --cov=. --cov-report=html
</code></pre>`,
  },
  {
    position: 16,
    isFree: false,
    title: "16. Deployment — Docker va Production | Развёртывание — Docker и Production",
    description: `<h2>UZ: Docker bilan o'rash va deployment</h2>
<pre><code># Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kod nusxasi
COPY . .

# Port
EXPOSE 8000

# Ishga tushirish
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
</code></pre>

<pre><code"># docker-compose.yml
version: "3.9"

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mtlearning
      - SECRET_KEY=\${SECRET_KEY}
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mtlearning
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mtlearning"]
      interval: 5s
      timeout: 5s
      retries: 5
    ports:
      - "5432:5432"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certbot/conf:/etc/letsencrypt
    depends_on:
      - api

volumes:
  postgres_data:
</code></pre>

<pre><code># requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.13.0
pydantic==2.5.2
python-dotenv==1.0.0
pytest==7.4.3
httpx==0.25.2

# Buyruqlar:
# docker build -t mtlearning .
# docker-compose up -d
# docker-compose logs -f api
# docker-compose exec api alembic upgrade head
</code></pre>

<pre><code"># nginx.conf
events {}

http {
    upstream api {
        server api:8000;
    }

    server {
        listen 80;
        server_name mtlearning.uz;

        location / {
            proxy_pass http://api;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
    }
}
</code></pre>

<hr/>

<h2>RU: Docker и развёртывание</h2>
<pre><code># Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
</code></pre>

<pre><code># docker-compose.yml
version: "3.9"
services:
  api:
    build: .
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/db
    depends_on: [db]
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: db
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:

# docker-compose up -d
# docker-compose logs -f api
</code></pre>`,
  },
  {
    position: 17,
    isFree: false,
    title: "17. Yakuniy Loyiha: To'liq LMS Backend | Финальный проект: Полный LMS Backend",
    description: `<h2>UZ: MTLearning Backend — FastAPI + SQLAlchemy + JWT</h2>
<p>Ushbu modulda biz to'liq ishlayotgan LMS backend yaratamiz:</p>
<ul>
  <li>JWT autentifikatsiya</li>
  <li>Foydalanuvchilar va rollar (talaba, o'qituvchi, admin)</li>
  <li>Kurslar, boblar, materiallar CRUD</li>
  <li>To'lovlar (Stripe integratsiyasi)</li>
  <li>Fayl yuklash (S3/Cloudinary)</li>
  <li>Email yuborish (SMTP)</li>
  <li>Rate limiting va cache (Redis)</li>
  <li>Alembic migratsiyalar</li>
</ul>

<pre><code># auth/jwt.py
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "maxfiy-kalit-bu-yerda"
ALGORITHM = "HS256"
TOKEN_MUDDAT = 30  # daqiqa

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

def parol_hash(parol: str) -> str:
    return pwd_context.hash(parol)

def parol_tekshir(oddiy: str, xesh: str) -> bool:
    return pwd_context.verify(oddiy, xesh)

def token_yaratish(ma_lumot: dict) -> str:
    nusxa = ma_lumot.copy()
    nusxa["exp"] = datetime.utcnow() + timedelta(minutes=TOKEN_MUDDAT)
    return jwt.encode(nusxa, SECRET_KEY, algorithm=ALGORITHM)

async def joriy_foydalanuvchi(token: str = Depends(oauth2_scheme)):
    xato = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token noto'g'ri",
    )
    try:
        yuk = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = yuk.get("sub")
        if user_id is None:
            raise xato
    except JWTError:
        raise xato
    return user_id
</code></pre>

<pre><code"># main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from redis import asyncio as aioredis
from fastapi_limiter import FastAPILimiter

app = FastAPI(title="MTLearning Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mtlearning.uz", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost:6379")
    await FastAPILimiter.init(redis)

# Router'larni ulash
from routers import auth, kurslar, boblar, to'lovlar

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(kurslar.router, prefix="/api/kurslar", tags=["Kurslar"])
app.include_router(boblar.router, prefix="/api/boblar", tags=["Boblar"])
app.include_router(to'lovlar.router, prefix="/api/to'lovlar", tags=["To'lovlar"])

# Ishga tushirish:
# uvicorn main:app --reload --port 8000
# Swagger: http://localhost:8000/docs
</code></pre>

<h3>UZ: Tabriklaymiz!</h3>
<p>Siz Python dasturchi kursini muvaffaqiyatli tugatdingiz! Endi siz:</p>
<ul>
  <li>Python asoslarini bilasiz</li>
  <li>OOP, exception handling, modullar bilan ishlashni bilasiz</li>
  <li>Flask, Django, FastAPI bilan veb-dasturlar yaratishni bilasiz</li>
  <li>REST API, ma'lumotlar bazasi, Docker bilan ishlashni bilasiz</li>
  <li>Asinxron dasturlash va testlar yozishni bilasiz</li>
</ul>

<hr/>

<h2>RU: Финальный проект — FastAPI + SQLAlchemy + JWT</h2>
<pre><code>from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "секретный-ключ"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def хешировать_пароль(пароль: str) -> str:
    return pwd_context.hash(пароль)

def проверить_пароль(обычный: str, хеш: str) -> bool:
    return pwd_context.verify(обычный, хеш)

def создать_токен(данные: dict) -> str:
    копия = данные.copy()
    копия["exp"] = datetime.utcnow() + timedelta(minutes=30)
    return jwt.encode(копия, SECRET_KEY, algorithm=ALGORITHM)
</code></pre>

<h3>RU: Поздравляем!</h3>
<p>Вы успешно завершили курс Python-разработчика! Теперь вы знаете:</p>
<ul>
  <li>Основы Python</li>
  <li>ООП, обработку исключений, модули</li>
  <li>Создание веб-приложений с Flask, Django, FastAPI</li>
  <li>REST API, базы данных, Docker</li>
  <li>Асинхронное программирование и тестирование</li>
</ul>`,
  },
];

// ── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🐍 Python Developer kursi yaratilmoqda...\n");

  if (TEACHER_USER_ID === "REPLACE_WITH_YOUR_USER_ID") {
    console.error(
      "❌ PYTHON_COURSE_TEACHER_ID env o'zgaruvchisini o'rnating!\n" +
        "   .env fayliga qo'shing: PYTHON_COURSE_TEACHER_ID=your_clerk_user_id"
    );
    process.exit(1);
  }

  // Find or create "Dasturlash" category
  let kategoriya = await db.category.findFirst({ where: { name: "Dasturlash" } });
  if (!kategoriya) {
    kategoriya = await db.category.create({ data: { name: "Dasturlash" } });
    console.log('✅ Kategoriya yaratildi: "Dasturlash"');
  } else {
    console.log('ℹ️  Mavjud kategoriya: "Dasturlash"');
  }

  // Create course
  const kurs = await db.course.create({
    data: {
      userId: TEACHER_USER_ID,
      title: "Python Dasturchi — Boshlang'ichdan Professional Darajaga",
      description:
        "Ushbu kursda siz Python dasturlash tilini noldan o'rganasiz: asoslardan boshlab Django, FastAPI, Docker va production deployment gacha. " +
        "Har bir mavzu uzbek va rus tillarida izohlanadi.\n\n" +
        "В этом курсе вы изучите Python с нуля до профессионального уровня: от основ до Django, FastAPI, Docker и деплоя в production. " +
        "Каждая тема объясняется на узбекском и русском языках.",
      categoryId: kategoriya.id,
      isPublished: true,
    },
  });

  console.log(`\n✅ Kurs yaratildi: "${kurs.title}"`);
  console.log(`   ID: ${kurs.id}\n`);

  // Create chapters
  console.log("📚 Boblar yaratilmoqda...");
  for (const bob of chapters) {
    await db.chapter.create({
      data: {
        courseId: kurs.id,
        title: bob.title,
        description: bob.description,
        position: bob.position,
        isFree: bob.isFree,
        isPublished: true,
      },
    });
    console.log(`   ✓ ${bob.position}. ${bob.title.substring(0, 60)}...`);
  }

  console.log(`\n🎉 Kurs muvaffaqiyatli yaratildi!`);
  console.log(`   Jami boblar: ${chapters.length}`);
  console.log(`   URL: /teacher/courses/${kurs.id}`);
  console.log(`\n🔗 Kursni admin panelida ko'rish uchun:`);
  console.log(`   http://localhost:3000/teacher/courses/${kurs.id}\n`);
}

main()
  .catch((e) => {
    console.error("❌ Xato:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
