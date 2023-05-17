// import { Schema as _Schema, model } from "mongoose";
// const Schema = _Schema

// const Category = new Schema({
//     name: { type: String },
// })

// export default model('Category', Category)

module.exports = (sequelize, DataType) => {
    const Categories = sequelize.define("Categories", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
    );
    return Categories;
}