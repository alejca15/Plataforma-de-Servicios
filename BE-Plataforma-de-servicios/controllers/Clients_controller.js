const { Clients } = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo cliente
const createClient = async (req, res) => {
  try {
    const { name, lastname } = req.body;
    const newClient = await Clients.create({
      name,
      lastname,

    });
    return res.status(201).json({ client: newClient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el cliente' });
  }
};

// Obtener todos los clientes
const getAllClients = async (req, res) => {
  try {
    const clients = await Clients.findAll();
    return res.status(200).json({ clients });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

// Obtener un cliente por su ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.status(200).json({ client });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

// Actualizar un cliente por su ID
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    client.name = name || client.name;
    client.lastname = lastname || client.lastname;

    await client.save();
    return res.status(200).json({ client });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente por su ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await client.destroy();
    return res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
