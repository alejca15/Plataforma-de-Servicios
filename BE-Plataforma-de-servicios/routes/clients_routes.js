const express = require('express');
const router = express.Router();
const clients_controller = require('../controllers/Clients_controller'); 

// Rutas para clientes
router.post('/', clients_controller.createClient);  // Crear cliente
router.get('/', clients_controller.getAllClients);  // Obtener todos los clientes
router.get('/:id', clients_controller.getClientById);  // Obtener cliente por ID
router.put('/:id', clients_controller.updateClient);  // Actualizar cliente por ID
router.delete('/:id', clients_controller.deleteClient);  // Eliminar cliente por ID

module.exports = router;
