const models = require('../models');

// *** Credit Request Form ***

// function to add a credit request
const addCreditRequest = async (req, res) => {
  const { body } = req;
  const { id } = req.userData;
  
  // Validate fields on server-side (i.e. nulls)
  const errors = [];
  if (!body.credit_amount) {
    errors.push({ text: 'Please add an amount' });
  }
  if (!body.duration) {
    errors.push({ text: 'Please add an stimutation of the duration of the deb' });
  }
  if (!body.creditHistory) {
    errors.push({ text: 'Please add some of your credit history' });
  }
  // Check for errors
  if (errors.length > 0) {
    return res.status(400).json({ succes: false, message: errors });
  }
  try {
    const {creditHistory, ...newRequest} = body;
    // Save the credit request in db
    await models.CreditRequest.create({
      ...newRequest,
      creditHistory: 'Bueno',
      userId: id
    });
    res.status(201).json({ success: true, message: 'Credit request added succesfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// function to get a particular credit request by user id
const getCreditRequestOfUser = async (req, res) => {
  try {
    /* const { id } = req.userData; */
    const { id } = req.params; 
    const creditRequests = await models.CreditRequest.findAll({where: { userId: id }}); //*************** */
    if (creditRequests.length === 0) {
      req.flash('info_msg', 'Usted no tiene ninguna solicitud radicada');
      return res.redirect('/api/v1/home/');
    }
    const queueCreditRequest = await models.CreditRequest.findAll({where: { userId: id, completed: false }});
    if (queueCreditRequest.length === 0) {
      req.flash('info_msg', 'No tiene ninguna solicitud en espera');
      return res.redirect('/api/v1/home/');
    }
    res.render('credit-requests/user-credit-request', { creditRequests });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to get all credit request
const getAllCreditRequests = async (req, res) => {
  try {
    const allCreditRequests = await models.CreditRequest.findAll();
    if (res.locals.adminRole) {
      res.json({ success: true, message: allCreditRequests });
    } else {
      res.status(400).json('Not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// function to update a particular user by id
const updateCreditRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const targetCreditRequest = await models.CreditRequest.findOne({where: { userId: id}});
    await targetCreditRequest.update(body);
    req.flash("success_msg", "La solicitud ha sido actualizada satisfactoriamente");
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// function to delete a particular user by id
const deleteCredetRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCreditRequest = await models.CreditRequest.findOne({
      where: { userId: id },
    });
    await targetCreditRequest.destroy();
    req.flash('success_msg', 'Solicitud de crédito eliminada'); //********************** */
    res.redirect('/api/v1/home/');
    /* res.json({deleted : true}); */
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

const requestDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const targetCreditRequest = await models.CreditRequest.findOne({where: { userId: id }});
    await targetCreditRequest.update({status:'Rechazado', completed: true})
    req.flash('info_msg', 'Solicitud de crédito rechazada');
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

const axios = require('axios');

const flaskAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    // Make Flask API request
    const targetUser = await models.User.findOne({where: { id }});
    const targetCreditRequest = await models.CreditRequest.findOne({where: { userId: id }});
    const request = {
      age : targetUser.age,
      sex : targetUser.sex,
      job : targetCreditRequest.job,
      housing : targetCreditRequest.housing,
      savings_account : targetCreditRequest.savings_account,
      checking_account : targetCreditRequest.checking_account,
      purpose : targetCreditRequest.purpose,
      credit_amount: targetCreditRequest.credit_amount,
      duration: targetCreditRequest.duration,
    }
    // Send request to Flask API and get response
    const flaskResponse = await axios.post('http://localhost:9696/predict', request);
    console.log(flaskResponse.data)
    res.status(200).send({ success: true, message: flaskResponse.data });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  getAllCreditRequests,
  getCreditRequestOfUser,
  addCreditRequest,
  updateCreditRequestById,
  deleteCredetRequestById,
  // need to create other conjuntion functions
  flaskAnalytics,
  requestDecision
};
