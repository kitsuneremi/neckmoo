const { Sequelize } = require('sequelize');
//connect database
const sequelize = new Sequelize('erinasai_zootube', 'erinasai_lily', 'Mochirondesu123', {
    host: '103.200.22.212',
    dialect: 'mysql',
    define: {
        timestamps: false // disable timestamps globally
    }
});

try {
    const test = async () => {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.x');
    }
    test();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;