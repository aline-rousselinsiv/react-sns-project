const mysql = require('mysql2'); // need to import the npm mysql2
require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.alinpw,
    database: 'mysqldb' // db 이름
});

// promise 기반으로 사용할 수 있게 변환
const promisePool = pool.promise();
module.exports = promisePool;