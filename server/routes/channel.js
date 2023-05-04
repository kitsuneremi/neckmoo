const express = require('express');
const router = express.Router();

const channelController = require('../app/controllers/ChannelController')
router.get('/test/:slug', channelController.getChannelFromVideo);
router.get('/basicdata/:slug', channelController.getChannelBasicData);

module.exports = router;
