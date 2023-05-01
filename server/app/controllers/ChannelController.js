const { sequelize, Video, Channel } = require('../models/index');

class ChannelController {
    async getChannelFromVideo(req, res, next) {
        const channel = await sequelize.query(`select * from Channels join Videos on Channels.id = Videos.channelId where link = '${req.params.slug}'`,{
            type: sequelize.SELECT,
            model: Channel,
            mapToModel: true
        })
        res.json(channel[0])
    }

    async getChannelFromAccount(req, res, next) {
        const channel = await sequelize.query(`select * from Channels join Accounts on Accounts.id = Channel.accountId where link = '${req.params.slug}'`,{
            type: sequelize.SELECT,
            model: Channel,
            mapToModel: true
        })
        res.json(channel[0])
    }
}

module.exports = new ChannelController();