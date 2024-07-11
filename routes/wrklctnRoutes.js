const express = require('express');
const wrklctnController = require('../controllers/wrklctController');

const router = express.Router();

router.post('/wrklctns', wrklctnController.create);
router.put('/wrklctns/:id', wrklctnController.update);
router.delete('/wrklctns/:id', wrklctnController.delete);
router.get('/wrklctns', wrklctnController.getAll);
router.get('/wrklctns/:id', wrklctnController.getById);
router.get('/wrklctn/name/:name',wrklctnController.getByName);

module.exports = router;
