import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Proveedor_Pagina = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Redirigir según el índice del Tab
    if (newValue === 0) {
      navigate("/servicios"); // Ruta para "Servicios"
    } else if (newValue === 1) {
      navigate("/solicitudes"); // Ruta para "Solicitudes"
    } else if (newValue === 2) {
      navigate("/contratos"); // Ruta para "Contratos"
    } else if (newValue === 3) {
      navigate("/usuario"); // Ruta para "Usuario"
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: "100vh",
        bgcolor: "background.paper",
      }}
    >
      {/* Tabs verticales */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", minWidth: 150 }}
      >
        <Tab label="Servicios" {...a11yProps(0)} />
        <Tab label="Solicitudes" {...a11yProps(1)} />
        <Tab label="Contratos" {...a11yProps(2)} />
        <Tab label="Usuario" {...a11yProps(3)} />
      </Tabs>

      {/* Contenido de cada Tab */}
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Servicios</Typography>
        <p>Gestión de servicios ofrecidos por la plataforma.</p>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6">Solicitudes</Typography>
        <p>Gestión de solicitudes pendientes.</p>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6">Contratos</Typography>
        <p>Administración de contratos firmados.</p>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h6">Usuario</Typography>
        <p>Configuración y detalles del usuario.</p>
      </TabPanel>
    </Box>
  );
};

export default Proveedor_Pagina;
