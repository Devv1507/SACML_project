const models = require('../models');
// ************************ Modules & Utils ************************
const bcrypt = require('bcryptjs'); // import bcryptjs to encryptation of information
const { issueJWT } = require('../libs/createToken');
const jwt = require('jsonwebtoken');

// ************************ Controller functions ************************
// ************************ Sign Up
const signUp = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const errors = [];
    // Validate email, check account from database with same email if any
    const existingEmail = await models.Account.findOne({
      where: { email },
    });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: 'El correo ingresado ya se encuentra registrado' });
    }
    // Null, empty or undefined constrains
    if (!name) {
      errors.push('Por favor añada un nombre para la cuenta');
    }
    if (!email) {
      errors.push('Por favor añada un email');
    }
    if (!password) {
      errors.push('Por favor añada una contraseña');
    }
    if (password != rePassword) {
      errors.push('Las contraseñas no coinciden, intente de nuevo');
    }
    // Check for errors first
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    // Hash password
    const salt = await bcrypt.genSalt(10); //************+++++********** */
    const hash = await bcrypt.hash(password, salt);
    // Create new account for user
    const newAccount = {
      name,
      email,
      password: hash,
    };
    const account = await models.Account.create(newAccount);
    // ++++++++++++++
    await models.User.create({
      id: account.id,
      name,
      email,
      roleId: 1,
      city: 'NA',
    });

    const accessToken = await issueJWT(account, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
    res.status(201).json({
      id: account.id,
      name: account.name,
      email: account.email,
      token: accessToken.token,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json(['Error creating user']); // More user-friendly error message
  }
};

// ************************ Log In 
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the name
    const account = await models.Account.findOne({ where: { email } });
    if (!account) {
      return res
        .status(404)
        .json(['Account email is not found. Invalid login credentials']);
    }
    // Checking if the password matchs
    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password not valid' });
    }
    // If the password matchs, sign the token and give it to the employee
    const accessToken = await issueJWT(account, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
    const refreshToken = await issueJWT(account, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRATION);

    await account.update({refreshToken});
    // Save the token in a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    }); // Cookie expires in 1 day (hours * minutes * seconds * ms)

    // Response
    res.status(200).json({
      message: 'Authentication successful',
      accessToken,
      /* expiresIn: tokenObject.expires, */
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// ************************ Refresh Token logic
const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ message: 'No cookie found' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, decoded) => {
    if (error) return res.status(401).json({error});

    const userFound = await models.Account.findOne({ email: decoded.email });
    if (!userFound) return res.sendStatus(403);

    const accessToken = await issueJWT(
      userFound,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    return res.json({
      accessToken,
    });
  });
};
// ************************ Log Out
const logOut = async (req, res) => {
  // On client, also delete the accessToken
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(204); //No content
  // Is refreshToken in db?
  const foundUser = await models.Account.findOne({ refreshToken });
  if (!foundUser) {
    // Clear the cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.sendStatus(204);
  }
  // Delete refreshToken in db
  await foundUser.update({refreshToken: 'NA'});
  // Clear the cookie
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
  // ???
  const accessToken = await issueJWT(account, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
  res.sendStatus(204).json({ accessToken });
};

module.exports = {
  signUp,
  logIn,
  handleRefreshToken,
  logOut,
};
