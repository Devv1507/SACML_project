const {Router} = require('express');
const router = Router();
const citiesController = require('../../controllers/cityController.js');

router.post('/',  citiesController.addCity);


module.exports = router;
