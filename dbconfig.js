var fs = require("fs");

var mysql = require("mysql");

var pool = Object;

async function initPool() {
  await fs.exists("dbconfig.json", function(exists) {
    if (exists) {
      pool = mysql.createPool(JSON.parse(fs.readFileSync('dbconfig.json')));
    } else {
      pool = mysql.createPool({
        host: "localhost",
        user: "user",
        password: "password",
        database: "database",
        port: 3306
      });
    }
  });
}

initPool();

function query(sql, callback) {
  pool.query(sql, function(err, rows) {
      callback(err, rows);
  });
}

exports.query = query;
