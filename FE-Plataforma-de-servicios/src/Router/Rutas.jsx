
import Login from "../pages/Login";
import { Routes, Route } from 'react-router-dom';
import  Proveedor_registro from "../pages/Proveedor_registro";
import  Clientes_Registro  from "../pages/Clientes_registro";
import Pagina_proveedor from "../pages/Pagina_proveedor";
import Servicios from "../pages/Servicios";
import  Clientes_page from "../pages/Cliente_home";
import Listado_contratos from "../componentes/Pagina_Proveedor/Contrato";


const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/provedores" element={<Proveedor_registro/>} /> 
        <Route path="/clientes" element={<Clientes_Registro/>} /> 
        <Route path="/pageprove" element={<Pagina_proveedor/>} /> 
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/homecliente" element={<Clientes_page />} />
        <Route path="/contratos" element={<Listado_contratos/>} />

    </Routes>
    </>
  );
};

export default Rutas;
