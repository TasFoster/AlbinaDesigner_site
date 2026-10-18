import { Link } from "react-router-dom";
import Arrow from "./Arrow";
import { getServiceImages } from "../data/serviceImages";

export default function ServiceCard({ service, detailed = false }) {
  const photo = getServiceImages(service.slug).hero;
  return (
    <article className="card service-card">
      {photo && <img className="service-card__image" src={photo} alt={`Пример образа: ${service.title}`} loading="lazy" decoding="async" />}
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
