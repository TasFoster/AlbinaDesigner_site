import { Link, Navigate, useParams } from "react-router-dom";
import { getServiceImages } from "../data/serviceImages";
import PhotoFrame from "../components/PhotoFrame";
import PhotoTile from "../components/PhotoTile";
import ReviewCard from "../components/ReviewCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import Arrow from "../components/Arrow";
import { api } from "../api";
import { useApi } from "../hooks/useApi";
import { useBooking } from "../context/BookingContext";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { data: service, loading, error } = useApi(() => api.getService(slug), [slug]);
  const { requestBooking } = useBooking();

  if (error) {
    return <Navigate to="/services" replace />;
  }

  if (loading || !service) {
    return (
      <section className="section">
        <div className="container">
          <p>Загружаю услугу…</p>
        </div>
      </section>
    );
  }

  const review = service.reviews?.[0];
  const images = getServiceImages(service.slug);

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
            <span className="pill pill-price">{service.price_display}</span>
            <h1 style={{ marginTop: 16 }}>{service.title}</h1>
            <p>{service.long_desc}</p>
            <div className="hero-split__actions">
              <button type="button" className="btn btn-primary" onClick={() => requestBooking(service.slug)}>
                {service.cta_label} <Arrow />
              </button>
              <span className="btn-meta">{service.duration}</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <PhotoFrame label={service.title} src={images.hero} />
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
          <p className="eyebrow section-label">{service.examples_label}</p>
          <div className="gallery-grid">
            {[1, 2, 3, 4].map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <PhotoTile label={`${service.examples_label}, кадр ${item}`} src={images.gallery[index]} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {review && (
        <section className="section band">
          <div className="container">
            <p className="eyebrow section-label">Отзыв</p>
            <Reveal style={{ maxWidth: 520 }}>
              <ReviewCard quote={review.quote} author={review.author} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container two-col-list">
          <Reveal>
            <h3>Кому подойдёт</h3>
            <ul>
              {service.for_whom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3>Что получишь</h3>
            <ul>
              {service.what_you_get.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaDark
        label={service.cta_dark_label}
        heading={service.cta_dark_heading}
        text={service.cta_dark_text}
        buttonLabel="Написать"
        note={null}
        onClick={() => requestBooking(service.slug)}
      />
    </>
  );
}
