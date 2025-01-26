import React, { useState } from "react";
import "./search.css";

const SearchCliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputFocus = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("Datos guardados");
    setIsModalOpen(false);
  };

  return (
    <div className="contenedorSearch">
      <div className="textos">
        <h1>Encuentra el profesional perfecto para ti</h1>
        <p>Obtenga cotizaciones gratuitas en minutos</p>
      </div>
      <div className="inputs">
        <input
          type="text"
          placeholder="¿Qué servicio estás buscando?"
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          placeholder="ubicación"
          onFocus={handleInputFocus}
        />
        <button>Search</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
           
            <div className="modal-content">
        
            </div>
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>Guardar</button>
              <button className="exit-button" onClick={closeModal}>Salir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCliente;
