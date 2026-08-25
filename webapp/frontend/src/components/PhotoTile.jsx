export default function PhotoTile({ label = "Фото скоро появится", style, src }) {
  if (src) {
    return <img className="photo-tile" src={src} alt={label} style={style} />;
  }
  return <div className="photo-tile" role="img" aria-label={label} style={style} />;
}
