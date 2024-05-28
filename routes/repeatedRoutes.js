const express = require('express');
const repeatedController = require('../controllers/repeatedController');

const router = express.Router();

router.post('/repeateds', repeatedController.create);
router.put('/repeateds/:id', repeatedController.update);
router.delete('/repeateds/:id', repeatedController.delete);
router.get('/repeateds', repeatedController.getAll);
router.get('/repeateds/:id', repeatedController.getById);

module.exports = router;
