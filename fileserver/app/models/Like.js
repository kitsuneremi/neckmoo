module.exports = (sequelize, DataType) => {
    const Like = sequelize.define("Like", {
        videoId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataType.INTEGER,
            allowNull: false
        }
    }
    );
    return Like;
}