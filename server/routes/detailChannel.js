const express = require('express');
const router = express.Router();

const videoController = require('../app/controllers/VideoController');
router.get('/featured/video',videoController.getLimitVideo);
router.get('/videos/popular', videoController.getPopularVideo);
router.get('/videos/newest', videoController.getNewestVideo);

module.exports = router;
