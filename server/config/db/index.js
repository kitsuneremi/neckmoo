const mongoose = require('mongoose');
const mysql = require('mysql');
const sql = require('mssql');

//mongodb
// async function connect() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/lily_node', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         console.log('connect ok')
//     } catch (error) {
//         console.log('fail')
//     }
// }

//mssql
// const sqlConfig = {
//     user: "sa",
//     password: "12345",
//     database: "zootube",
//     server: 'localhost',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true, // for azure
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//     }
// }

// let connect = async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(sqlConfig)
//         console.log("connect ok")
//     } catch (err) {
//         // ... error checks
//         console.log("fail")
//     }
// }


//mysql
var connect 
let connection = mysql.createConnection({
    host: '103.200.22.212',
    user: 'erinasai_lily',
    password: 'Mochirondesu123',
    database: 'erinasai_zootube'
});
try{
    connect =  async () => {
       await connection.connect();
    }
    console.log('connect ok');
    
}catch(error){
    console.log('connect error');
}

module.exports = connect