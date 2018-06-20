var mysql = require("mysql");
var pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'zkl2333.com',
      database: 'id',
      port: 3306
});

function query(sql, callback) {
      pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, rows) {
                  callback(err, rows);
                  connection.release();
            });
      });
}

exports.query = query;