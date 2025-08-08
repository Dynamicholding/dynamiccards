const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

/* router.get('/', movementController.getAllMovements); */
/* router.get('/', movementController.getMovementsByPhone); */

router.post('/', movementController.createMovement);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);
router.get('/by-phone/:phone', movementController.getMovementsByPhone);

module.exports = router;
