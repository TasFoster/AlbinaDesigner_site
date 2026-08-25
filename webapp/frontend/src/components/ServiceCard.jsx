import { Link } from "react-router-dom";
import Arrow from "./Arrow";

export default function ServiceCard({ service, detailed = false }) {
  return (
    <article className="card service-card">
      <span className="pill pill-price">{service.price_display}</span>
      <h3>{service.title}</h3>
      <p>{service.short_desc}</p>

      {detailed && (
        <ul className="service-card__features">
          {service.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}

      <Link to={`/services/${service.slug}`} className="link-more">
        Подробнее <Arrow />
      </Link>
    </article>
  );
}
