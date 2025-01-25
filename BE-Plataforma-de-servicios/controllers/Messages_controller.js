const { Messages } = require('../models');

// Crear un nuevo mensaje
const createMessage = async (req, res) => {
  try {
    const { message, date, provider_id, client_id } = req.body;
    const newMessage = await Messages.create({
      message,
      date,
      provider_id,
      client_id
    });
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    return res.status(500).json({ message: 'Error al crear el mensaje', error });
  }
};

// Obtener todos los mensajes
const getAllMessages = async (req, res) => {
  try {
    const messages = await Messages.findAll({
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
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    return res.status(500).json({ message: 'Error al obtener los mensajes', error });
  }
};

// Obtener un mensaje por ID
const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Messages.findByPk(id, {
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

    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error al obtener el mensaje:", error);
    return res.status(500).json({ message: 'Error al obtener el mensaje', error });
  }
};

// Actualizar un mensaje por ID
const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { message, date, provider_id, client_id } = req.body;

  try {
    const msg = await Messages.findByPk(id);
    if (!msg) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    msg.message = message || msg.message;
    msg.date = date || msg.date;
    msg.provider_id = provider_id || msg.provider_id;
    msg.client_id = client_id || msg.client_id;

    await msg.save();
    return res.status(200).json(msg);
  } catch (error) {
    console.error("Error al actualizar el mensaje:", error);
    return res.status(500).json({ message: 'Error al actualizar el mensaje', error });
  }
};

// Eliminar un mensaje por ID
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const msg = await Messages.findByPk(id);
    if (!msg) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    await msg.destroy();
    return res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
    return res.status(500).json({ message: 'Error al eliminar el mensaje', error });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};
