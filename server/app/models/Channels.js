// const mongoose = require("mongoose");
// const Schema = mongoose.Schema

// const Channel = new Schema({

//     channelId: { type: String },
//     name: { type: String },
//     tagName: { type: String },
//     des: { type: String },
//     accountId: { type: String, default: "" },

// }, { timestamps: true })

// module.exports = mongoose.model('Channel', Channel)


module.exports = (sequelize, DataType) => {
    const Channels = sequelize.define("Channels", {
        id: {
            type: DataType.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: true,
        },
        tagName: {
            type: DataType.STRING,
            defaultValue: 0
        },
        des: {
            type: DataType.STRING,
            allowNull: true,
        }
    }
    );
    return Channels;
}