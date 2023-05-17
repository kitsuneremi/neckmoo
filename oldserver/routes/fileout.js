const express = require('express');
const router = express.Router();

const fileController = require('../app/controllers/FileController')
router.get('/image/:slug',fileController.getImage);
router.get('/video/:slug',fileController.getVideo);

module.exports = router;
