const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, isAdmin, payrollController.getAllPayrolls);
router.get('/:id', verifyToken, isAdmin, payrollController.getPayrollById);
router.post('/', verifyToken, isAdmin, payrollController.createPayroll);
router.put('/:id', verifyToken, isAdmin, payrollController.updatePayroll);
router.delete('/:id', verifyToken, isAdmin, payrollController.deletePayroll);

module.exports = router;