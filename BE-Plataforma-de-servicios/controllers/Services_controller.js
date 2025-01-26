const { Services } = require("../models");

// Crear un nuevo servicio
const createService = async (req, res) => {
  try {
    const { name, price, provider_id, latitude, longitude } = req.body;
    const newService = await Services.create({
      name,
      price,
      provider_id,
      latitude,
      longitude,
    });
    return res.status(201).json(newService);
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return res
      .status(500)
      .json({ message: "Error al crear el servicio", error });
  }
};

// Obtener todos los servicios
const getAllServices = async (req, res) => {
  try {
    const services = await Services.findAll();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los servicios", error });
  }
};

// Obtener un servicio por ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Services.findByPk(id, {
      include: [
        {
          model: sequelize.models.Providers,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener el servicio", error });
  }
};

// Actualizar un servicio por ID
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, price, provider_id, latitude, longitude } = req.body;

  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    service.name = name || service.name;
    service.price = price || service.price;
    service.provider_id = provider_id || service.provider_id;
    service.latitude = latitude || service.latitude;
    service.longitude=longitude||service.longitude;

    await service.save();
    return res.status(200).json(service);
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el servicio", error });
  }
};

// Eliminar un servicio por ID
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    await service.destroy();
    return res
      .status(200)
      .json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el servicio", error });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
