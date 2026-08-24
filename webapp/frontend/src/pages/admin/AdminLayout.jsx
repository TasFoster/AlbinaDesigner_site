import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Дашборд", to: "/admin", end: true },
  { label: "Заявки" },
  { label: "Услуги" },
  { label: "Блог" },
  { label: "Отзывы" },
  { label: "Настройки" },
];

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-sidebar__logo">
            <span className="logo" style={{ color: "var(--color-cream)" }}>
              albina.
            </span>
            <span>admin</span>
          </div>
          <nav className="admin-sidebar__nav">
            {NAV_ITEMS.map((item) =>
              item.to ? (
                <NavLink key={item.label} to={item.to} end={item.end} className={({ isActive }) => (isActive ? "active" : "")}>
                  {item.label}
                </NavLink>
              ) : (
                <span key={item.label} aria-disabled="true" style={{ opacity: 0.45 }}>
                  {item.label}
                </span>
              )
            )}
          </nav>
        </div>
        <a href="/" className="admin-sidebar__back">
          ← На сайт
        </a>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
