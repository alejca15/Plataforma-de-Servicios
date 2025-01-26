import React from "react";
import "./search.css";

const search_cliente = () => {
  return (
    <div className="contenedorSearch">
      <div className="textos">
        <h1>Encuentra el profesional perfecto para ti</h1>
        <p>Obtenga cotizaciones gratuitas en minutos</p>
      </div>
      <div className="inputs">
        <input type="text" placeholder="¿Qué servicio estás buscando?" />
        <input type="text" placeholder="ubicación" />
        <button>search</button>
      </div>
    </div>
  );
};

export default search_cliente;
