const express = require('express');
const router = express.Router();
const UpController = require('../app/controllers/UpController');
const multer = require('multer');
const path = require('path');


const VideoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"Storage/video/vid")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"Storage/video/img")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const ChannelAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"Storage/channel/avatar")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const ChannelBanner =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"Storage/channel/banner")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const VideoUpload = multer({storage: VideoStorage})
const ImageUpload = multer({storage: ImageStorage})
const ChannelAvatarUpload = multer({storage: ChannelAvatar})
const ChannelBannerUpload = multer({storage: ChannelBanner})
const upload = multer()
router.post('/video',VideoUpload.single("video"), (req, res, next) => {
    res.send({name: VideoStorage._handleFile.name})
});
router.post('/videoimg',ImageUpload.single("image"), (req, res, next) => {
    res.send({name: ImageStorage._handleFile.name})
});
router.post('/channelavatar',ImageUpload.single("image"), (req, res, next) => {
    res.send({name: ImageStorage._handleFile.name})
});
router.post('/channelbanner',ImageUpload.single("image"), (req, res, next) => {
    res.send({name: ImageStorage._handleFile.name})
});

router.post('/testx', upload.none(), UpController.up)
module.exports = router;
