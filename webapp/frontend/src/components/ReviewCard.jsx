export default function ReviewCard({ quote, author }) {
  return (
    <article className="review-card">
      <span className="review-card__mark" aria-hidden="true">
        «
      </span>
      <p>{quote}</p>
      <div className="review-card__attribution">{author}</div>
    </article>
  );
}
