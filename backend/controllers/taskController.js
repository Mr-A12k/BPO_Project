const { Task, Client, Employee } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      return res.status(200).json(updatedTask);
    }
    
    res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    
    res.status(404).json({ message: 'Task not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};