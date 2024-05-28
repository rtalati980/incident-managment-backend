const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', categoryController.create);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);
router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);

module.exports = router;
