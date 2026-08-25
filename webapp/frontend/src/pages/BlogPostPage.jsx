import { Link, Navigate, useParams } from "react-router-dom";
import PhotoTile from "../components/PhotoTile";
import CtaDark from "../components/CtaDark";
import Reveal from "../components/Reveal";
import { api } from "../api";
import { useApi } from "../hooks/useApi";
import { formatDate, formatReadMinutes } from "../utils/format";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: post, loading, error } = useApi(() => api.getPost(slug), [slug]);

  if (error) {
    return <Navigate to="/blog" replace />;
  }

  if (loading || !post) {
    return (
      <section className="section">
        <div className="container">
          <p>Загружаю запись…</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <Link to="/blog" className="breadcrumb">
              <span className="arrow" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
                →
              </span>{" "}
              Все записи
            </Link>
            <span className="pill pill-tag">{post.tag}</span>
            <h1 style={{ marginTop: 16 }}>{post.title}</h1>
            <p className="btn-meta">
              {formatDate(post.published_at)} · {formatReadMinutes(post.read_minutes)}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {post.cover_image && (
            <Reveal style={{ marginBottom: 32 }}>
              <PhotoTile label={post.title} src={post.cover_image} style={{ aspectRatio: "16 / 9" }} />
            </Reveal>
          )}
          <Reveal className="blog-post-body">
            {post.body.split(/\n{2,}/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaDark />
    </>
  );
}
