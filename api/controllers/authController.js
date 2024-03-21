const models = require('../models');

// import bcryptjs to encryptation of information
// import jsonwebtoken to token settings
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    // Check for existing email
    const existingUser = await models.Account.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create user
    const { body } = req;
    const user = await models.Account.create({
      name: body.name,
      email: body.email,
      password: hash,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user' }); // More user-friendly error message
  }
};

/**

const signUp = async (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async(err, hash) => {
            const { body } = req;
            const user = {
                name: body.name,
                email: body.email,
                password: hash
            };
            try {
                await service.addNewUser(user);
                res.status(201).json({message: "User created successfully"});
            } catch (error) {
                res.status(500).send({ success: false, message: error.message });
            }
        });
    });
};

 */

const logIn = async (req, res) => {
  try {
    const user = await models.Account.findOne({
      where: { email: req.body.email },
    }); // this not gonna run
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_KEY
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
