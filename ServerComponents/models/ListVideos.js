module.exports = (sequelize, DataType) => {
    const ListVideos = sequelize.define("ListVideos", {
        id: {
            type:DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        channelId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
        }
    }
    );
    return ListVideos;
}