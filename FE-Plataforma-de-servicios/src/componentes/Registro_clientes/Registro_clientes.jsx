import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./clientes_registro.css";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Client_services from "../../services/Client_services";
import User_services from "../../services/User_services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "@mui/material";

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

const   Registro_clientes = () => {
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
      create_client();
      user_added();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
  });

  const create_client = async () => {
     
    try {
      const { client_name, lastname, email, password } = formik.values;

      const new_client = {
        name: client_name,
        lastname,
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
    <Container className="form-container">
      <form onSubmit={formik.handleSubmit} 
      className="user-form"
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
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
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
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            marginTop: "20px",
            backgroundColor: "#3F5543",
            color: "white",
            "&:hover": {
              backgroundColor: "#C1DFC7", 
            },
          }}          
        >
          Registrar
        </Button>
        <ToastContainer/>
      </form>
    </Container>
  );
};

export default Registro_clientes;
