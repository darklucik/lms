# 🎓 LearnFlow LMS

> Современная LMS на Next.js 13 + React + TypeScript + Tailwind + Shadcn UI

## ✨ Что изменено и добавлено

### 🎨 UI / Дизайн
- Новая фиолетовая брендовая тема вместо синей
- Sidebar — новые активные состояния, иконки, плавные transitions
- Новый SVG-логотип LearnFlow без зависимости от файла
- Карточки курсов — hover анимации, бейджи категорий, цена / прогресс
- Dashboard студента — статистика, разделение на «в процессе» и «завершённые»
- Info Cards с иконками и акцентными цветами по статусу
- Страница главы — redesign вложений, красивый header
- Sidebar курса — прогресс-бар, счётчик уроков, иконки статуса глав
- Категории — pill-кнопки с активным фиолетовым состоянием

### 🎬 Видео (без Mux)
- Удалена зависимость от Mux (платный сервис ~20 USD/мес)
- Видео хранятся через UploadThing (бесплатный tier)
- Воспроизведение через нативный HTML5 video-плеер
- Автоматическое завершение главы при окончании видео
- Spinner при загрузке видео

### 📊 Прогресс студентов
- Progress bar в sidebar курса с % завершения
- Счётчик уроков (X of Y lessons done)
- Иконки CheckCircle2 у завершённых глав
- Кнопки Mark as complete / Mark as incomplete с цветами

## 🚀 Запуск

```bash
git clone <repo>
cd lms
npm install
cp .env.example .env
# заполнить .env
npx prisma generate
npx prisma db push
npm run dev
```

Открыть http://localhost:3000

## Нужные сервисы (все бесплатные)

| Сервис | Для чего |
|--------|----------|
| Clerk | Авторизация пользователей |
| UploadThing | Загрузка видео и файлов |
| PlanetScale | MySQL база данных |

## Стек
Next.js 13 App Router, React 18, TypeScript, Tailwind CSS, Shadcn UI, Prisma, Clerk, UploadThing, Zustand

## Что можно добавить ещё
- Квизы внутри уроков
- Сертификаты о прохождении
- Комментарии к урокам
- Email уведомления
- Stripe оплата (код уже частично есть)
