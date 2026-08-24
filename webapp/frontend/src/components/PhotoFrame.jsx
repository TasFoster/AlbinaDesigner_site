export default function PhotoFrame({ label = "Фото скоро появится", className = "" }) {
  return (
    <div className={`photo-frame ${className}`}>
      <div className="photo-frame__inner" role="img" aria-label={label} />
    </div>
  );
}
