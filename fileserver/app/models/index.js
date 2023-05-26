// index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/connect/connect');
// Import models from different files
const Account = require('./Accounts.js')(sequelize, Sequelize.DataTypes);
const Category = require('./Categories.js')(sequelize, Sequelize.DataTypes);
const Channel = require('./Channels.js')(sequelize, Sequelize.DataTypes);
const Comment = require('./Comments.js')(sequelize, Sequelize.DataTypes);
const CustomListVideo = require('./CustomListVideos.js')(sequelize, Sequelize.DataTypes);
const Like = require('./Like.js')(sequelize, Sequelize.DataTypes);
const ListCategoryVideo = require('./ListCategoryVideos.js')(sequelize, Sequelize.DataTypes);
const Notification = require('./Notifications.js')(sequelize, Sequelize.DataTypes);
const Post = require('./Posts.js')(sequelize, Sequelize.DataTypes);
const Setting = require('./Settings.js')(sequelize, Sequelize.DataTypes);
const Subcomment = require('./Subcomments.js')(sequelize, Sequelize.DataTypes);
const Subcribe = require('./Subcribes.js')(sequelize, Sequelize.DataTypes);
const Tag = require('./Tags.js')(sequelize, Sequelize.DataTypes);
const Video = require('./Videos.js')(sequelize, Sequelize.DataTypes);
const DetailTag = require('./DetailTag.js')(sequelize, Sequelize.DataTypes);
const ListVideo = require('./ListVideos.js')(sequelize, Sequelize.DataTypes);
const DetailListVideo = require('./DetailListVideo.js')(sequelize, Sequelize.DataTypes);
const Notifications = require('./Notifications.js')(sequelize, Sequelize.DataTypes);

// Create associations
// 1-1
Account.hasOne(Channel)
Channel.belongsTo(Account, {foreignKey: 'accountId'})

// 1-n
Channel.hasMany(Video)
Video.belongsTo(Channel, {foreignKey: 'channelId'})


// Export models and sequelize instance
module.exports = {
  Account,
  // Category,
  Channel,
  // Post,
  // Setting,
  // Subcribe,
  // Tag,
  Video,
  // DetailTag,
  // ListVideo,
  // DetailListVideo,
  sequelize
};