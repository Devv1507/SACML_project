const models = require('../models');

// *** Credit Request Form ***
const renderNewRequest = async (req, res) => {
  // Validate one credit request per time
  const { id } = req.userData;
  const targetRequest = await models.CreditRequest.findOne({ where: { userId: id } });
  if (targetRequest != null && !targetRequest.completed) {
    req.flash('info_msg', 'Estimado usuario, debe esperar a que su solicitud en progreso culmine para radicar una nueva.');
    return res.redirect('/api/v1/home/');
  }
  res.render('credit-requests/credit-request-form');
};

// function to add a credit request
const addCreditRequest = async (req, res) => {
  const { body } = req;
  const { id } = req.userData;
  
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
    return res.status(400).json({ succes: false, message: errors });
  }
  try {
    // Save the credit request in db
    await models.CreditRequest.create({
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
      res.render('credit-requests/all-credit-requests', { allCreditRequests });
    } else {
      req.flash('error', 'No autorizado');
      res.redirect('/api/v1/home/');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

const renderUpdateForm = async (req, res) => {
  const {id} = req.params;
  const {adminRole} = res.locals;
  
  if (!adminRole &&  id != req.userData.dataValues.id) {        /**** */
    req.flash("error", "No autorizado");
    return res.redirect('/api/v1/home/');
  }
  const targetRequest = await models.CreditRequest.findOne({where: {userId: id}});
  res.render('credit-requests/edit-request-form', {targetRequest});
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

module.exports = {
  getAllCreditRequests,
  getCreditRequestOfUser,
  addCreditRequest,
  updateCreditRequestById,
  deleteCredetRequestById,
  // need to create other conjuntion functions
  renderNewRequest,
  renderUpdateForm,
  requestDecision
};
