import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-js-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
  const [position, setPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null); // Guardar la instancia del mapa

   //Obtenemos el valor del Token
  //  const Encrypted_token = sessionStorage.getItem("Token");
  //  const Decoded_token = jwtDecode(Encrypted_token);
  //  const Token_JSON = Decoded_token.payload;
  //  const logged_user_id=Token_JSON.Table_id;
  //  const Rol = Token_JSON.Rol;

  const no_location_toast = () => toast.error("Selecciona una ubicación");
  const success_toast = () => toast.success("Ubicación guardada correctamente");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNombre("");
    setPrecio("");
    setError("");
    setSuccess("");
    setPosition(null);
    if (mapInstance) {
      mapInstance.remove(); 
      setMapInstance(null);
    }
  };

  // Validación y envío de datos al backend
  const handleSubmit = async () => {
    
    
    // Verificar que los campos no estén vacíos
    if (!nombre || !precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Verificar que la ubicación esté seleccionada
    if (!position) {
      no_location_toast();
      return;
    }

    // Validar que el precio sea un número positivo
    if (isNaN(precio) || precio <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }

    try {
      // Realizar la solicitud POST
      const url = "http://localhost:3000/services"; // Asegúrate de que la URL esté correcta
      const response = await axios.post(url, {
        name:nombre,
        price:precio,
        provider_id:logged_user_id  ,
        latitude: position.lat,
        longitude: position.lng,
      });
      console.log(response); // Imprime la respuesta completa del servidor
      // Verificar si la respuesta fue exitosa
      if (response.status === 201 || response.status === 200) {
        setSuccess("Servicio añadido correctamente.");
        success_toast();
        setError("");
        setNombre("");
        setPrecio("");
        setPosition(null); // Reiniciar posición después de enviar
      }
     
    } catch (err) {
      setError("Hubo un error al añadir el servicio.");
    }
  };

  // Inicializar mapa y manejar la ubicación
  useEffect(() => {
    if (open && !mapInstance) {
      setTimeout(() => {
        const map = L.map("map").setView([9.9368, -84.0852], 8);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        let marker;

        // Manejar el evento de hacer clic en el mapa para seleccionar la ubicación
        map.on("click", function (e) {
          const { lat, lng } = e.latlng;
          setPosition({ lat, lng });

          if (marker) {
            marker.setLatLng([lat, lng]);
          } else {
            marker = L.marker([lat, lng]).addTo(map);
          }
        });

        setMapInstance(map); // Guardar la instancia del mapa
      }, 0); // Usar setTimeout para asegurar que el contenedor esté disponible
    }
  }, [open, mapInstance]);

  return (
    <div>
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
          <Typography sx={{ mt: 2 }}>
            Ubicación seleccionada:{" "}
            {position ? `Lat: ${position.lat}, Lng: ${position.lng}` : "Ninguna"}
          </Typography>
          <div
            id="map"
            style={{
              height: "350px",
              width: "100%",
              marginTop: "20px",
            }}
          ></div>
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
      <ToastContainer />
    </div>
  );
};

export default Mostrar_servicio;
