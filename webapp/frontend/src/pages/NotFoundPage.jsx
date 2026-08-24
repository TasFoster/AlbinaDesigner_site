import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Arrow from "../components/Arrow";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Ошибка 404</p>
          <h1>Страница потерялась</h1>
          <p>Такой страницы нет — возможно, ссылка устарела.</p>
          <Link to="/" className="btn btn-primary">
            На главную <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
