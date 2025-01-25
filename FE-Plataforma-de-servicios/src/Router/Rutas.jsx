import React from "react";
import Login from "../pages/Login";
import { Routes, Route } from 'react-router-dom';
import  Proveedor_registro from "../pages/Proveedor_registro";
import  Clientes_Registro  from "../pages/Clientes_registro";
import Pagina_proveedor from "../pages/Pagina_proveedor";

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/provedores" element={<Proveedor_registro/>} /> 
        <Route path="/clientes" element={<Clientes_Registro/>} /> 
        <Route path="/pageprove" element={<Pagina_proveedor/>} /> 
    </Routes>
    </>
  );
};

export default Rutas;
