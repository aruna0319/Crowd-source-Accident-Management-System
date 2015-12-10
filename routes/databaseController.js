/**
 * MySQL Database Connection
 */
var mysql      = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 4,
	host     : 'us-cdbr-iron-east-02.cleardb.net',
	user     : 'b5c74b30c9b270',
	password : '585e19b7',
	port: '3306',
	database: 'ad_93db147d108675e',
	queueLimit: 0,
	waitForConnection: true
});

exports.fireQuery=function (query, callBack) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	//	console.log(query);
		connection.query(query,callBack);
		connection.release();
	});
};