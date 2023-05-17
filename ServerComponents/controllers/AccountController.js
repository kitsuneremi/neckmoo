const { sequelize, Account } = require('../models/index').default;

class AccountController {
    async getAccount(req, res, next) {
        const channel = await Account.findOne({where: {id: req.params.slug}})
        res.json(channel)
    }
}

module.exports = new AccountController();