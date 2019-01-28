//Connection Import
let connection = require("./connection.js");

function questionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objSql(ob) {
    let arr = [];

    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};


let orm = {
    all: function(tblInput, cb) {
        let queryString = "INSERT INTO " + tblInput + ";";
        connection.query(queryString, function(err, res){
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    create: function(tbl, cols, vals, cb) {
        let queryString = "INSERT INTO " + tbl;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function(err, res){
            if (err){
                throw err;
            }
            cb(res);
        })
    },
    update: function(tbl, objColVals, condition, cb){
        let queryString = "UPDATE " + tbl;

        queryString += " SET ";
        queryString +=  objSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err,res){
            if (err) {
                throw err;
            }
            cb (res);
        });
    },
    delete: function (tbl, cond, cb) {
        let queryString = "DELETE FROM " + tbl;
        
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err,res){
            if (err) {
                throw err;
            }
            cb(res);
        })
    }
}

module.exports=orm;