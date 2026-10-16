import OrdenCard from "./OrdenCard";

export default function OrdenList({ ordenes, onChange }) {
  if (ordenes.length === 0)
    return (
      <p className="text-center text-gray-500">No hay órdenes registradas.</p>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ordenes.map((o) => (
        <OrdenCard key={o.id} orden={o} onChange={onChange} />
      ))}
    </div>
  );
}
