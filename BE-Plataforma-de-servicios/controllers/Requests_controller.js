const { Requests } = require('../models');

// Crear una nueva solicitud
const createRequest = async (req, res) => {
  try {
    const { service_id, price, initial_date, final_date, state } = req.body;
    const newRequest = await Requests.create({
      service_id,
      price,
      initial_date,
      final_date,
      state
    });
    return res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    return res.status(500).json({ message: 'Error al crear la solicitud', error });
  }
};

// Obtener todas las solicitudes
const getAllRequests = async (req, res) => {
  try {
    const requests = await Requests.findAll({
      include: [
        {
          model: sequelize.models.Services,
          attributes: ['id', 'name']
        }
      ]
    });
    return res.status(200).json(requests);
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);
    return res.status(500).json({ message: 'Error al obtener las solicitudes', error });
  }
};

// Obtener una solicitud por ID
const getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Requests.findByPk(id, {
      include: [
        {
          model: sequelize.models.Services,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    return res.status(200).json(request);
  } catch (error) {
    console.error("Error al obtener la solicitud:", error);
    return res.status(500).json({ message: 'Error al obtener la solicitud', error });
  }
};

// Actualizar una solicitud por ID
const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { service_id, price, initial_date, final_date, state } = req.body;

  try {
    const request = await Requests.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    request.service_id = service_id || request.service_id;
    request.price = price || request.price;
    request.initial_date = initial_date || request.initial_date;
    request.final_date = final_date || request.final_date;
    request.state = state || request.state;

    await request.save();
    return res.status(200).json(request);
  } catch (error) {
    console.error("Error al actualizar la solicitud:", error);
    return res.status(500).json({ message: 'Error al actualizar la solicitud', error });
  }
};

// Eliminar una solicitud por ID
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Requests.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    await request.destroy();
    return res.status(200).json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    console.error("Error al eliminar la solicitud:", error);
    return res.status(500).json({ message: 'Error al eliminar la solicitud', error });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest
};
