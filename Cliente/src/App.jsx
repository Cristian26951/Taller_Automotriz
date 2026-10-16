import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import OrdenForm from "./pages/OrdenForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ordenes/nueva" element={<OrdenForm />} />
          <Route path="/ordenes/:id" element={<OrdenForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
