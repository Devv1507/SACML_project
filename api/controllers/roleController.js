const RoleServices = require('../services/roleServices.js');
const service = new RoleServices();

const getAllRoles = async (req, res) => {
  try {
    const response = await service.getAllRoles();
    res.json({ success: true, message: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getOneRoleById = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await service.getRoleById(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addOneRole = async (req, res) => {
  const { body } = req;
  if (!body.name)
    return res.status(400).send('One of the fields is missing in the data');
  try {
    await service.addNewRole(body);
    res.json({ success: true, message: 'Role added succesfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const updateOneRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.updateRoleById(id, body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const deleteOneRoleById = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await service.deleteRoleById(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await service.getUsersByRole(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  getAllRoles,
  getOneRoleById,
  addOneRole,
  updateOneRoleById,
  deleteOneRoleById,
  getUsersByRole
};
