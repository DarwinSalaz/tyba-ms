const { Router } = require('express');

const { validateJWT } = require('../middlewares/validateJWT');

const { transactionsGet } = require('../controllers/transactionController');

const router = Router();

router.get('/',[
    validateJWT
], transactionsGet );

module.exports = router;
