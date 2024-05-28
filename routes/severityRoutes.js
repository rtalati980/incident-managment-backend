const express = require('express');
const severityController = require('../controllers/severityController');

const router = express.Router();

router.post('/severities', severityController.create);
router.put('/severities/:id', severityController.update);
router.delete('/severities/:id', severityController.delete);
router.get('/severities', severityController.getAll);
router.get('/severities/:id', severityController.getById);

module.exports = router;
