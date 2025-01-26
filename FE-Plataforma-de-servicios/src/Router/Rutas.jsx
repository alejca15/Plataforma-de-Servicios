import React from "react";
import Login from "../pages/Login";
import { Routes, Route } from 'react-router-dom';
import  Proveedor_registro from "../pages/Proveedor_registro";
import  Clientes_Registro  from "../pages/Clientes_registro";


const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/provedores" element={<Proveedor_registro/>} /> 
        <Route path="/clientes" element={<Clientes_Registro/>} /> 
 
    </Routes>
    </>
  );
};

export default Rutas;
