const models = require('../models');

class RoleServices {
    constructor(){};

    async getAllRoles() {
        const res = await models.Role.findAll();
        return res;
    };

    async getRoleById(id) {
        const res = await models.Role.findByPK(id);
        return res;
    };

    async addNewRole(data) {
        const res = await models.Role.create(data);
        return res;
    };

    async updateRoleById(id, data) {
        const log = await this.findOne(id);
        const res = await log.update(data);
        return res;
    };

    async deleteRoleById() {
        const log = await this.findOne(id);
        await log.destroy();
        return {deleted : true};
    };

    async getUsersByRole(id) {
        const res = await models.User.findAll({where: {roleId: id}});
        return res;
    };
};

module.exports = RoleServices;