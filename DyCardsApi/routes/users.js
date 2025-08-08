const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authenticateJWT = require('../middlewares/authenticateJWT');

router.get('/', userController.getAll);
router.post('/', authenticateJWT, userController.create);

router.get('/:id', authenticateJWT, userController.getById);
router.put('/:id', authenticateJWT, userController.update);
router.delete('/:id', authenticateJWT, userController.remove);

module.exports = router;
