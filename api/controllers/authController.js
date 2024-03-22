const models = require('../models');

// import bcryptjs to encryptation of information
// import jsonwebtoken to token settings
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    // Check for existing email
    const existingAccount = await models.Account.findOne({
      where: { email: req.body.email },
    });
    if (existingAccount) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create user
    const { body } = req;
    // Not null constrain
    if (!body.name || !body.email || !body.password) {
      return res.status(400).send('One of the fields is missing in the request');
    }
    const newAccount = {
      name: body.name,
      email: body.email,
      password: hash,
    };
    await models.Account.create(newAccount);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user' }); // More user-friendly error message
  }
};

const logIn = async (req, res) => {
  try {
    const account = await models.Account.findOne({
      where: { email: req.body.email },
    }); // this not gonna run
    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      account.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password not valid' });
    }
    const token = await jwt.sign(
      { email: account.email, accountId: account.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1800m' } //token expiry
    );
    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await models.Account.findAll();
    if (response) {
      res.json({ success: true, message: response });
    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { signUp, logIn, getAll };
