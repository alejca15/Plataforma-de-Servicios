const { Users } = require("../models");

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { mail, password, rol, provider_id, client_id } = req.body;
    const newUser = await Users.create({
      mail,
      password,
      rol,
      provider_id,
      client_id,
    });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};


// Actualizar un usuario por su ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { mail, password, rol, provider_id, client_id } = req.body;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    user.mail = mail || user.mail;
    user.password = password || user.password;
    user.rol = rol || user.rol;
    user.provider_id = provider_id || user.provider_id;
    user.client_id = client_id || user.client_id;

    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};


// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
