const { Employee } = require('../models');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      return res.status(200).json(updatedEmployee);
    }
    
    res.status(404).json({ message: 'Employee not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    
    res.status(404).json({ message: 'Employee not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};