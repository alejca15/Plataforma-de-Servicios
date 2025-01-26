import React, { useState } from "react";
import "./search.css";
import Services_services from "../../services/Services_services"
import { useEffect } from "react";

const SearchCliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Services_loaded,setServices_loaded]=useState([])


  
   //useEffect para los candidatos
   useEffect(() => {
    const fetch_services = async () => {
      try {
        const response = await Services_services.getServices();
        if (!response) {
          return console.log("No se obtuvieron los servicios");
        }
        setServices_loaded(response); 
      } catch (error) {
        console.error("Error al obtener los candidatos:", error);
      }
    };
    fetch_services(); //Llama a la función
  }, []);


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

  const display_card_services=()=>{
  

  }
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
      <div>
          
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
