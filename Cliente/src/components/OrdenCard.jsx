import { Link } from "react-router-dom";
import { updateOrden } from "../api/ordenes";

export default function OrdenCard({ orden, onChange }) {
  const cambiarEstado = async () => {
    await updateOrden(orden.id, { reparado: !orden.reparado });
    onChange();
  };

  return (
    <div
      className={`p-4 rounded shadow border-l-4 ${
        orden.reparado
          ? "border-green-500 bg-green-50"
          : "border-yellow-500 bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{orden.placa_vehiculo}</h2>
        <button onClick={cambiarEstado} title="Cambiar estado">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-7 h-7 ${orden.reparado ? "text-green-500" : "text-gray-300"}`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 8.03a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.97-1.97a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5.25-5.25Z"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-700 my-2">{orden.descripcion_falla}</p>
      <p className="font-semibold">
        Costo: ${orden.costo_estimado.toLocaleString()}
      </p>
      <p className="text-sm mb-3">
        {orden.reparado ? "✅ Reparado" : "⏳ En reparación"}
      </p>
      <Link
        to={`/ordenes/${orden.id}`}
        className="text-blue-600 hover:underline"
      >
        Editar
      </Link>
    </div>
  );
}
