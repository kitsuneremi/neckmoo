module.exports = (sequelize, DataType) => {
    const DetailListVideos = sequelize.define("DetailListVideos", {
        videoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        listId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }
    );
    return DetailListVideos;
}