# Albina site — webapp

Сайт-визитка стилиста Альбины: React-фронтенд, Django-бэкенд, Postgres.

```
webapp/
├── frontend/          # Vite + React
├── backend/           # Django 6.1 + DRF, venv в backend/.venv
├── docker-compose.yml # локальный Postgres 18 (только для разработки)
├── ОПИСАНИЕ-ФУНКЦИОНАЛА.md  # полное описание функционала сайта и бота
└── telegram-bot-plan.md    # план разработки Telegram-бота
```

📖 **Полное описание того, что делает система** (страницы, админка, API, бот,
статус готовности) — в [`ОПИСАНИЕ-ФУНКЦИОНАЛА.md`](./ОПИСАНИЕ-ФУНКЦИОНАЛА.md).

Версии пакетов бэкенда (Django 6.1, DRF 3.18.0, psycopg 3.3.4, gunicorn, whitenoise)
специально подобраны так, чтобы совпадать с уже развёрнутым окружением на боевом
VPS (Санкт-Петербург, 186.246.14.76) — см. `backend/requirements.txt`.

## Первый запуск

### 1. База данных (Postgres в Docker)

```bash
cd webapp
docker compose up -d
```

Поднимает Postgres 18 на `localhost:5432`, база `albina_dev`, пользователь `albina`
(пароль и порт можно переопределить переменными окружения `POSTGRES_*` перед `docker compose up`).
Это **отдельная база для локальной разработки** — не путать с боевой `albina_site` на VPS.

### 2. Бэкенд (Django)

```bash
cd webapp/backend
./.venv/Scripts/python.exe manage.py migrate
./.venv/Scripts/python.exe manage.py createsuperuser
./.venv/Scripts/python.exe manage.py runserver
```

`backend/.env` уже настроен на локальный Postgres из docker-compose (скопирован из
`.env.example` с сгенерированным `SECRET_KEY`). Если `DATABASE_URL` не задан или
Postgres недоступен — Django автоматически откатится на файл `db.sqlite3`.

Проверка, что бэкенд видит базу: `GET http://127.0.0.1:8000/api/health/` →
`{"status": "ok", "database": "postgresql"}`.

Приложения: `core` (профиль сайта/лид-магнит, `SiteProfile` — синглтон),
`services` (услуги + отзывы), `blog` (записи блога), `leads` (заявки +
подписчики Telegram-бота). Заполнить демо-контентом (идемпотентно):

```bash
./.venv/Scripts/python.exe manage.py seed_demo_data
```

Фронтенд получает весь контент из этого API (никаких `data/*.js` больше нет).

### 2а. Telegram-бот

```bash
cd webapp/backend
./.venv/Scripts/python.exe manage.py run_bot
```

Нужен `TELEGRAM_BOT_TOKEN` в `.env` (от @BotFather). Подробности — в
[`ОПИСАНИЕ-ФУНКЦИОНАЛА.md`](./ОПИСАНИЕ-ФУНКЦИОНАЛА.md#5-telegram-бот-albinadesigner_bot--реализован-и-работает-на-проде).

Публичное API: `/api/services/`, `/api/services/<slug>/`, `/api/reviews/`,
`/api/posts/`, `/api/posts/<slug>/`, `/api/profile/`, `POST /api/leads/`
(создание заявки открыто всем, просмотр списка — только staff). Админка —
`/admin/`.

### 3. Фронтенд (React + Vite)

```bash
cd webapp/frontend
npm install   # уже сделано при создании проекта
npm run dev
```

Откроется на `http://localhost:5173`. Скопируйте `.env.example` → `.env`, если нужно
поменять адрес backend API (`VITE_API_URL`).

## Активация venv в PowerShell

```powershell
webapp\backend\.venv\Scripts\Activate.ps1
```

## Заметки

- CORS для фронтенда на `localhost:5173` уже разрешён в `backend/config/settings.py`
  (`CORS_ALLOWED_ORIGINS`, читается из `.env`).
- `.env` в `backend/` не должен попадать в git (см. `backend/.gitignore`) — реальные
  секреты (боевой `SECRET_KEY`, пароль БД) хранятся только на самом сервере
  (`/var/www/albina/.env`), сюда не копировать.
- **Сайт развёрнут и работает**: https://24albinadisigner.ru/ — фронтенд,
  бэкенд (gunicorn за Nginx, `/api/` и `/admin/` проксируются) и бот
  (systemd, long polling) все на одном VPS. Подробный статус — в
  [`ОПИСАНИЕ-ФУНКЦИОНАЛА.md`](./ОПИСАНИЕ-ФУНКЦИОНАЛА.md).
- На сервере `api.telegram.org` резолвится в заблокированный (на уровне
  TLS/SNI) IP — обойдено записью в `/etc/hosts` на другой IP того же пула
  Telegram. См. раздел 5 в ОПИСАНИЕ-ФУНКЦИОНАЛА.md, если бот/уведомления
  вдруг перестанут работать.
