const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer()

const videoController = require('../app/controllers/VideoController');
router.post('/getlistvideo', upload.none(), videoController.getStudioListVideo);


module.exports = router;
