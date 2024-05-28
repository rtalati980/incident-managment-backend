const express = require('express');
const statusController = require('../controllers/statusController');

const router = express.Router();

router.post('/statuses', statusController.create);
router.put('/statuses/:id', statusController.update);
router.delete('/statuses/:id', statusController.delete);
router.get('/statuses', statusController.getAll);
router.get('/statuses/:id', statusController.getById);

module.exports = router;
