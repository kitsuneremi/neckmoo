const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
router.get('/:slug',accountController.getAccount);
// router.get('/', videoController.getListVideo);


module.exports = router;
