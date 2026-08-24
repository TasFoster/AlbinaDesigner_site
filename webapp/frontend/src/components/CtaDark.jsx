import Reveal from "./Reveal";
import Arrow from "./Arrow";

export default function CtaDark({
  label = "Бесплатно, без обязательств",
  heading = "PDF-чек-лист «Как собрать образ»",
  text = "Короткая рабочая шпаргалка — как собрать образ, если под рукой только твой гардероб.",
  buttonLabel = "Подписаться в Telegram",
  note = "Файл придёт в боте сразу после подписки",
}) {
  return (
    <section className="cta-dark">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{label}</span>
          <h2>{heading}</h2>
          <p>{text}</p>
          <a href="#" className="btn btn-primary">
            {buttonLabel} <Arrow />
          </a>
          {note && <small>{note}</small>}
        </Reveal>
      </div>
    </section>
  );
}
