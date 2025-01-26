import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./login.css";
import post_login from "../../services/auth_services";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-js-decode";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login_form = () => {
  const navigate=useNavigate();
 const not_logged = () => toast.error("Credenciales inválidas");

  const formik = useFormik({
    initialValues: {
      email: "example@example.com",
      password: "example",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     login();
    },
  });

  const login = async () => {

    const { email, password } = formik.values;
    const credentials = { mail_usuario: email, contra_usuario: password };

    const encrypted_token_JSON = await post_login(credentials);
    if (encrypted_token_JSON && encrypted_token_JSON.token) {
      const token = encrypted_token_JSON.token;
      sessionStorage.setItem("Token", token);
      const Decoded_token = jwtDecode(token);
      const Token_JSON = Decoded_token.payload;
      const Rol = Token_JSON.Rol;

      if (Rol==="Provider") {
        navigate("/pageprove")
      }
      if (Rol==="Client") {
        navigate("/homecliente")
      }
    }
    else not_logged()
    
  };

  return (
    <Container
      className="login-container">

        
        <form
          onSubmit={formik.handleSubmit}
          className="login-form"
          style={{backgroundColor: "#BFCCC2",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",}}
        >
        <h2 className="form-title"
            style={{
              color: "white",
              fontSize: "2.5rem", // Makes the title bigger
              fontWeight: "bold",
              fontFamily:"sans-serif"
            }}>
          Login
        </h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
                  }
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-around"
                textAlign="center"
              >
                <Link to="/provedores" className="link">
                  Registrarse como Provedor
                </Link>
                <Link to="/clientes" className="link">
                  Registrarse como Cliente
                </Link>
              </Box>
            </Grid>
          </Grid>
        </form>
      <ToastContainer/>
    </Container>
  );
};

export default Login_form;
