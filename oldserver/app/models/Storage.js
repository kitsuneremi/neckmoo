module.exports = (sequelize, DataType) => {
    const Storage = sequelize.define("Storage", {
        link: {
            type: DataType.STRING,
            allowNull: false,
        },
        videoType: {
            type: DataType.STRING,
            allowNull: false,
        },
        thumbnailType: {
            type: DataType.STRING,
            allowNull: false
        }
    }
    );
    return Storage;
}