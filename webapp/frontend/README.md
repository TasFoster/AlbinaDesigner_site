# Albina site — frontend

React + Vite. Сайт-визитка стилиста Альбины.

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # продакшн-сборка в dist/
```

Адрес backend API можно задать в `.env` (`VITE_API_URL`, см. `.env.example`).

## Структура

```
src/
├── main.jsx            # точка входа, BrowserRouter
├── App.jsx             # маршруты (react-router-dom)
├── pages/              # страницы: Home, Services, ServiceDetail, Blog, About, NotFound
│   └── admin/          # макет админ-дашборда (AdminLayout, DashboardPage)
├── components/         # Header, Footer, Marquee, PhotoFrame, ServiceCard, ReviewCard,
│                       #   BlogCard, CtaDark, Reveal, Arrow, SiteLayout
├── hooks/useReveal.js  # scroll-reveal через IntersectionObserver + fallback-таймер
├── data/               # контент (services, posts, about, admin) — пока статичный
└── styles/             # tokens, base, layout, components, pages (CSS-модули по слоям)
```

## Важное

- **Данные пока захардкожены** в `src/data/*.js` — фронт ещё не подключён к Django API
  (`webapp/backend`). Контент там намеренно совпадает с тем, что засевается командой
  `manage.py seed_demo_data` на бэкенде.
- **Фото — плейсхолдеры** (серо-бежевые блоки в «рамке зеркала»): реальные фото пока
  не заведены.
- Полное описание функционала — в [`../ОПИСАНИЕ-ФУНКЦИОНАЛА.md`](../ОПИСАНИЕ-ФУНКЦИОНАЛА.md).
