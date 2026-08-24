import { Link, Navigate, useParams } from "react-router-dom";
import PhotoFrame from "../components/PhotoFrame";
import PhotoTile from "../components/PhotoTile";
import ReviewCard from "../components/ReviewCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import Arrow from "../components/Arrow";
import { getServiceBySlug } from "../data/services";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <section className="hero-split">
        <div className="container">
          <Reveal>
            <Link to="/services" className="breadcrumb">
              <span className="arrow" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
                →
              </span>{" "}
              Все услуги
            </Link>
            <span className="pill pill-price">{service.price}</span>
            <h1 style={{ marginTop: 16 }}>{service.title}</h1>
            <p>{service.longDesc}</p>
            <div className="hero-split__actions">
              <a href="#footer-contacts" className="btn btn-primary">
                {service.ctaLabel} <Arrow />
              </a>
              <span className="btn-meta">{service.duration}</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <PhotoFrame label={service.title} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow section-label">Как это работает</p>
          <div className="steps">
            {service.steps.map((step, index) => (
              <Reveal as="div" className="step" key={step.title} delay={index * 100}>
                <span className="step__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="eyebrow section-label">{service.examplesLabel}</p>
          <div className="gallery-grid">
            {[1, 2, 3, 4].map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <PhotoTile label={`${service.examplesLabel}, кадр ${item}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <p className="eyebrow section-label">Отзыв</p>
          <Reveal style={{ maxWidth: 520 }}>
            <ReviewCard quote={service.review.quote} author={service.review.author} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container two-col-list">
          <Reveal>
            <h3>Кому подойдёт</h3>
            <ul>
              {service.forWhom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3>Что получишь</h3>
            <ul>
              {service.whatYouGet.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaDark
        label={service.ctaDark.label}
        heading={service.ctaDark.heading}
        text={service.ctaDark.text}
        buttonLabel="Написать в Telegram"
        note={null}
      />
    </>
  );
}
