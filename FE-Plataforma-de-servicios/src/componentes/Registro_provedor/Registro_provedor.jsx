import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import './prove_login.css'; // Archivo CSS externo

// Validaciones con Yup
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be at least 3 characters')
    .required('Name is required'),
  location: yup
    .string('Enter your location')
    .min(3, 'Location should be at least 3 characters')
    .required('Location is required'),
});

const Login_provedor = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '20px' }}>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Login_provedor;
