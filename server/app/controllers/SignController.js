const { Account } = require('../models/index')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const handlejwt = payload => {
    //create jwt
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRECT, {
        expiresIn: '300s'
    })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRECT, {
        expiresIn: '31536000s'
    })
    return { accessToken, refreshToken }
}

const updateRefreshToken = async (username, refreshToken) => {
    const acc = await Account.findOne({ where: { username: username } });
    acc.refreshToken = refreshToken
    await acc.save()
}
class SignController {

    async find(req, res, next) {
        if (req.body.username != '') {
            let username = req.body.username
            const acc = await Account.findOne({ where: { username: username, password: req.body.password } })
            if (!acc) { return res.sendStatus(401) }
            const { accessToken, refreshToken } = handlejwt(acc.dataValues)
            updateRefreshToken(username, refreshToken)
            res.json({ 'accessToken': accessToken, 'username': username, 'refreshToken': refreshToken })
        }
    }

    async token(req, res, next) {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) { res.sendStatus(401) }

        const account = await Account.findOne({ where: { username: req.body.username } })
        if (!account) { res.sendStatus(403) }

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRECT)
            const {newAccessToken, newRefreshToken} = handlejwt(account.dataValues)
            updateRefreshToken(req.body.username, newRefreshToken)
            res.json({'accessToken': newAccessToken, 'refreshToken': newRefreshToken, 'username': req.body.username})
        } catch (error) {
            console.log(error)
            res.sendStatus(403)
        }
    }

    async register(req, res, next) {
        const test = await Account.findOne({ where: { username: req.body.username, password: req.body.password } })
        if (test) { return res.sendStatus(409) }
        const acc = await Account.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        })
        if (!acc) { return res.sendStatus(422) }
        res.sendStatus(201)
        const { accessToken, refreshToken } = handlejwt(acc.dataValues)
        res.json({ 'accessToken': accessToken, 'username': req.body.username, 'refreshToken': refreshToken })
    }

    async logout(req, res, next) {
        let acc = await Account.findOne({ where: { username: req.username}})
        acc.refreshToken = null
        acc.save()
        res.sendStatus(200)
    }
}

module.exports = new SignController();