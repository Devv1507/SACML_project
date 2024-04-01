const models = require('../models');

// function to get all credit request
const getAllCreditRequests = async (req, res) => {
  try {
    const response = await models.CreditRequest.findAll();
    if (response) {
      res.json({ success: true, message: response });
    } else {
      res.status(400).json('Credit request not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to get a particular credit request by user id
const getCreditRequestOfUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await models.CreditRequest.findOne({where: { userId : id}});
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to add a credit request
const addCreditRequest = async (req, res) => {
  const { body } = req;
  console.log(req.userData);
  const {email} = req.userData;
  const user = await models.User.findOne({ where: { email: email} });
  const userId = user.id;
  console.log(user);
  if (
    !body.amount ||
    !body.description ||
    !body.creditHistory 
  ) {
    return res.status(400).send('One of the fields is missing in the data');
  }
  try {
    await models.CreditRequest.create(
        {
            ...body,
            userId: userId
        });
    res.json({ success: true, message: 'Credit request created succesfully' });
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
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = {
  getAllCreditRequests,
  getCreditRequestOfUser,
  addCreditRequest,


  updateOneUserById,
  deleteOneUserById
};

