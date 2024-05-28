const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { route } = require('./incidentRoutes');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');


router.post('/register',  verifyToken,isAdmin,authController.register);
router.post('/login', authController.login);
router.get('/:id' , authController.userById);
router.get('/',authController.getAllUser );

module.exports = router;
