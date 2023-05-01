const express = require('express');
const router = express.Router();

const channelController = require('../app/controllers/ChannelController')
router.get('/test/:slug', channelController.getChannelFromVideo);

module.exports = router;
