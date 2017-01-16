"use strict";

var config = require('./config');
var express = require('express');
var router = express.Router();    
var postService = require('./service/blogPostService');
var bodyParser = require('body-parser');
var app = express();
var websockets = require('./service/websocketService');
var seaport = require('seaport').connect(config.seaport);
var compression = require('compression');
var http = require('http');
var log = require('./service/logFunction.js');
var service = 'HTTP SERVER';

// Set http server port to a port provided by startWebServers.js. Port range 3010-3019.

var port = seaport.register('webapp-service', { port: process.env.WEB_SERVER_PORT});

log(service, 'info', 'STARTING WEB SERVER');

app.use(bodyParser.json());

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Received request.');
    next(); // make sure we go to the next routes and don't stop here
});

// module.exports.startServer = function() {
	app.use(compression());
	app.use(express.static(__dirname + '/../'));
	app.use(bodyParser.json());

router.route('/api/posts')
	.get(function(req, res) {
		console.log("GET POSTS");
		var requestedNumberOfPosts;
		var olderThanPostId;
		/* if (message.data.olderThanPostId) {
			olderThanPostId = message.data.olderThanPostId;
		} 
		if (message.data.requestedNumberOfPosts) {
			requestedNumberOfPosts = message.data.requestedNumberOfPosts;
		}
		else { */
			requestedNumberOfPosts = 5;
		// }
		postService.findPosts(
				requestedNumberOfPosts,
				function (posts) {
					res.json(posts);
				}, olderThanPostId
			);

				/*
					app.get('/posts', function(req, res) {
						res.setHeader('content-type', 'application/json');
						var requestParameters = req.body;
						var requestedNumberOfPosts;
						var olderThanPostId;
						if (requestParameters.olderThanPostId) {
							olderThanPostId = requestParameters.olderThanPostId;
						}
						if (requestParameters.requestedNumberOfPosts) {
							requestedNumberOfPosts = requestParameters.requestedNumberOfPosts;
						}
						else {
							requestedNumberOfPosts = 5;
						}
						postService.findPosts(
							requestedNumberOfPosts,
							function (posts) {
								res.send(posts);
							}, 
							olderThanPostId
						);
					});
					*/
	})
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        /*
        var bear = new Post();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        */
    })
    .put(function(req, res) {
    	console.log("PUT POSTS");
    })
    .delete(function(req, res) {
    	console.log("DELETE POST");
    });
	
	router.route(['/', '/home'])
		.get(function(req, res) {
	    res.sendFile('./index.html' , { root : __dirname + "/../"});
	});

	app.use('/', router);
	
	var server = app.listen(8080, function () {
		log(service, 'info', 'Web server listening on port ' + port + '.' +
				' Connecting to Seaport at ' + config.seaport.host + ', port ' + config.seaport.port);
		
	});
	// websockets.connect(server);
// };
