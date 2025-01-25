const express = require('express');
const router = express.Router();
const contracts_controller = require('../controllers/Contracts_by_provider'); 

// Rutas para contratos
router.post('/', contracts_controller.createMessage);  // Crear contrato
router.get('/', contracts_controller.getAllMessages);  // Obtener todos los contratos
router.get('/:id', contracts_controller.getMessageById);  // Obtener contrato por ID
router.put('/:id', contracts_controller.updateMessage);  // Actualizar contrato por ID
router.delete('/:id', contracts_controller.deleteMessage);  // Eliminar contrato por ID

module.exports = router;
