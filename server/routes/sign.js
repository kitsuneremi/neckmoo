const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middleware/auth')

const x = multer()
const SignController = require('../app/controllers/SignController');

router.post('/signin', x.none(), SignController.find);
router.post('/register', x.none(), SignController.register);
router.post('/token', x.none(), SignController.token);
router.post('/logout', verifyToken, SignController.logout);
module.exports = router;
