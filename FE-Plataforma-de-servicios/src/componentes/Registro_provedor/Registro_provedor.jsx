import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./prove_login.css"; // Archivo CSS externo
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

// Validaciones con Yup
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  name: yup
    .string("Enter your name")
    .min(3, "Name should be at least 3 characters")
    .required("Name is required"),
  location: yup
    .string("Enter your location")
    .min(3, "Location should be at least 3 characters")
    .required("Location is required"),
});

const Login_provedor = () => {
   const [position, setPosition] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  
    //Mapa de Leaflet
    React.useEffect(() => {
      
      //Mapa por defecto
      const map = L.map("map").setView([9.9368, -84.0852], 8);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
  
      //Marcador 
      let marker;
  
      // Capturar el Click
      map.on("click", function (e) {
        const { lat, lng } = e.latlng; // Obtener latitud y longitud
        setPosition({ lat, lng }); // Guardar en el estado
  
        // Añadir o mover el marcador al hacer clic
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = L.marker([lat, lng]).addTo(map);
        }
      });
  
      // Cleanup del mapa
      return () => {
        map.remove();
      };
    }, []);
  
  
    //Funcion que despliega el mapa
    function Display_map() {
  
      return (
        <div>
          <h4 id="map_tittle">Selecciona tu ubicación</h4>
          <div
            id="map"
            style={{
              height: "350px",
              width: "100%",
              marginBottom: "20px",
            }}
          ></div>
        </div>
      );
    }

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit} className="login-form">
        <h2 className="form-title">Registro </h2>

        {/* Campo de Correo */}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Correo"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />

        {/* Campo de Contraseña */}
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />

        {/* Campo de Nombre */}
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />

        {/* Botón de Enviar */}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Enviar
        </Button>
      </form>
      <div className="map_container">{Display_map()}</div>
    </div>
  );
};

export default Login_provedor;
