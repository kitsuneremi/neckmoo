module.exports = (sequelize, DataType) => {
    const Posts = sequelize.define("Posts", {
        id: {
            type: DataType.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        des: {
            type: DataType.STRING,
            allowNull: true,
        },
        title: {
            type: DataType.STRING,
            allowNull: true
        }
    }
    );
    return Posts;
}