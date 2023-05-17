module.exports = (sequelize, DataType) => {
    const Subcomments = sequelize.define("Subcomments", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        commentId: {
            type: DataType.INTEGER,
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
    return Subcomments;
}