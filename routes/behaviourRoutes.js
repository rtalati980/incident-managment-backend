const express = require('express');
const behaviourController = require('../controllers/behaviourController');

const router = express.Router();

router.post('/behaviours', behaviourController.create);
router.put('/behaviours/:id', behaviourController.update);
router.delete('/behaviours/:id', behaviourController.delete);
router.get('/behaviours', behaviourController.getAll);
router.get('/behaviours/:id', behaviourController.getById);

module.exports = router;
