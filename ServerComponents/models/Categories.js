export default (sequelize, DataType) => {
    const Categories = sequelize.define("Categories", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
    );
    return Categories;
}