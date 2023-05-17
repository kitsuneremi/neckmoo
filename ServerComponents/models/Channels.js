export default (sequelize, DataType) => {
    const Channels = sequelize.define("Channels", {
        id: {
            type: DataType.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: true,
        },
        tagName: {
            type: DataType.STRING,
            defaultValue: 0
        },
        des: {
            type: DataType.STRING,
            allowNull: true,
        }
    }
    );
    return Channels;
}