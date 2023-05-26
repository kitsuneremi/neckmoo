const express = require('express');
const router = express.Router();

const fileController = require('../app/controllers/FileController')
router.get('/videoimage/:slug',fileController.getImage);
router.get('/video/:slug',fileController.getVideo);
router.get('/channelavatar/:slug',fileController.getChannelAvatar);
router.get('/channelbanner/:slug',fileController.getChannelBanner);

module.exports = router;
