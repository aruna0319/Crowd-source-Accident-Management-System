
/*
 * GET home page.
 */
var Pusher = require('pusher');
var ejs = require('ejs');
var moment = require('moment');
var dbObject = require('./databaseController');

var pusher = new Pusher({
	appId: '119285',
	key: '379bfc578ad712a7784e',
	secret: 'ad203622556cbdb0f272'
});


exports.index = function(request, response) {

	var cartDetails = "SELECT * FROM ad_93db147d108675e.feeds;";

	dbObject.fireQuery(cartDetails, function(err, results) {
		if (err) {
			response.send("<script>{ if(!alert('Unable to fetch notifications!! Be in offline mode')) document.location = '/';}</script>Unable to fetch notifications!! Be in offline mode <a href='/'>Unable to fetch notifications!! Be in offline mode</a>!.");
		} else {
			note = results;
			ejs.renderFile("./views/index.ejs", {
				message: "",
				note: note
			}, function(err, res) {
				if (err) {
					console.log(err);
				}

				response.end(res);
			});

		}

	});
};

exports.client = function(req, res){
	res.render('client', { title: 'client' });
};

exports.open = function(req, res){
	res.render('open', { title: 'open' });
};

exports.weather = function(req, res){
	res.render('weather', { title: 'weather' });
};

exports.analysis = function(req, res){
	res.render('analysis', { title: 'analysis' });
};

exports.calender = function(req, res){
	res.render('calender', { title: 'calender' });
};

exports.heatmap = function(req, res){
	res.render('heatmap', { title: 'heatmap' });
};

exports.chartjs = function(req, res){
	res.render('chartjs', { title: 'chartjs' });
};

exports.levels = function(req, res){
	res.render('levels', { title: 'levels' });
};

exports.morris = function(req, res){
	res.render('morris', { title: 'morris' });
};

exports.todo = function(req, res){
	res.render('todo', { title: 'todo' });
};

exports.lock_screen = function(req, res){
	res.render('lock_screen', { title: 'lock_screen' });
};

exports.login = function(req, res){
	res.render('login', { title: 'login' });
};

exports.logout = function(req, res){
	res.render('open', { title: 'open' });
};

//exports.help = function(req, res){
//	res.render('help', { title: 'help' });
//};

exports.signin = function(req, res) {

	var email = req.param("uname");
	console.log("test1"+email)
	var password = req.param("upass");
	console.log("pass"+password)
	if (email === "" || password === "") {
		res.send("<script>{ if(!alert('Fields cannot be Empty')) document.location = '/signin';}</script>Email or Password cannot be Empty Click to <a href='/signin'>Signin Again with valid Credientials</a>!.");
	}


	var checkLogin = "SELECT * FROM `ad_93db147d108675e`.`users` WHERE uname='" + email + "' AND upass = '" + password + "';";
	console.log(checkLogin);
	
	dbObject.fireQuery(checkLogin, function(err, person) {
		if (err) {
			res.send("<script>{ if(!alert('Database Tampered\nYou Logged in Successfully')) document.location = '/login';}</script>Not Logged successfully!! Click to <a href='/signin'>Go User HOME</a>!.");
			} else {
				if (email === "admin" || password === "admin"){
					ejs.renderFile("./views/index.ejs", {message:"",name:email}, function(err, response){
						if(err){
							console.log(err);
						}
						res.end(response);
					});
				}else{
				ejs.renderFile("./views/client.ejs", {message:"",name:email}, function(err, response){
					if(err){
						console.log(err);
					}
					res.end(response);
				});
				}
			}
	});
};




exports.send = function(req, res){
	if (req === null) {
		res.send("<script>{ if(!alert('Please send alert request again!!')) document.location = '/client';}</script>Please send alert request again!! Click to <a href='/client'>Please send alert request again!!</a>!.");
	} else {
		var posi = req.param("posi");
		//console.log(posi);
		var coords = posi.split(",");
		var latitutde = coords[0];
		var longitude = coords[1];
		var msg = req.param("msg");
		var name= req.param("name");

		if(latitutde==="" || longitude==="" || msg===""){
			res.send("<script>{ if(!alert('Please travel to Earth from Mars!!')) document.location = '/client';}</script>Please travel to Earth from Mars!! Click to <a href='/client'>Please travel to Earth from Mars!!</a>!.");
		}
		else
		{
			pusher.trigger('test_channel', 'my_event', {
				"message": latitutde+":"+longitude+":"+msg+":"+name
			});
			//var randomnumber=Math.floor(Math.random()*1001);
			var datetime=moment().format('MMMM Do YYYY, h:mm:ss a');
			var registerQuery = "INSERT INTO `ad_93db147d108675e`.`feeds` (`lat`, `long`, `msg`, `sender`, `time`) VALUES ('" + latitutde + "','" + longitude + "','" + msg + "','" + name + "','" + datetime + "');";

			dbObject.fireQuery(registerQuery, function(err, result) {

				if (err) {
					console.log("mysql error: "+err);
					res.send("<script>{ if(!alert('Cannot be recorded in to the central database!! Try Again')) document.location = '/index';}</script>Cannot be recorded in to the central database!! <a href='/index'>Try Again</a>!.");
				} else {

					//ejs.renderFile("./views/client.ejs", {message:"",title: 'send',latitutde:latitutde,longitude:longitude,msg:msg,name:name}, function(err, response){
					//ejs.renderFile("./views/client.ejs", {message:"",title:'Crowd Sourced'}, function(err, response){	
					res.send("<script>{ if(!alert('Successfully Alerted!! Thank You')) document.location = '/client';}</script>Successfully Alerted!! Thank You <a href='/client'>Thank You</a>!.");
					//if(err){
					//		console.log(err);
						//}
						//res.end(response);
					//});
				}
			});
		}
	}
};

exports.readData = function(request, response) {

	var cartDetails = "SELECT * FROM (SELECT * FROM ad_93db147d108675e.feeds ORDER BY idfeeds DESC LIMIT 10) sub ORDER BY idfeeds DESC;";

	dbObject.fireQuery(cartDetails, function(err, results) {
		if (err) {
			response.send("db error");
		} else {
			var note = results;
			var data = JSON.stringify(note);
			console.log(data);
			response.writeHead(200, {'Content-Type' : 'x-application/json'});
			response.write(data);
			response.end();
		}

	});
};

exports.reports =function(request, response) {
	var list;
	var querys = 'SELECT * FROM ad_93db147d108675e.feeds;';
		dbObject.fireQuery(querys, function(err, pRows){
			if(err)
			{
				ejs.renderFile("./views/index.ejs", {message:"Database is down"}, function(err, res){
					if(err){
						console.log(err);
					}
					response.end(res);
				});
			}
			else
			{
				list=pRows;
				ejs.renderFile("./views/reports.ejs", {message:"data is in",item:list}, function(err, res){
					console.log(list);
					response.end(res);
				});
			}
		});
	};

