import Marquee from "../components/Marquee";
import ServiceCard from "../components/ServiceCard";
import ReviewCard from "../components/ReviewCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { api } from "../api";
import { useApi } from "../hooks/useApi";

export default function ServicesPage() {
  const { data: services, loading, error } = useApi(() => api.getServices(), []);

  const reviews = services?.flatMap((service) => service.reviews) ?? [];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Как это устроено</p>
            <h1>Услуги</h1>
            <p>
              От онлайн-подборки капсулы до поездки в другой город за гардеробом мечты — три
              формата, отличаются глубиной погружения, а не качеством.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <p className="eyebrow section-label">Услуги — по нарастающей</p>
          {loading && <p>Загружаю услуги…</p>}
          {error && <p>Не получилось загрузить услуги. Попробуй обновить страницу.</p>}
          <div className="services-grid">
            {services?.map((service, index) => (
              <Reveal key={service.slug} delay={index * 90}>
                <ServiceCard service={service} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="section band">
          <div className="container">
            <p className="eyebrow section-label">Отзывы</p>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <Reveal key={review.id} delay={index * 90}>
                  <ReviewCard quote={review.quote} author={review.author} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaDark />
    </>
  );
}
