const { sequelize, Account } = require('../models/index');

class AccountController {
    async getAccount(req, res, next) {
        const channel = await Account.findOne({where: {username: req.params.slug}})
        res.json(channel)
    }
}

module.exports = new AccountController();