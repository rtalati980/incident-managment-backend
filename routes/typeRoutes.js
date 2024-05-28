const express = require('express');
const typeController = require('../controllers/typeController');

const router = express.Router();

router.post('/types', typeController.create);
router.put('/types/:id', typeController.update);
router.delete('/types/:id', typeController.delete);
router.get('/types', typeController.getAll);
router.get('/types/:id', typeController.getById);

module.exports = router;
