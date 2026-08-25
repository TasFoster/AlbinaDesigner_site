import { Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function Footer() {
  const { profile } = useProfile();

  return (
    <footer className="site-footer">
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
            <Link to="/about">О мне</Link>
            <a href="#lead-form">Записаться</a>
          </nav>

          <div className="site-footer__contacts">
            {profile?.telegram_bot_url && (
              <a href={profile.telegram_bot_url} target="_blank" rel="noreferrer">
                Написать в Telegram
              </a>
            )}
            {profile?.telegram_channel_url && (
              <a href={profile.telegram_channel_url} target="_blank" rel="noreferrer">
                Канал в Telegram
              </a>
            )}
          </div>
        </div>

        <div className="site-footer__bottom">
          © {new Date().getFullYear()} albina — подбор образа, а не гардероб целиком
        </div>
      </div>
    </footer>
  );
}
