const express = require('express');
const router = express.Router();
const bayTypeController = require('../controllers/bayTypeController');

router.post('/baytypes', bayTypeController.create);
router.get('/baytypes', bayTypeController.getAll);

module.exports = router;
