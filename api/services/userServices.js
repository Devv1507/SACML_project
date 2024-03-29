const models = require('../models');

class UserServices {
    constructor(){};

    async getAllUsers() {
        const res = await models.User.findAll();
        return res;
    };

    async getUserById(id) {
        const res = await models.User.findByPk(id);
        return res;
    };

    async addNewUser(data) {
        const res = await models.User.create(data);
        console.log(res);
        return res;
    };

    async updateUserById(id, data) {
        const log = await this.findOne(id);
        const res = await log.update(data);
        return res;
    };

    async deleteUserById(id) {
        const log = await this.findOne(id);
        await log.destroy();
        return {deleted : true};
    };
};

module.exports = UserServices;