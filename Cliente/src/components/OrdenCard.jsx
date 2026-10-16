import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
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
          <FaCheckCircle
            size={26}
            className={orden.reparado ? "text-green-500" : "text-gray-300"}
          />
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
