const express = require("express");
const { sequelize } = require("./models"); // Importa la conexión a la base de datos
const users_routes = require("./routes/users_routes");
const providers_routes = require("./routes/providers_routes");
const clients_routes = require("./routes/clients_routes");
const services_routes = require("./routes/services_routes");
const messages_routes = require("./routes/messages_routes");
const requests_routes=require("./routes/requests_routes");
const contracts_routes=require("./routes/contracts_routes");
const auth_routes=require("./routes/auth_routes")

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

app.use(cors({
  origin: 'http://localhost:5173/',  // Reemplaza con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Los métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization']  // Los encabezados permitidos
}));

// Probar la conexión con la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conexión a la base de datos exitosa."))
  .catch((error) =>
    console.error("No se pudo conectar a la base de datos:", error)
  );

// Usar las rutas
app.use("/users", users_routes);
app.use("/providers", providers_routes);
app.use("/clients", clients_routes);
app.use("/services", services_routes);
app.use("/messages", messages_routes);
app.use("/requests", requests_routes);
app.use("/contracts", contracts_routes);
app.use("/auth", auth_routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
