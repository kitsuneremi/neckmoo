const homeRouter = require('./video.js');
const searchRouter = require('./search.js');
const signRouter = require('./sign.js');
const UpRouter = require('./up.js');
const fileRouter = require('./file.js');
const channelRouter = require('./channel.js');
const accountRouter = require('./account.js');
const studioRouter = require('./studio.js');
const detailChannelRouter = require('./detailChannel.js');
// const verifyToken = require('../middleware/auth')

function route(app) {
    app.use('/api/video', homeRouter);
    app.use('/api/searchbar', searchRouter);
    app.use('/api/sign', signRouter);
    app.use('/api/upload', UpRouter);
    app.use('/api/file', fileRouter);
    app.use('/api/channel', channelRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/studio', studioRouter);
    app.use('/api/detailchannel', detailChannelRouter);
}

module.exports = route;
 