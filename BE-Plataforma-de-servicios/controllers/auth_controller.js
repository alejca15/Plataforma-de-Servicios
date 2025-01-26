const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");

const iniciarSesion = async (req, res) => {
  const { mail_usuario, contra_usuario } = req.body;
  let Table_id = null;
  try {
    // Buscar el usuario por su correo
    const response = await axios.get(`http://localhost:3000/users`);
    const users = response.data.users;

    const user = users.find((user) => user.mail === mail_usuario);

    if (!user) {
      return console.log("El usuario no fue encontrado");
    }

    if (user.rol === "Provider") {
      Table_id = user.provider_id;
    }
    if (user.rol === "Client") {
      Table_id = user.client_id;
    }

    console.log(contra_usuario, user.password);

    const esContrasenaValida = await bcrypt.compare(
      contra_usuario,
      user.password
    );
    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." }); 
    }
    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, Rol: user.rol, Table_id: Table_id },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesion." });
  }
};

module.exports = {
  iniciarSesion,
};
