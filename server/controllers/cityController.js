const models = require('../models');

const addCity = async (req, res) => {
  try {
    const { body } = req;
    await models.City.create(body);
    res.status(201).json({ message: 'City created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating city' });
  }
};

module.exports = {addCity}