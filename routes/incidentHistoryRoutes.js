const express = require('express');
const router = express.Router();
const incidentHistoryController = require('../controllers/incidentHistoryController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all incident history records
router.get('/incident-history', verifyToken, incidentHistoryController.getIncidentHistory);

// Create a new incident history record
router.post('/incident-history', incidentHistoryController.createIncidentHistory);

// Update an existing incident history record
router.put('/incident-history/:historyId', incidentHistoryController.updateIncidentHistory);

// Delete an incident history record
router.delete('/incident-history/:historyId', incidentHistoryController.deleteIncidentHistory);

router.get('/incident-history/:incidentId', incidentHistoryController.getIncidentHistoryByIncidentId);

module.exports = router;
