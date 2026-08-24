export default function PhotoTile({ label = "Фото скоро появится", style }) {
  return <div className="photo-tile" role="img" aria-label={label} style={style} />;
}
