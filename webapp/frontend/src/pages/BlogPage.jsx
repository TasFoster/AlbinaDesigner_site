import BlogCard from "../components/BlogCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { featuredPost, posts } from "../data/posts";

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Заметки без глянца</p>
            <h1>Блог</h1>
            <p>О буднях подбора образов, шоп-турах и о том, что обычно не попадает в аккуратные кейсы.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <BlogCard post={featuredPost} featured />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="eyebrow section-label">Все записи</p>
          <div className="blog-grid">
            {posts.map((post, index) => (
              <Reveal key={post.title} delay={(index % 3) * 90}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
          <div className="load-more">
            <button type="button" className="btn btn-outline">
              Показать ещё
            </button>
          </div>
        </div>
      </section>

      <CtaDark />
    </>
  );
}
