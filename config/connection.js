//MySQL Set-Up
let mysql = require("mysql");

//Connection Info
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});

//Connection Set-Up
connection.connect(function(err){
    if (err) {
        console.error("error connection: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
})

//Export
module.exports = connection;