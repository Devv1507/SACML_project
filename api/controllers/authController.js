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

    //Get account from database with same name if any
    const validateAccountName = async (name) => {
      const account = await models.Account.findOne({ name });
      return account ? false : true;
    };

    // Validate the name
    const nameNotTaken = await validateAccountName(body.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Account name is already taken.`,
      });
    }
    //Get account from database with same email if any
    const validateEmail = async (email) => {
      const account = await models.Account.findOne({ email });
      return account ? false : true;
    };
    // Validate the email
    const emailNotRegistered = await validateEmail(body.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
      });
    }
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
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user' }); // More user-friendly error message
  }
};

const logIn = async (req, res) => {
  try {
    // Validate the name
    const account = await models.Account.findOne({
      where: { email: req.body.email }
    });
    if (!account) {
      return res
        .status(404)
        .json({
          message: 'Account name is not found. Invalid login credentials',
        });
    }
    // We will check the if the account is logging in via the correct route
    /* if (account.role !== role) {
      return res.status(403).json({
        message: 'Please make sure you are logging in from the right portal.',
        success: false,
      });
    } */

    // Checking if the password match
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      account.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password not valid' });
    }
    // If the password match, sign the token and give it to the employee
    const token = await jwt.sign(
      { email: account.email, accountId: account.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1800m' } //token expiration
    );
    res.status(200).json({ message: 'Authentication successful', token });
    //res.cookie("token", token, { httpOnly: true, secure: true } ).status(200).send({token});
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
