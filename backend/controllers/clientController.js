const { Client } = require('../models');

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const [updated] = await Client.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedClient = await Client.findByPk(req.params.id);
      return res.status(200).json(updatedClient);
    }
    
    res.status(404).json({ message: 'Client not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Client.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    
    res.status(404).json({ message: 'Client not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};