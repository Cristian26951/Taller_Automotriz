import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-3 gap-2">
        <Link to="/" className="text-x1 font-bold">
          {" "}
          Taller Automotriz{" "}
        </Link>
        <Link
          to="/ordenes/nueva"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-4 rounded"
        >
          Nueva Orden
        </Link>
      </div>
    </nav>
  );
}
