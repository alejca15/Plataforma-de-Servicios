import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import Provider_services from "../../services/Provider_services";
import User_services from "../../services/User_services";

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
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      provider_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!position) {
        toast.error("Selecciona una ubicación");
        return;
      }

      try {
        const { provider_name, email, password } = values;
        const new_provider = {
          name: provider_name,
          latitude: position.lat,
          longitude: position.lng,
        };

        const provider_posted = await Provider_services.post_provider(
          new_provider
        );
        if (!provider_posted) throw new Error("Error al añadir proveedor");

        const new_user_id = provider_posted.provider.id;
        const new_user = {
          mail: email,
          password: password,
          rol: "Proveedor",
          client_id: null,
          provider_id: new_user_id,
        };

        await User_services.post_user(new_user);
        toast.success("Usuario creado");
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al registrar el usuario");
      }
    },
  });

  useEffect(() => {
    const map = L.map("map").setView([9.9368, -84.0852], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    let marker;
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    });

    return () => map.remove();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#ffffff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
          bgcolor: "#777777",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginBottom: 4,
            color: "#ffffff",
          }}
        >
          Registro Proveedor
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="provider_name"
                name="provider_name"
                label="Nombre"
                value={formik.values.provider_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.provider_name &&
                  Boolean(formik.errors.provider_name)
                }
                helperText={
                  formik.touched.provider_name && formik.errors.provider_name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#333333",
                  "&:hover": {
                    backgroundColor: "#111111",
                  },
                }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box
          id="map"
          sx={{
            height: "350px",
            width: "100%",
            marginTop: 2,
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        />
        <ToastContainer />
      </Box>
    </Container>
  );
};

export default Registro_provedor;
