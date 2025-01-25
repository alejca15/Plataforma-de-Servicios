const express = require('express');
const router = express.Router();
const services_controller = require('../controllers/Services_controller');

router.post('/', services_controller.createService);
router.get('/', services_controller.getAllServices);
router.get('/:id', services_controller.getServiceById);
router.put('/:id', services_controller.updateService);
router.delete('/:id', services_controller.deleteService);

module.exports = router;