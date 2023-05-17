const { Op } = require('sequelize');
const { sequelize, Video, Channel } = require('../models/index');


class SearchController {
    async search(req, res, next) {
        if (req.params.slug != '') {
            const list = await Video.findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.params.slug}%`
                    }
                }
            });
            console.log(list);
            res.json(list);
        }
    }

}

module.exports = new SearchController();