const express = require('express');
const router = express.Router();
const messages_controller = require('../controllers/Messages_controller'); 

// Rutas para mensajes
router.post('/', messages_controller.createMessage);  // Crear mensaje
router.get('/', messages_controller.getAllMessages);  // Obtener todos los mensajes
router.get('/:id', messages_controller.getMessageById);  // Obtener mensaje por ID
router.put('/:id', messages_controller.updateMessage);  // Actualizar mensaje por ID
router.delete('/:id', messages_controller.deleteMessage);  // Eliminar mensaje por ID

module.exports = router;
