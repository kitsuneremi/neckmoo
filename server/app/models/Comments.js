module.exports = (sequelize, DataType) => {
    const Comments = sequelize.define("Comments", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        videoId: {
            type: DataType.STRING,
            allowNull: false
        },
        content: {
            type: DataType.STRING,
            allowNull: false
        },
        status: {
            type: DataType.INTEGER,
            allowNull: false
        }
    }
    );
    return Comments;
}