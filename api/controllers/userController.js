// importing the service class created to get connection to model layer in a indirect way
const UserServices = require('../services/userServices.js');
const service = new UserServices();
const models = require('../models');

// function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await service.getAllUsers();
    if (!users) {
      return res.status(400).json('User not found');
    } 
    res.render('users/all-users', {users});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to get a particular user by id
const getOneUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.getUserById(id);
    if (!user){
      res.status(400).json('User not found');
    }
    res.render('users/user-info', {user});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const renderNewUserForm = (req, res) => {
  res.render('users/user-form');
};


// function to add an user
const addOneUser = async (req, res) => {
  const { body } = req;
  // Validate fields on server-side
  const errors = [];
  if (!body.name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!body.surname) {
    errors.push({ text: 'Please add a surname' });
  }
  if (!body.address) {
    errors.push({ text: 'Please add address information' });
  }
  if (!body.phone) {
    errors.push({ text: 'Please add a phone number' });
  }
  if (!body.city) {
    errors.push({ text: 'Please add your city of residence' });
  }
  // Check for errors first
  if (errors.length > 0) {
    return res.status(400).json({ succes: false, message: errors });
  }
  try {
    // Get the associated account by email in JWT_token
    const {email} = req.userData;
    // Update the disabled column of user account
    const account = await models.Account.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      }});
    await account.update({disabled: false});
    const user = await models.User.findOne({where: { email }});
    // Check the name provided is correct
    /* if (!account) {
      return res
        .status(404)
        .json({
          success: false,
          message: 'Provided name doesnt match with any registered account',
        });
    } */

    // Add the new user information with its respectived account email
    console.log(body);
    await user.update({
      ...body,
      roleId: 2,
    });
    // Final response, if all steps correct
    //res.json({ success: true, message: 'User added succesfully' });
    req.flash('success_msg', 'Usuario creado satisfactoriamente');
    res.redirect('/api/v1/home');
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
    const { id } = req.params;
    const response = await service.deleteUserById(id);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUserById,
  addOneUser,
  updateOneUserById,
  deleteOneUserById,

  renderNewUserForm
};
