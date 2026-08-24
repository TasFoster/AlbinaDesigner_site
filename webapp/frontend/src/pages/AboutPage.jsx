import PhotoFrame from "../components/PhotoFrame";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { about } from "../data/about";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Знакомство</p>
            <h1>Альбина</h1>
            <p>{about.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <PhotoFrame label="Портрет Альбины" />
          </Reveal>
          <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <Reveal className="pull-quote">
            <span className="pull-quote__mark" aria-hidden="true">
              «
            </span>
            <p>{about.quote}</p>
          </Reveal>
        </div>
      </section>

      <CtaDark />
    </>
  );
}
