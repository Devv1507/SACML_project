const models = require('../models');

const createAdminUser = async (req, res) => {
    const accountFound = await models.Account.findOne({
        where: { email : process.env.ADMIN_EMAIL },
    });
    if (accountFound) return;

    const newAdminAccount = {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        disabled: false
      };
    newAdminAccount.password = await models.Account.encryptPassword(process.env.ADMIN_PASSWORD);
    const adminAccount = await models.Account.create(newAdminAccount);
    /* console.log("Admin user created", "Account:", adminAccount); */
    
    const createdAccount = await models.Account.findOne({
        where: { email: newAdminAccount.email }
    });
    const newAdminUser = {
        id: createdAccount.id,
        name: createdAccount.name,
        email: createdAccount.email,
        roleId: 3,
        city: 'NA'
    };
    const adminUser = await models.User.create(newAdminUser);
    /* console.log("User:", adminUser); */
}

module.exports = {createAdminUser}