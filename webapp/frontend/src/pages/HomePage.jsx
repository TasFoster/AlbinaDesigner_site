import Marquee from "../components/Marquee";
import PhotoFrame from "../components/PhotoFrame";
import PhotoTile from "../components/PhotoTile";
import ServiceCard from "../components/ServiceCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import Arrow from "../components/Arrow";
import { services } from "../data/services";

export default function HomePage() {
  return (
    <>
      <section className="hero-split">
        <div className="container">
          <Reveal>
            <h1>
              Подбираю образ,
              <br />а не гардероб целиком.
            </h1>
            <p>
              Не стаж и опыт — свежий взгляд на твой стиль. Капсула гардероба, совместный шопинг и
              шоп-тур для тех, кто хочет преобразиться.
            </p>
            <div className="hero-split__actions">
              <a href="#footer-contacts" className="btn btn-primary">
                Записаться <Arrow />
              </a>
              <span className="btn-meta">от 3 000 ₽ · Москва / Саратов</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <PhotoFrame label="Альбина в примерочной" />
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <p className="eyebrow section-label">Процесс, а не витрина</p>
          <div className="process-strip">
            {[-4, 2, -2, 4].map((rotate, index) => (
              <Reveal key={rotate} delay={index * 90} style={{ "--tile-rotate": `${rotate}deg` }}>
                <PhotoTile label={`Процесс подбора образа, кадр ${index + 1}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="eyebrow section-label">Услуги — по нарастающей</p>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 90}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaDark />
    </>
  );
}
