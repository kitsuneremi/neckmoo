const { sequelize, Video } = require('../models/index').default;


class UpController {
    async up(req, res, next) {
        await sequelize.sync();
        await Video.create(req.body)
            .then((result) => {
                res.json(result);   
            }).catch((err) => {
                res.json(err);
            });
        
    }
}

module.exports = new UpController();