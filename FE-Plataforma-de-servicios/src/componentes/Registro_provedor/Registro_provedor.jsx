import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import User_services from "../../services/User_services";
import Provider_services from "../../services/Provider_services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container, Typography } from "@mui/material";

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

const Registro_provedor = () => {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      provider_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post_user();
      return navigate("/")
    },
  });

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
    <Container className="login-container">
      <form
        onSubmit={formik.handleSubmit}
        className="login-form"
        style={{
          backgroundColor: "#BFCCC2",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="form-title"
        style={{
          color: "white",
          fontSize: "2.5rem", // Makes the title bigger
          fontWeight: "bold",
          fontFamily:"sans-serif"
        }}>
          Registro 
        </h2>

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
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
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
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />

        {/* Campo de Nombre */}
        <TextField
          fullWidth
          id="provider_name"
          name="provider_name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
          margin="normal"
        />

        {/* Botón de Enviar */}
        <Button
          
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            marginTop: "20px",
            backgroundColor: "#3F5543",
            color: "white",
            "&:hover": {
              backgroundColor: "#98cba2", 
            },
          }}
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
};


export default Registro_provedor;

