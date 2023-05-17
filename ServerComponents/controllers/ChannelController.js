const { sequelize, Video, Channel } = require('../models/index').default;

class ChannelController {
    async getChannelFromVideo(req, res, next) {
        const channel = await sequelize.query(`select * from Channels join Videos on Channels.id = Videos.channelId where link = '${req.params.slug}'`, {
            type: sequelize.SELECT,
            model: Channel,
            mapToModel: true
        })
        res.json(channel[0])
    }

    async getChannelFromAccount(req, res, next) {
        const channel = await sequelize.query(`select * from Channels join Accounts on Accounts.id = Channel.accountId where link = '${req.params.slug}'`, {
            type: sequelize.SELECT,
            model: Channel,
            mapToModel: true
        })
        res.json(channel[0])
    }

    async getChannelBasicData(req, res, next) {
        const channel = await Channel.findOne(
            {
                where: {
                    id: req.params.slug
                }
            }
        )
        res.json(channel)
    }
    async createChannel(req, res, next) {
        const channel = await Channel.create({
            accountId: req.body.accountId,
            name: req.body.name,
            tagName: req.body.tagName,
            des: req.body.des
        })
        if (channel) {
            res.sendStatus(200)
        } else {
            res.sendStatus(422)
        }
    }

    async updateChannel(req, res, next) {
        const channel = await Channel.update({tagName: req.params.tagName, des: req.body.des},{
            where: req.body.tagName
        })

    }

    async deleteChannel(req, res, next) {
        
    }

    async findChannel(req, res, next) {
        const accountId = req.params.slug
        const channel = await Channel.findOne({ where: { accountId: accountId}})
        if(channel){
            res.status(200)
            res.json(channel)
        }else{
            res.sendStatus(404)
        }
    }
}

module.exports = new ChannelController();