import React, { useState } from "react";
import "./search.css";
import Services_services from "../../services/Services_services";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Provider_services from "../../services/Provider_services";
import { TextField } from "@mui/material";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";


const SearchCliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Services_loaded, setServices_loaded] = useState([]);
  const [Providers_loaded, setProviders] = useState([]);
  const [isrequestmodalOpen, setrequestmodalOpen] = useState(false);

  // Validación con Yup
  const validationSchema = yup.object({
    price: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  // Hook useFormik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  //useEffect para los candidatos
  useEffect(() => {
    const fetch_services = async () => {
      try {
        const response = await Services_services.getServices();
        const provider_response = await Provider_services.get_providers();
        if (!response) {
          return console.log("No se obtuvieron los servicios");
        }
        if (!provider_response) {
          return console.log("No se obtuvieron los proovedores");
        }
        setServices_loaded(response);
        setProviders(provider_response);
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

  const open_request_modal = () => {
    setrequestmodalOpen(true);
  };
  const close_request_modal = () => {
    setrequestmodalOpen(false);
  };

  const display_card_services = () => {
    return Services_loaded.map((service) => (
      <div key={service.id} className="service-card">
        <h3>{service.name}</h3>
        <p>Precio: ${service.price}</p>
        <p>Proveedor: {service.provider_id}</p>
        <Button onClick={open_request_modal} variant="contained">
          Solicitar
        </Button>
      </div>
    ));
  };

  return (
    <div className="contenedorSearch">
      <div className="textos">
        <h1>Encuentra el profesional perfecto para ti</h1>
        <p>Obtenga cotizaciones gratuitas en minutos</p>
      </div>
      <div className="inputs">
        <input type="text" placeholder="¿Qué servicio estás buscando?" />
        <input type="text" placeholder="ubicación" onFocus={handleInputFocus} />
        <button>Search</button>
      </div>
      <div>{display_card_services()}</div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-content"></div>
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button className="exit-button" onClick={closeModal}>
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
      {isrequestmodalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-content">
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Precio"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-button">
                Solicitar
              </button>
              <button onClick={close_request_modal} className="exit-button" >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCliente;
