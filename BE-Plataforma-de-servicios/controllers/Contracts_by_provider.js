const { Contracs_by_provider } = require('../models');

// Crear un nuevo contrato
const createContract = async (req, res) => {
  try {
    const { provider_id, client_id, request_id, initial_date, final_date } = req.body;
    const newContract = await Contracs_by_provider.create({
      provider_id,
      client_id,
      request_id,
      initial_date,
      final_date
    });
    return res.status(201).json(newContract);
  } catch (error) {
    console.error("Error al crear el contrato:", error);
    return res.status(500).json({ message: 'Error al crear el contrato', error });
  }
};

// Obtener todos los contratos
const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contracs_by_provider.findAll({
      include: [
        {
          model: sequelize.models.Providers,
          attributes: ['id', 'name']
        },
        {
          model: sequelize.models.Clients,
          attributes: ['id', 'name']
        }
      ]
    });
    return res.status(200).json(contracts);
  } catch (error) {
    console.error("Error al obtener los contratos:", error);
    return res.status(500).json({ message: 'Error al obtener los contratos', error });
  }
};

// Obtener un contrato por ID
const getContractById = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contracs_by_provider.findByPk(id, {
      include: [
        {
          model: sequelize.models.Providers,
          attributes: ['id', 'name']
        },
        {
          model: sequelize.models.Clients,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }
    return res.status(200).json(contract);
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    return res.status(500).json({ message: 'Error al obtener el contrato', error });
  }
};

// Actualizar un contrato por ID
const updateContract = async (req, res) => {
  const { id } = req.params;
  const { provider_id, client_id, request_id, initial_date, final_date } = req.body;

  try {
    const contract = await Contracs_by_provider.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }

    contract.provider_id = provider_id || contract.provider_id;
    contract.client_id = client_id || contract.client_id;
    contract.request_id = request_id || contract.request_id;
    contract.initial_date = initial_date || contract.initial_date;
    contract.final_date = final_date || contract.final_date;

    await contract.save();
    return res.status(200).json(contract);
  } catch (error) {
    console.error("Error al actualizar el contrato:", error);
    return res.status(500).json({ message: 'Error al actualizar el contrato', error });
  }
};

// Eliminar un contrato por ID
const deleteContract = async (req, res) => {
  const { id } = req.params;

  try {
    const contract = await Contracs_by_provider.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }

    await contract.destroy();
    return res.status(200).json({ message: 'Contrato eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el contrato:", error);
    return res.status(500).json({ message: 'Error al eliminar el contrato', error });
  }
};

module.exports = {
  createContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract
};
