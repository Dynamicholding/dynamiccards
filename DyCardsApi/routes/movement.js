const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);
router.get('/by-phone/:phone', movementController.getMovementsByPhone);

router.post('/credit', movementController.movementCredit);
router.post('/debit', movementController.movementDebit);



module.exports = router;
