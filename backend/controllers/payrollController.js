const { Payroll, Employee } = require('../models');

exports.createPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.findAll({
      include: [
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findByPk(req.params.id, {
      include: [
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    
    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePayroll = async (req, res) => {
  try {
    const [updated] = await Payroll.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedPayroll = await Payroll.findByPk(req.params.id);
      return res.status(200).json(updatedPayroll);
    }
    
    res.status(404).json({ message: 'Payroll not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const deleted = await Payroll.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    
    res.status(404).json({ message: 'Payroll not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};