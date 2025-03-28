const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, callController.getAllCalls);
router.get('/:id', verifyToken, callController.getCallById);
router.post('/', verifyToken, callController.createCall);
router.put('/:id', verifyToken, callController.updateCall);
router.delete('/:id', verifyToken, callController.deleteCall);

module.exports = router;