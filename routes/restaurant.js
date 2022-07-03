const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const { restaurantGet } = require('../controllers/restaurantController');

const router = Router();

router.post('/',[
    validateJWT,
    check('lat', 'La latitud es obligatorio').not().isEmpty(),
    check('lng', 'La longitud es obligatoria').not().isEmpty(),
    validateFields
], restaurantGet );

module.exports = router;
