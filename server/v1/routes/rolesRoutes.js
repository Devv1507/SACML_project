const {Router} = require('express');
const roleController = require('../../controllers/roleController.js');
// assignning the instance of Router class
const router = Router();
// our routes for Role schema (this is adding to root route /api/v1/Roles)
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getOneRoleById);
router.post('/', roleController.addOneRole);
router.put('/:id', roleController.updateOneRoleById);
router.delete('/:id', roleController.deleteOneRoleById);
// we can deploy routes for related schemas, example: get users of the same role
router.get('/:id/users', roleController.getUsersByRole);

// exporting the router instance with the Role routes
module.exports = router;