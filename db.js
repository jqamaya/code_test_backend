var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true,
    debug: false
});
var DB = function() {
    function _query(query, params, callback) {
        pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }
            connection.query(query, params, function(err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                } else {
                    callback(null, err);
                }
            });
            connection.on('error', function(err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };
    return {
        query: _query
    };
};
module.exports = DB;