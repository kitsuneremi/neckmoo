const videoRouter = require('./video.js');
const signRouter = require('./sign.js');
const fileInRouter = require('./filein.js');
const fileOutRouter = require('./fileout.js');
const channelRouter = require('./channel.js');
const accountRouter = require('./account.js');
const detailChannelRouter = require('./detailChannel.js');
const filedeleteRouter = require('./filedelete.js');
// const verifyToken = require('../middleware/auth')

function route(app) {
    app.use('/api/sign', signRouter);

    app.use('/api/video', videoRouter);
    app.use('/api/channel', channelRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/detailchannel', detailChannelRouter);
    app.use('/api/filein', fileInRouter);
    app.use('/api/fileout', fileOutRouter);
    app.use('/api/filedelete', filedeleteRouter)
}

module.exports = route;
 