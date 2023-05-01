// import { Schema as _Schema, model } from "mongoose";
// const Schema = _Schema

// const ListCategoryVideo = new Schema({
//     videoId: { type: String },
//     categoryId: { type: String },
// })

// export default model('ListCategoryVideo', ListCategoryVideo)

module.exports = (sequelize, DataType) => {
    const ListCategoryVideos = sequelize.define("ListCategoryVideos", {
        videoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        categoryId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
    );
    return ListCategoryVideos;
}