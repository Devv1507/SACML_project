const models = require('../models');
// ************************ Modules & Utils ************************
const bcrypt = require('bcryptjs'); // import bcryptjs to encryptation of information
const { issueJWT } = require('../libs/createToken');

// ************************ Controller functions ************************
// Get account by ID
const getById = async (req, res) => {
  try {
    const { id } = req.userData;
    const account = await models.Account.findByPk(id);
    if (account) {
      res.json({ success: true, message: account });
      //res.render('accounts/account-home', {account});
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Get all accounts
const getAll = async (req, res) => {
  try {
    const accounts = await models.Account.findAll();
    if (accounts) {
      //res.json({ success: true, message: accounts });
      res.render('accounts/all-accounts', { accounts });
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Delete an account
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await models.Account.findByPk(id);
    await target.destroy();
    req.flash('success_msg', 'Account deleted successfully'); //********************** */
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// Update an account
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await models.Account.findByPk(id);
    const { body } = req;
    await target.update(body);
    req.flash('success_msg', 'Account updated successfully');
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  deleteAccount,
  updateAccount,
};
