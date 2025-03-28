const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, clientController.getAllClients);
router.get('/:id', verifyToken, clientController.getClientById);
router.post('/', verifyToken, isAdmin, clientController.createClient);
router.put('/:id', verifyToken, isAdmin, clientController.updateClient);
router.delete('/:id', verifyToken, isAdmin, clientController.deleteClient);

module.exports = router;