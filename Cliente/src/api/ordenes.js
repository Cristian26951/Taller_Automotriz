import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/ordenes`,
});

export const fetchOrdenes = () => api.get("");
export const fetchOrden = (id) => api.get(`/${id}`);
export const createOrden = (orden) => api.post("", orden);
export const updateOrden = (id, orden) => api.put(`/${id}`, orden);
export const deleteOrden = (id) => api.delete(`/${id}`);