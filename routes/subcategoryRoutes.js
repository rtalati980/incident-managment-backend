const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');

const router = express.Router();

router.post('/subcategories', subcategoryController.create);
router.put('/subcategories/:id', subcategoryController.update);
router.delete('/subcategories/:id', subcategoryController.delete);
router.get('/subcategories', subcategoryController.getAll);
router.get('/subcategories/:id', subcategoryController.getById);

module.exports = router;
