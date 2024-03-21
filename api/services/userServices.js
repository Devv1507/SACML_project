//import { User } from '../db/models/User.js';
//import { Role } from '../db/models/Role.js';
const models = require('../models');

class UserServices {
    constructor(){};

    async getAllUsers() {
        const res = await models.User.findAll();
        return res;
    };

    async getUserById(id) {
        const res = await models.User.findByPK(id);
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

    async deleteUserById() {
        const log = await this.findOne(id);
        await log.destroy();
        return {deleted : true};
    };
};

module.exports = UserServices;