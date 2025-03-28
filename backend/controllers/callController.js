const { Call, Client, Employee } = require('../models');

exports.createCall = async (req, res) => {
  try {
    const call = await Call.create(req.body);
    res.status(201).json(call);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCalls = async (req, res) => {
  try {
    const calls = await Call.findAll({
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCallById = async (req, res) => {
  try {
    const call = await Call.findByPk(req.params.id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
      ]
    });
    
    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }
    
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCall = async (req, res) => {
  try {
    const [updated] = await Call.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedCall = await Call.findByPk(req.params.id);
      return res.status(200).json(updatedCall);
    }
    
    res.status(404).json({ message: 'Call not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCall = async (req, res) => {
  try {
    const deleted = await Call.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    
    res.status(404).json({ message: 'Call not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};