const models = require('../models');

// *** Modules
const bcrypt = require('bcryptjs');   // import bcryptjs to encryptation of information
const jwt = require('jsonwebtoken');  // import jsonwebtoken to token settings

// *** Sign Up ***
const renderNewRegisterForm = (req, res) => {
  res.render('accounts/signup-form');
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const errors = [];
    // Validate email, check account from database with same email if any
    const existingEmail = await models.Account.findOne({where: { email } });
    if (existingEmail) {
      /* return res.status(409).json({ message: 'Email is already registered' }); */
      errors.push({ text: 'El correo ingresado ya se encuentra registrado' });
    }
    // Validate name, check account from database with same name if any
    const existingName = await models.Account.findOne({where: { name } });
    if (existingName) {
      /* return res.status(409).json({ message: 'Account name is already taken' }); */
      errors.push({ text: 'El nombre de la cuenta ingresado ya se encuentra registrado' });
    }
    // Null, empty or undefined constrains
    if (!name) {
      errors.push({ text: 'Por favor añada un nombre para la cuenta' });
    }
    if (!email) {
      errors.push({ text: 'Por favor añada un email' });
    }
    if (!password) {
      errors.push({ text: 'Por favor añada una contraseña' });
    }
    if (password != rePassword) {
      errors.push({ text: `Las contraseñas no coinciden, intente de nuevo` });
    }
    // Check for errors first
    if (errors.length > 0) {
      /* return res.status(400).json({ succes: false, message: errors }); */
      return res.render('accounts/signup-form', {
        errors,
        name,
        email
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Create new account for user
    const newAccount = {
      name,
      email,
      password: hash,
    };
    const account = await models.Account.create(newAccount);
    await models.User.create({
      id: account.id,
      email,
      roleId: 1
    });
    /* res.status(201).json({ message: 'Account created successfully' }); */
    req.flash('success_msg', 'Su cuenta ha sido creada satisfactoriamente');
    res.redirect('/');
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user' }); // More user-friendly error message
  }
};

// *** Log In ***
const renderLogInForm = (req, res) => {
  res.render('accounts/login-form');
};

const logIn = async (req, res) => {
  try {
    const {body} = req;
    // Validate the name
    const account = await models.Account.findOne({where: { email: body.email }});
    if (!account) {
      return res.status(404).json({message: 'Account email is not found. Invalid login credentials',});
    }
    // We will check the if the account is logging in via the correct route
    /* if (account.role !== role) {
      return res.status(403).json({
        message: 'Please make sure you are logging in from the right portal.',
        success: false,
      });
    } */

    // Checking if the password match
    const passwordMatch = await bcrypt.compare(
      body.password,
      account.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password not valid' });
    }
    // If the password match, sign the token and give it to the employee
    const token = await jwt.sign(
      { email: account.email, accountId: account.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1800m' } //token expiration
    );
    // Save the token in a cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1800000 }); // Cookie expires in 30 minutes
    res.redirect('/api/v1/home/'); // Redirect to the homepage or any other desired page

    //res.status(200).json({ message: 'Authentication successful', token });
    //res.cookie("token", token, { httpOnly: true, secure: true } ).status(200).send({token});
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: `Something's wrong with login` });
  }
};

const getById = async (req, res) => {
  try {
    const {id} = req.userData;
    const account = await models.Account.findByPk(id);
    const user = await models.User.findByPk(id);
    const haveRequest = await models.CreditRequest.findAll({where: {userId: id}});
    let boolStatus = false;
    if (haveRequest.length !== 0){
      boolStatus = true;
    }
    if (account) {
      //res.json({ success: true, message: accounts });
      res.render('accounts/account-home', {account, user, boolStatus});

    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const getAll = async (req, res) => {
  try {
    const accounts = await models.Account.findAll();
    if (accounts) {
      //res.json({ success: true, message: accounts });
      res.render('accounts/all-accounts', {accounts});

    } else {
      res.status(400).json('User not found');
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const deleteAccount = async (req,res) => {
  try {
    const {id} = req.params;
    const target = await models.Account.findByPk(id);
    await target.destroy();
    req.flash("warning_msg", "La cuenta ha sido eliminada"); //********************** */
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const renderUpdateForm = async (req, res) => {
  const {id} = req.params;
  if (id != req.userData.dataValues.id) {
    req.flash("error", "No autorizado");
    return res.redirect('/api/v1/home/');
  }
  const target = await models.Account.findByPk(id);
  res.render('accounts/edit-account-form', {target});
};
const updateAccount = async (req,res) => {
  try {
    const {id} = req.params;
    const target = await models.Account.findByPk(id);
    const {body} = req;
    await target.update(body);
    req.flash("success_msg", "Account updated successfully");
    res.redirect('/api/v1/home/');
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const logOut = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'Logged out succesfully');
    res.clearCookie('jwt');
    res.redirect('/');
  });
}

module.exports = { signUp, logIn, getAll, getById,
   renderNewRegisterForm, renderLogInForm, deleteAccount, renderUpdateForm, updateAccount, logOut };
