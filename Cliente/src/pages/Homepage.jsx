import { useEffect, useState } from "react";
import { fetchOrdenes } from "../api/ordenes";
import OrdenList from "../components/OrdenList";

export default function Homepage() {
  const [ordenes, setOrdenes] = useState([]);

  const cargar = async () => {
    const res = await fetchOrdenes();
    setOrdenes(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  return <OrdenList ordenes={ordenes} onChange={cargar} />;
}
