import Reveal from "./Reveal";
import Arrow from "./Arrow";
import { useProfile } from "../context/ProfileContext";

export default function CtaDark({ label, heading, text, buttonLabel = "Подписаться в Telegram", note, href, onClick }) {
  const { profile } = useProfile();

  const resolvedLabel = label ?? profile?.lead_magnet_label ?? "Бесплатно, без обязательств";
  const resolvedHeading = heading ?? profile?.lead_magnet_heading ?? "PDF-гайд «Как разобрать гардероб самостоятельно»";
  const resolvedText =
    text ??
    profile?.lead_magnet_text ??
    "Пошаговая схема на каждую вещь в шкафу — оставить, отдать, в химчистку или выбросить. Наводишь порядок сама, без стилиста.";
  const resolvedNote = note === undefined ? profile?.lead_magnet_note : note;
  const resolvedHref = href ?? profile?.lead_magnet_bot_link ?? "#lead-form";

  return (
    <section className="cta-dark">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{resolvedLabel}</span>
          <h2>{resolvedHeading}</h2>
          <p>{resolvedText}</p>
          {onClick ? (
            <button type="button" className="btn btn-primary" onClick={onClick}>
              {buttonLabel} <Arrow />
            </button>
          ) : (
            <a
              href={resolvedHref}
              className="btn btn-primary"
              {...(resolvedHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {buttonLabel} <Arrow />
            </a>
          )}
          {resolvedNote && <small>{resolvedNote}</small>}
        </Reveal>
      </div>
    </section>
  );
}
