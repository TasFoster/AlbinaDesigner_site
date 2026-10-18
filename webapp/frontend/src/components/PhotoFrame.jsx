export default function PhotoFrame({ label = "Фото скоро появится", className = "", src }) {
  return (
    <div className={`photo-frame ${className}`}>
      <div className="photo-frame__inner" role={src ? undefined : "img"} aria-label={src ? undefined : label}>
        {src && <img src={src} alt={label} loading="lazy" decoding="async" />}
      </div>
    </div>
  );
}
