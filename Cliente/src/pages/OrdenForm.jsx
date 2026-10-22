import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createOrden,
  fetchOrden,
  updateOrden,
  deleteOrden,
} from "../api/ordenes";

export default function OrdenForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [orden, setOrden] = useState({
    placa_vehiculo: "",
    descripcion_falla: "",
    costo_estimado: "",
    reparado: false,
  });

  useEffect(() => {
    if (id) fetchOrden(id).then((res) => setOrden(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrden({ ...orden, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const datos = {
      ...orden,
      costo_estimado: parseFloat(orden.costo_estimado),
    };
    try {
      if (id) await updateOrden(id, datos);
      else await createOrden(datos);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Error al guardar la orden");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Eliminar esta orden?")) {
      await deleteOrden(id);
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">
        {id ? "Editar Orden" : "Nueva Orden"}
      </h1>
      {error && <p className="bg-red-100 text-red-700 p-2 rounded">{error}</p>}

      <input
        name="placa_vehiculo"
        placeholder="Placa(ABC123)"
        value={orden.placa_vehiculo}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="descripcion_falla"
        placeholder="Descripción de la falla"
        value={orden.descripcion_falla}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="costo_estimado"
        type="number"
        placeholder="Costo estimado"
        value={orden.costo_estimado}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="reparado"
          checked={orden.reparado}
          onChange={handleChange}
        />
        Vehículo reparado
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
