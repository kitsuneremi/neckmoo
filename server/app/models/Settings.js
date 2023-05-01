module.exports = (sequelize, DataType) => {
    const Settings = sequelize.define("Settings", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
        value: {
            type: DataType.STRING,
            allowNull: false,
        }
    }
    );
    return Settings;
}