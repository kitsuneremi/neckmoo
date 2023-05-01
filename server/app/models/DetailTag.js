module.exports = (sequelize, DataType) => {
    const DetailTags = sequelize.define("DetailTags", {
        videoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        tagId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
    );
    return DetailTags;
}