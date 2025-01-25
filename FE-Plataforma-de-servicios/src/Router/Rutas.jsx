import React from "react";
import Login from "../pages/Login";
import ProveedorRegistro from "../pages/Proveedor_registro";
import ClientesRegistro from "../pages/Clientes_registro";
import ProvedorPage from "../pages/Provedor_Page";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/proveedores" element={<ProveedorRegistro />} />
      <Route path="/clientes" element={<ClientesRegistro />} />
      <Route path="/beta" element={<ProvedorPage />} />
    </Routes>
  );
};

export default Rutas;
