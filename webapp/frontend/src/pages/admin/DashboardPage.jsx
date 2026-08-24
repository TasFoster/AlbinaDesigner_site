import { adminServices, blogDrafts, leads, stats, statusColors } from "../../data/admin";
import Reveal from "../../components/Reveal";

const TREND_CLASS = {
  up: "stat-card__trend--up",
  down: "stat-card__trend--down",
  flat: "",
};

const TREND_ARROW = {
  up: "▲",
  down: "▼",
  flat: "—",
};

export default function DashboardPage() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Дашборд</h1>
          <p>Обзор на 17 августа 2026</p>
        </div>
        <div className="admin-avatar" aria-hidden="true">
          А
        </div>
      </div>

      <div className="admin-stats">
        {stats.map((stat, index) => (
          <Reveal as="div" className="stat-card" key={stat.label} delay={index * 80}>
            <div className="stat-card__label eyebrow">{stat.label}</div>
            <div className="stat-card__value">{stat.value}</div>
            <div className={`stat-card__trend ${TREND_CLASS[stat.direction]}`}>
              {TREND_ARROW[stat.direction]} {stat.trend}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, textTransform: "none" }}>Последние заявки</h2>
          <a href="#" className="admin-list__action">
            Все заявки
          </a>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Услуга</th>
                <th>Дата</th>
                <th>Телефон</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.name + lead.date}>
                  <td>{lead.name}</td>
                  <td>{lead.service}</td>
                  <td>{lead.date}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <span className="pill pill-status" style={{ "--status-color": statusColors[lead.status] }}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-panels">
        <Reveal as="div" className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 20, textTransform: "none" }}>Услуги</h2>
            <a href="#" className="admin-list__action">
              + Добавить
            </a>
          </div>
          <div className="admin-list">
            {adminServices.map((service) => (
              <div className="admin-list__row" key={service.title}>
                <div>
                  <strong>{service.title}</strong>
                  <span>{service.price}</span>
                </div>
                <a href="#" className="admin-list__action">
                  Изменить
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="card" delay={80}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 20, textTransform: "none" }}>Черновики блога</h2>
            <a href="#" className="admin-list__action">
              + Новая запись
            </a>
          </div>
          <div className="admin-list">
            {blogDrafts.map((draft) => (
              <div className="admin-list__row" key={draft.title}>
                <div>
                  <strong>{draft.title}</strong>
                  <span>обновлено {draft.updated}</span>
                </div>
                <span
                  className="pill pill-status"
                  style={{ "--status-color": draft.status === "опубликовано" ? "#7a7233" : "#a89b8b" }}
                >
                  {draft.status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
