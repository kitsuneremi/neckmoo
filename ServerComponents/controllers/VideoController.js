const { sequelize, Video, Channel, Account } = require('../models/index').default;

class VideoController {

    getVideo(req, res, next) {
        Video.findOne({ videoId: req.params.slug })
            .then(video => {
                res.json(video)
            })
            .catch(next)
    }

    async getListVideo(req, res, next) {
        const list = await Video.findAll({
            where: {
                status: 0
            }
        })
        // list.map((video, index) => {
        //     Video.
        // })
        res.json(list)
    }

    async getPopularVideo(req, res, next) {
        const model = await Video.findAll({
            where: {
                status: 0
            }
        })
        res.json(model)
    }

    async getNewestVideo(req, res, next) {
        const model = await Video.findAll({
            where: {
                status: 0
            }
        })
        res.json(model)
    }

    async getStudioListVideo(req, res, next) {
        await Account.findOne({
            where: {
                id: req.body.id
            }
        })
            .then(acc => {
                Channel.findOne({
                    where: {
                        accountId: acc.id
                    }
                })
                    .then(channel => {
                        Video.findAll({
                            where: {
                                channelId: channel.id
                            }
                        })
                            .then(video => { res.json(video)})
                    })
            })

    }

    getLimitVideo(req, res, next) {
        const offset = parseInt(req.query.offset) || 0;
        const channelId = req.query.channelId;
        const limit = parseInt(req.query.limit) || 0;
        Video.findAll({
            offset: offset,
            limit: limit,
            where: {
                channelId: channelId
            }
        })
            .then(list => {
                res.json(list)
            })
            .catch(next)
    }
}

module.exports = new VideoController();