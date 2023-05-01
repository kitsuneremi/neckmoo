module.exports = (sequelize, DataType) => {
    const CustomListVideos = sequelize.define("CustomListVideos", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        videoId: {
            type: DataType.STRING,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        }
    }
    );
    return CustomListVideos;
}