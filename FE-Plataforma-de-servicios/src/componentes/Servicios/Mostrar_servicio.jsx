import React, { useState } from "react";
import Proveedor_Pagina from "../Pagina_Proveedor/Proveedor_Pagina";

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Mostrar_servicio = () => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setPrecio("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    if (!nombre || !precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(precio) || precio <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }

    try {
      // Reemplaza esta URL con la URL de tu API
      const url = "http://localhost:3000/services";
      const response = await axios.post(url, { nombre, precio });

      if (response.status === 201 || response.status === 200) {
        setSuccess("Servicio añadido correctamente.");
        setError("");
        setNombre("");
        setPrecio("");
      }
    } catch (err) {
      setError("Hubo un error al añadir el servicio.");
    }
  };

  return (
    <div>
      {/* Título y botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >     
        <Typography variant="h4">Servicios</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Añadir Servicio
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Añadir Nuevo Servicio
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            margin="normal"
            type="number"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>

    </div>
  );
};

export default Mostrar_servicio;
