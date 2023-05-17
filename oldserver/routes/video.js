const express = require('express');
const router = express.Router();

const videoController = require('../app/controllers/VideoController');
router.post('/getownvideos', videoController.getStudioListVideo);
router.get('/:slug',videoController.getVideo);
router.get('/', videoController.getListVideo);


module.exports = router;
