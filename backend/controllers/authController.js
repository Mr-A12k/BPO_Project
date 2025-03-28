const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');
const config = require('../config/auth.config');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'agent'
    });
    
    res.status(201).json({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const employee = await Employee.findOne({ where: { email } });
    
    if (!employee) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: employee.id, role: employee.role },
      config.secret,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};