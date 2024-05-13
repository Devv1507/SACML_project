const models = require('../models');
// ************************ Modules & Utils ************************
const bcrypt = require('bcryptjs'); // import bcryptjs to encryptation of information
const { issueJWT } = require('../libs/createToken');

// ************************ Controller functions ************************
// Get account by ID
const getById = async (req, res) => {
  try {
    const { email } = req.userData;
    const account = await models.Account.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      }
    });
    if (account) {
      res.json({ success: true, message: account, admin: res.locals.adminRole });
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
      res.json({ success: true, message: accounts });
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
    //********************** */
    res.status(200).json('La cuenta específicada ha sido eliminada');
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
    const updated = await target.update(body);
    res.status(200).json(updated);
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
