const express = require('express');
const router = express.Router();

const channelController = require('../app/controllers/ChannelController')
router.get('/test/:slug', channelController.getChannelFromVideo);
router.get('/basicdata/:slug', channelController.getChannelBasicData);
router.get('/findchannel/:slug', channelController.findChannel);
router.post('/create', channelController.createChannel);
router.post('/update', channelController.updateChannel)
router.post('/delete', channelController.deleteChannel)

module.exports = router;
