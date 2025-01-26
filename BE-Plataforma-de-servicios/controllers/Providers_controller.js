const { Providers } = require('../models'); 

// Crear un nuevo proveedor
const createProvider = async (req, res) => {
  try {
    const { name } = req.body;
    const newProvider = await Providers.create({
      name,
    });
    return res.status(201).json({ provider: newProvider });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el proveedor' });
  }
};

// Obtener todos los proveedores
const getAllProviders = async (req, res) => {
  try {
    const providers = await Providers.findAll();
    return res.status(200).json({ providers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los proveedores' });
  }
};

// Obtener un proveedor por su ID
const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Providers.findByPk(id);
    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    return res.status(200).json({ provider });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el proveedor' });
  }
};

// Actualizar un proveedor por su ID
const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const provider = await Providers.findByPk(id);
    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    provider.name = name || provider.name;

    await provider.save();
    return res.status(200).json({ provider });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el proveedor' });
  }
};

// Eliminar un proveedor por su ID
const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Providers.findByPk(id);
    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    await provider.destroy();
    return res.status(200).json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el proveedor' });
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
};
