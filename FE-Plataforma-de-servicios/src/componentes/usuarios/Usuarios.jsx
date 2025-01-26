import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";

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

const Usuarios = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      navigate("/servicios");
    } else if (newValue === 1) {
      navigate("/Solicitudes");
    } else if (newValue === 2) {
      navigate("/contratos");
    } else if (newValue === 3) {
      navigate("/usuarios");
    }
  };

  const usuarios = [
    { email: "user1@example.com", rol: "Cliente", img: "https://via.placeholder.com/150" },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: "100vh",
        bgcolor: "background.paper",
      }}
    >
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

      <TabPanel value={value} index={3}>
        <div className="container">
          <h4 className="center-align" style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>Usuarios</h4>
          <div className="row">
            {usuarios.map((usuario, index) => (
              <div className="col s12 m6 l4" key={index}>
                <div className="card" style={{ borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
                  <div style={{ backgroundColor: "#f5f5f5", padding: "20px 0", display: "flex", justifyContent: "center" }}>
                    <img
                      src={usuario.img}
                      alt="Profile"
                      className="circle responsive-img"
                      style={{ width: "120px", height: "120px", border: "5px solid white" }}
                    />
                  </div>
                  <div className="card-content center-align" style={{ padding: "20px" }}>
                    <span className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>Usuario</span>
                    <p style={{ margin: "10px 0", fontSize: "16px" }}><strong>Email:</strong> {usuario.email}</p>
                    <p style={{ margin: "10px 0", fontSize: "16px" }}><strong>Rol:</strong> {usuario.rol}</p>
                  </div>
                  <div className="card-action" style={{ textAlign: "center", padding: "15px" }}>
                    <a href="#" style={{ color: "#1976d2", fontWeight: "bold" }}>Ver Perfil</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};

export default Usuarios;
