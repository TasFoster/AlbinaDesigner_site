import PhotoTile from "./PhotoTile";

export default function BlogCard({ post, featured = false }) {
  if (featured) {
    return (
      <article className="card blog-card--featured">
        <PhotoTile label={post.title} style={{ aspectRatio: "4 / 3" }} />
        <div>
          <span className="pill pill-tag">{post.tag}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="blog-card__meta">
            {post.date} · {post.readTime}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-card">
      <div className="blog-card__photo">
        <PhotoTile label={post.title} />
      </div>
      <span className="pill pill-tag">{post.tag}</span>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card__meta">
        {post.date} · {post.readTime}
      </div>
    </article>
  );
}
