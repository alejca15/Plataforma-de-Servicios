import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";

const ListaContratos = () => {
  // Datos ficticios para los contratos
  const sampleContracts = [
    { id: 1, title: "Limpieza de Casa", details: "Servicio de limpieza profunda, duración: 4 horas, costo: $80" },
    { id: 2, title: "Servicio de Mecánica", details: "Revisión y reparación de frenos, duración: 2 horas, costo: $120" },
    { id: 3, title: "Reparación de Celulares", details: "Cambio de pantalla, modelo: iPhone 12, costo: $150" },
    { id: 4, title: "Instalación de Aire Acondicionado", details: "Capacidad: 18,000 BTU, duración: 5 horas, costo: $250" },
    { id: 5, title: "Asesoría Financiera", details: "Análisis de inversiones, duración: 1 hora, costo: $100" },
  ];

  return (
    <Grid container sx={{ minHeight: "100vh", width: "50%" }}>
      {/* Sidebar */}
      <Grid 
        item 
        xs={12} 
        sm={4} 
        md={3} 
        sx={{ 
          backgroundColor: "#BFCCC2", 
          p: 3, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "flex-start", 
          gap: 2, 
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
        >
          Sidebar
        </Typography>
        {["Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5"].map((option, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            {option}
          </Typography>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid 
        item 
        xs={12} 
        sm={8} 
        md={9} 
        sx={{ p: 4 }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 2 
          }}
        >
          {/* Título */}
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
          >
            Lista de Contratos
          </Typography>

          {/* Listado de casillas */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 2, 
              width: "100%", 
              alignItems: "center"
            }}
          >
            {sampleContracts.map((contract) => (
              <Card 
                key={contract.id} 
                sx={{ 
                  width: "100%", 
                  maxWidth: 400, 
                  p: 2, 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 1 
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ fontWeight: "bold" }}
                  >
                    {contract.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    {contract.details}
                  </Typography>
                </CardContent>
                <Button 
                  variant="contained" 
                  sx={{ alignSelf: "flex-end", backgroundColor: "#3F5543" }}
                >
                  Rechazar
                </Button>
              </Card>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ListaContratos;
