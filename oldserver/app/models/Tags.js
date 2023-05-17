module.exports = (sequelize, DataType) => {
    const Tags = sequelize.define("Tags", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataType.STRING,
            allowNull: false,
        }
    }
    );
    return Tags;
}