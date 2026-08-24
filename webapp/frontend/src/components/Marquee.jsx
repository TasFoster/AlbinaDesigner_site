const ITEMS = ["Тёмные очки", "Бирка от 3 000 ₽", "Красный акцент", "Живое зеркало"];

function MarqueeGroup() {
  return (
    <ul className="marquee-list" aria-hidden="true">
      {ITEMS.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <span className="visually-hidden">{ITEMS.join(", ")}</span>
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
