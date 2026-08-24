import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer-contacts">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M10 14v-2a6 6 0 0 1 12 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M8 14h16l-1.6 12.5a2 2 0 0 1-2 1.5H11.6a2 2 0 0 1-2-1.5L8 14Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="logo">albina.</span>
          </div>

          <nav aria-label="Навигация по сайту">
            <Link to="/services">Услуги</Link>
            <Link to="/blog">Блог</Link>
            <a href="#footer-contacts">О мне</a>
            <a href="#footer-contacts">Написать</a>
          </nav>

          <div className="site-footer__contacts">
            <a href="#">Telegram</a>
            <a href="#">Instagram</a>
            <a href="tel:+79990000000">+7 (999) 000-00-00</a>
          </div>
        </div>

        <div className="site-footer__bottom">
          © {new Date().getFullYear()} albina — подбор образа, а не гардероб целиком
        </div>
      </div>
    </footer>
  );
}
