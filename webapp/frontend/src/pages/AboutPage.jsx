import PhotoFrame from "../components/PhotoFrame";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { useProfile } from "../context/ProfileContext";

export default function AboutPage() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return (
      <section className="section">
        <div className="container">
          <p>Загружаю…</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Знакомство</p>
            <h1>Альбина</h1>
            <p>{profile.about_intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <PhotoFrame label="Портрет Альбины" />
          </Reveal>
          <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {profile.about_paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {profile.about_quote && (
        <section className="section band">
          <div className="container">
            <Reveal className="pull-quote">
              <span className="pull-quote__mark" aria-hidden="true">
                «
              </span>
              <p>{profile.about_quote}</p>
            </Reveal>
          </div>
        </section>
      )}

      <CtaDark />
    </>
  );
}
