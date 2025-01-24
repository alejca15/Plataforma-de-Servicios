const express = require('express');
const { sequelize } = require("./models"); // Importa la conexión a la base de datos
const users_routes=require("./routes/users_routes")
const providers_routes=require("./routes/providers_routes")
const clients_routes=require("./routes/clients_routes")



const cors=require('cors')

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

app.use(cors());


// Probar la conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));



// Usar las rutas
app.use('/users', users_routes);
app.use('/providers', providers_routes);
app.use('/clients', clients_routes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});