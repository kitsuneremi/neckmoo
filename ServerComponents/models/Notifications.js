module.exports = (sequelize, DataType) => {
    const Notifications = sequelize.define("Notifications", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        channelId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataType.STRING,
            allowNull: false
        },
        status: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }
    );
    return Notifications;
}