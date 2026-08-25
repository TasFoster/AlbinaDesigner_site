import { Link } from "react-router-dom";
import PhotoTile from "./PhotoTile";
import { formatDate, formatReadMinutes } from "../utils/format";

export default function BlogCard({ post, featured = false }) {
  const meta = `${formatDate(post.published_at)} · ${formatReadMinutes(post.read_minutes)}`;

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="card blog-card--featured">
        <PhotoTile label={post.title} src={post.cover_image} style={{ aspectRatio: "4 / 3" }} />
        <div>
          <span className="pill pill-tag">{post.tag}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="blog-card__meta">{meta}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card__photo">
        <PhotoTile label={post.title} src={post.cover_image} />
      </div>
      <span className="pill pill-tag">{post.tag}</span>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card__meta">{meta}</div>
    </Link>
  );
}
