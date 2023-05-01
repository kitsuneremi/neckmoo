// import { Schema as _Schema, model } from "mongoose";
// const Schema = _Schema

// const Account = new Schema({
//     email: {type: String, required: true},
//     name: { type: String },
// }, { timestamps: true })

// export default model('Account', Account)

module.exports = (sequelize, DataType) => {
    const Accounts = sequelize.define("Accounts", {
        id:{
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        refreshToken: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        }
        
    }
    );
    return Accounts;
}