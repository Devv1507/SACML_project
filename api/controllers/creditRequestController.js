const models = require('../models');

// *** Credit Request Form ***
const renderNewRequest = (req, res) => {
  res.render('credit-requests/credit-request-form');
};

// function to add a credit request
const addCreditRequest = async (req, res) => {
  const { body } = req;
  const {id} = req.userData;
  //console.log(user);
  // Validate fields on server-side (i.e. nulls)
  const errors = [];
  if (!body.amount) {
    errors.push({ text: 'Please add an amount' });
  }
  if (!body.description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!body.creditHistory) {
    errors.push({ text: 'Please add some of your credit history' });
  }
  // Check for errors
  if (errors.length > 0) {
    return res.status(400).json({succes: false, message: errors});
  }
  try {
    await models.CreditRequest.create(
        {
            ...body,
            userId: id
        });
    req.flash('success_msg', 'Solicitud radicada satisfactoriamente');
    res.redirect('/api/v1/home/');
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// function to get a particular credit request by user id
const getCreditRequestOfUser = async (req, res) => {
  try {
    /* const { id } = req.params;  */
    const {id} = req.userData;
    const creditRequests = await models.CreditRequest.findAll({where: { userId : id}});
    //res.json(creditRequest);
    res.render('credit-requests/user-credit-requests', {creditRequests});
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to get all credit request
const getAllCreditRequests = async (req, res) => {
  try {
    const allCreditRequests = await models.CreditRequest.findAll();
    if (response) {
      res.json({ success: true, message: allCreditRequests });
    } else {
      res.status(400).json('Credit request not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to update a particular user by id
const updateCreditRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const targetCreditRequest = await models.CreditRequest.findByPk(id);
    const updatedCreditRequest = await targetCreditRequest.update(body);
    res.json(updatedCreditRequest);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to delete a particular user by id
const deleteCredetRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCreditRequest = await models.CreditRequest.findByPk(id);
    await targetCreditRequest.destroy();
    res.json({deleted : true});
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = {
  getAllCreditRequests,
  getCreditRequestOfUser,
  addCreditRequest,
  updateCreditRequestById,
  deleteCredetRequestById,
// need to create other conjuntion functions
  renderNewRequest
};

