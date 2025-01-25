const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/Users_controller'); // Ajusta la ruta

router.post('/', user_controller.createUser);
router.get('/', user_controller.getAllUsers);
router.get('/:id', user_controller.getUserById);
router.put('/:id', user_controller.updateUser);
router.delete('/:id', user_controller.deleteUser);

module.exports = router;