import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Tab label="Solicitutes" {...a11yProps(1)} />
        <Tab label="Contratos" {...a11yProps(2)} />
        <Tab label="Usuario" {...a11yProps(3)} />
      </Tabs>

      {/* Contenido de cada Tab */}
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Servicios</Typography>
        <p>Gestión de servicios ofrecidos por la plataforma.</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">Solicitutes</Typography>
        <p>Listado y gestión de Solicitutes.</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">Contratos</Typography>
        <p>Administración de contratos firmados.</p>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h6">Usuario</Typography>
        <p>Gestión de usuarios registrados.</p>
      </TabPanel>
    </Box>
  );
};

export default Proveedor_Pagina;
