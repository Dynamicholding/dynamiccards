const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

router.get('/:id/movements', accountController.getAccountMovements);
router.get('/by-user/:userId', accountController.getByUserId);

router.get('/getAccountByPhone/:phone', accountController.getAccountByPhone);
/* router.get('/movements/by-phone/:phone', accountController.getMovementsByPhone); */



module.exports = router;
