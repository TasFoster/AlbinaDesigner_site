import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">
          albina.
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
            Услуги
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
            Блог
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            О мне
          </NavLink>
          <a href="#lead-form">Написать</a>
        </nav>
      </div>
    </header>
  );
}
