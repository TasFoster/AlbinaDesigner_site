import { useEffect, useState } from "react";
import { api } from "../api";
import { useApi } from "../hooks/useApi";
import { useBooking } from "../context/BookingContext";
import Reveal from "./Reveal";
import Arrow from "./Arrow";

const EMPTY_FORM = { name: "", phone: "", service: "", message: "" };

export default function LeadForm() {
  const { selectedService } = useBooking();
  const { data: services } = useApi(() => api.getServices(), []);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (selectedService) setForm((f) => ({ ...f, service: selectedService }));
  }, [selectedService]);

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await api.createLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service || null,
        message: form.message.trim(),
      });
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section band" id="lead-form">
      <div className="container">
        <Reveal>
          <p className="eyebrow section-label">Записаться</p>
          <div className="lead-form-layout">
            <div>
              <h2 style={{ fontSize: 28, marginBottom: 14 }}>Оставь заявку</h2>
              <p style={{ maxWidth: "34ch", color: "var(--color-ink-on-cream)" }}>
                Напиши имя и телефон — свяжусь в течение дня, чтобы обсудить детали. Заявка приходит
                мне напрямую, без посредников.
              </p>
            </div>

            {status === "success" ? (
              <div className="card lead-form__success">
                <p style={{ fontSize: 17, fontWeight: 500 }}>Заявка отправлена ✓</p>
                <p style={{ marginTop: 8, color: "var(--color-ink-on-cream)" }}>
                  Я свяжусь с тобой в Telegram или по телефону в течение дня.
                </p>
                <button type="button" className="link-more" onClick={() => setStatus("idle")}>
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form className="card lead-form" onSubmit={handleSubmit}>
                <label>
                  <span>Имя</span>
                  <input required type="text" value={form.name} onChange={updateField("name")} placeholder="Как к тебе обращаться" />
                </label>
                <label>
                  <span>Телефон</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="+7 900 000-00-00"
                  />
                </label>
                <label>
                  <span>Услуга</span>
                  <select value={form.service} onChange={updateField("service")}>
                    <option value="">Не выбрано / уточню в переписке</option>
                    {services?.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Комментарий</span>
                  <textarea
                    value={form.message}
                    onChange={updateField("message")}
                    placeholder="Необязательно — можно рассказать сразу, что нужно"
                    rows={3}
                  />
                </label>

                <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                  {status === "submitting" ? "Отправляю…" : "Отправить заявку"} <Arrow />
                </button>

                {status === "error" && (
                  <p className="lead-form__error">Не получилось отправить — попробуй ещё раз чуть позже.</p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
