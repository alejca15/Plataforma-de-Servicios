const express = require('express');
const router = express.Router();
const contracts_controller = require('../controllers/Contracts_by_provider'); 

// Rutas para contratos
router.post('/', contracts_controller.createContract);  // Crear contrato
router.get('/', contracts_controller.getAllContracts);  // Obtener todos los contratos
router.get('/:id', contracts_controller.getContractById);  // Obtener contrato por ID
router.put('/:id', contracts_controller.updateContract);  // Actualizar contrato por ID
router.delete('/:id', contracts_controller.deleteContract);  // Eliminar contrato por ID

module.exports = router;
