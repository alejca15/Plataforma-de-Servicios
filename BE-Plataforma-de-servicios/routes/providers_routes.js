const express = require('express');
const router = express.Router();
const provider_controller = require('../controllers/Providers_controller'); // Ajusta la ruta

router.post('/', provider_controller.createProvider);
router.get('/', provider_controller.getAllProviders);
router.get('/:id', provider_controller.getProviderById);
router.put('/:id', provider_controller.updateProvider);
router.delete('/:id', provider_controller.deleteProvider);

module.exports = router;