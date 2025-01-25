const express = require('express');
const router = express.Router();
const requests_controller = require('../controllers/Requests_controller'); // Ajusta la ruta

router.post('/', requests_controller.createRequest);
router.get('/', requests_controller.getAllRequests);
router.get('/:id', requests_controller.getRequestById);
router.put('/:id', requests_controller.updateRequest);
router.delete('/:id', requests_controller.deleteRequest);

module.exports = router;