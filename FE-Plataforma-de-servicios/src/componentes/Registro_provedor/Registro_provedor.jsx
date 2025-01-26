import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./prove_login.css"; // Archivo CSS externo
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import User_services from "../../services/User_services";
import Provider_services from "../../services/Provider_services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
  provider_name: yup
    .string("Enter your name")
    .min(3, "Name should be at least 3 characters")
    .required("Name is required"),
});

const Login_provedor = () => {
  const [position, setPosition] = useState(null);

  const no_location_toast = () => toast.error("Selecciona una ubicación");
 const user_added = () => toast.success("Usuario creado");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      provider_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      
      if (!position) {
        no_location_toast();
        return;
      }

      post_user();
      user_added();
      setTimeout(() => {
        navigate("/");
      }, 3000); 
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

  const post_user = async () => {
    try {
      const { provider_name, email, password } = formik.values;

      const new_provider = {
        name: provider_name,
        latitude: position.lat,
        longitude: position.lng,
      };

      const provider_posted = await Provider_services.post_provider(
        new_provider
      );
      if (!provider_posted) {
        console.error("Error al añadir proveedor");
        return;
      }
      const new_user_id = provider_posted.provider.id;
      const new_user = {
        mail: email,
        password: password,
        rol: "Provider",
        client_id: null,
        provider_id: new_user_id,
      };
      const user_posted = await User_services.post_user(new_user);
      if (!user_posted) {
        return console.error(error);
      }
      console.log("Usuarios Posteados", user_posted);
    } catch (error) {
      console.error("Error en post_user:", error);
    }
  };

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
          id="provider_name"
          name="provider_name"
          label="Nombre"
          value={formik.values.provider_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.provider_name && Boolean(formik.errors.provider_name)}
          helperText={formik.touched.provider_name && formik.errors.provider_name}
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
      <ToastContainer />
    </div>
  );
};

export default Login_provedor;