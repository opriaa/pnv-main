export default function Skeleton({ width = "100%", height = "20px", count = 1, style = {} }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ width, height, ...style }} />
      ))}
    </>
  );
}
