import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./clientes_registro.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Client_services from "../../services/Client_services";
import User_services from "../../services/User_services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string("Ingrese su correo")
    .email("Ingrese un correo válido")
    .required("Correo requerido"),
  password: yup
    .string("Ingrese su contraseña")
    .min(8, "La contraseña debe ser de 8 cáracteres como mínimo")
    .required("La contraseña es requerida"),
  client_name: yup
    .string("Ingrese su nombre")
    .required("El nombre es requerido"),

  lastname: yup
    .string("Ingrese su Apellido")
    .required("El apellido no ha sido ingresado"),
});

const Registro_clientes = () => {
  const [position, setPosition] = useState(null);

  const no_location_toast = () => toast.error("Selecciona una ubicación");
  const user_added = () => toast.success("Usuario creado");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      client_name: "",
      lastname: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Entre");

      if (!position) {
        no_location_toast();
        return;
      }
      create_client();
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
  const create_client = async () => {
    if (!position) {
      no_location_toast();
      return;
    }

    try {
      const { client_name, lastname, email, password } = formik.values;

      const new_client = {
        name: client_name,
        lastname,
        latitude: position.lat,
        longitude: position.lng,
      };

      const client_created = await Client_services.post_client(new_client);
      if (!client_created) {
        console.error("Error al añadir cliente");
        return;
      }

      const new_user = {
        mail: email,
        password,
        rol: "Client",
        client_id: client_created.client.id,
        provider_id: null,
      };

      const user_posted = await User_services.post_user(new_user);
      if (!user_posted) {
        console.error("Error al crear usuario");
        return;
      }

      console.log("Usuarios Posteados", user_posted);
    } catch (error) {
      console.error("Error en la creación del cliente o usuario:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className="user-form">
        <h2 className="form-title">Registro</h2>

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

        <TextField
          fullWidth
          id="client_name"
          name="client_name"
          label="Nombre"
          value={formik.values.client_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.client_name && Boolean(formik.errors.client_name)
          }
          helperText={formik.touched.client_name && formik.errors.client_name}
          margin="normal"
        />

        <TextField
          fullWidth
          id="lastname"
          name="lastname"
          label="Apellido"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
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
          Registrar
        </Button>
      </form>
      <div className="map_container">{Display_map()}</div>
      <ToastContainer />
    </div>
  );
};

export default Registro_clientes;
