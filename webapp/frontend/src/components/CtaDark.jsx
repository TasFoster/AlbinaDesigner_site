import Reveal from "./Reveal";
import Arrow from "./Arrow";

export default function CtaDark({
  label = "Бесплатно, без обязательств",
  heading = "PDF-гайд «Как разобрать гардероб самостоятельно»",
  text = "Пошаговая схема на каждую вещь в шкафу — оставить, отдать, в химчистку или выбросить. Наводишь порядок сама, без стилиста.",
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
