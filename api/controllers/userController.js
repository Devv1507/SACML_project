// importing the service class created to get connection to model layer in a indirect way
const UserServices = require('../services/userServices.js');
const service = new UserServices();

// function to get all users
const getAllUsers = async (req, res) => {
  try {
    const response = await service.getAllUsers();
    if (response) {
      res.json({ success: true, message: response });
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to get a particular user by id
const getOneUserById = async (req, res) => {
  try {
    const { id } = req.params; // may consider parseInt
    const response = await service.getUserById(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to add an user / sign up
const addOneUser = async (req, res) => {
  const { body } = req;
  console.log(body);
  if (
    !body.name ||
    !body.surname ||
    !body.id ||
    !body.address ||
    //!body.city ||
    //!body.department ||
    !body.email
    //!body.phone
  ) {
    return res.status(400).send('One of the fields is missing in the data');
  }
  try {
    await service.addNewUser(body);
    res.json({ success: true, message: 'User added succesfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to update a particular user by id
const updateOneUserById = async (req, res) => {
  try {
    const { id } = req.params; // may consider parseInt
    const { body } = req;
    const response = await service.updateUserById(id, body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to delete a particular user by id
const deleteOneUserById = async (req, res) => {
  try {
    const { id } = req.params; // may consider parseInt
    const response = await service.deleteUserById(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = {
  getAllUsers,
  getOneUserById,
  addOneUser,
  updateOneUserById,
  deleteOneUserById
};

