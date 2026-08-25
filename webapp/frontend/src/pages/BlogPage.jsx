import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { api } from "../api";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .getPosts(1)
      .then((data) => {
        if (!alive) return;
        setPosts(data.results);
        setHasMore(Boolean(data.next));
        setPage(1);
        setLoading(false);
      })
      .catch((err) => alive && (setError(err), setLoading(false)));
    return () => {
      alive = false;
    };
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const data = await api.getPosts(page + 1);
      setPosts((prev) => [...prev, ...data.results]);
      setHasMore(Boolean(data.next));
      setPage((p) => p + 1);
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }

  const [featured, ...rest] = posts;

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

      {loading && (
        <section className="section">
          <div className="container">
            <p>Загружаю записи…</p>
          </div>
        </section>
      )}

      {error && (
        <section className="section">
          <div className="container">
            <p>Не получилось загрузить блог. Попробуй обновить страницу.</p>
          </div>
        </section>
      )}

      {featured && (
        <section className="section">
          <div className="container">
            <Reveal>
              <BlogCard post={featured} featured />
            </Reveal>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <p className="eyebrow section-label">Все записи</p>
            <div className="blog-grid">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={(index % 3) * 90}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
            {hasMore && (
              <div className="load-more">
                <button type="button" className="btn btn-outline" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? "Загружаю…" : "Показать ещё"}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaDark />
    </>
  );
}
