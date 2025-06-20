require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
    'host':'localhost',
    'user':'root',
    'password':process.env.DB_PASSWORD,
    'database':'moviedb',
    'dateStrings':true
});
db.connect((err,res)=>{
    if (err) throw err;
    console.log("Connected to Database");
});
module.exports=db;

