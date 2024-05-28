const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const incidentController = require('../controllers/incidentController');

router.post('/', verifyToken, incidentController.createIncident);
router.get('/', verifyToken, incidentController.getIncidents);
router.get('/:id', verifyToken, incidentController.getIncident);
router.put('/:id', verifyToken, isAdmin, incidentController.updateIncident);
router.delete('/:id', verifyToken, isAdmin, incidentController.deleteIncident);
router.get('/id/getuser/', verifyToken, incidentController.getUserIncidents);
router.get('/No/:No',verifyToken,incidentController.getIncedentByNo);

module.exports = router;
