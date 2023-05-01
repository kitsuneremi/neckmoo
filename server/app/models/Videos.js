// const mongoose = require("mongoose");
// const Schema = mongoose.Schema 

// const Video = new Schema({
//     title: { type: String },
//     des: { type: String },
//     view: { type: String },
//     tag: { type: String },
//     status: { type: String },
//     videoId: { type: String },
//     channelTagName: { type: String },
//     channelName: { type: String },
// }, { timestamps: true })

// module.exports = mongoose.model('Video', Video)


module.exports = (sequelize, DataType) => {
    const Videos = sequelize.define("Videos", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
        },
        des: {
            type: DataType.STRING,
            allowNull: true,
        },
        view: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        link: {
            type: DataType.STRING,
            allowNull: false,
        }
    }
    );
    return Videos;
}