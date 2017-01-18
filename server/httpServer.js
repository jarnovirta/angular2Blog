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
var userService = require('./service/userService');
var service = 'HTTP SERVER';



// Set http server port to a port provided by startWebServers.js. Port range 3010-3019.

var port = seaport.register('webapp-service', { port: process.env.WEB_SERVER_PORT});

log(service, 'info', 'STARTING WEB SERVER');

app.use(bodyParser.json());

module.exports.startServer = function() {
	app.use(compression());
	app.use(express.static(__dirname + '/../'));
	app.use(bodyParser.json());

router.route('/api/posts')
	.get(function(req, res) {
		var requestedNumberOfPosts;
		 var olderThanPostId;
		/* if (message.data.olderThanPostId) {
			olderThanPostId = message.data.olderThanPostId;
		} 
		if (message.data.requestedNumberOfPosts) {
			requestedNumberOfPosts = message.data.requestedNumberOfPosts;
		}
		else { */
		//	requestedNumberOfPosts = 5;
		// }
		postService.findAll(function (posts) {
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
    .post(function(req, res) {
    	console.log("AUTH TOKEN " + req.body.authToken);
    	userService.verifyAuthentication(req.body.authToken).then(function(isAuthenticated) {	
    		if (isAuthenticated) {
				postService.create(req.body.post, function (createdPost, err) {
					if (err) {
						console.log("Database error");
						res.writeHead(500, {'Content-Type': 'text/plain' });
	     				res.end('Internal server error');
					}
					else {
						res.status(200);
						res.json(createdPost);
					}
				});
			}
			else {
				res.writeHead(401, {'Content-Type': 'text/plain' });
	     		res.end('Unauthorized');
			}
		});
	})
        
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
    
    .put(function(req, res) {
    	console.log("PUT POSTS");
    });

	

router.route('/api/posts/:id') 
	.get(function(req, res) {
		postService.findPostById(req.params.id, function(foundPost) {
			res.json(foundPost);
		});
	})
	.delete(function(req, res) {
		console.log("Received header");
		console.log(req.get('x-authtoken'));
    	userService.verifyAuthentication(req.get('x-authtoken')).then(function(isAuthenticated) {	
    		if (isAuthenticated) {
				postService.delete(req.params.id, function () {
					res.sendStatus(200);
				});
			}
			else {
				res.sendStatus(401);
			}
		});
	});
	
        
  router.route('/api/comments')
	.post(function(req, res) {
		var newComment = req.body;
		postService.findPostById(newComment.postId, function(dbPost) {
				if (dbPost.comments) {
					dbPost.comments.splice(0, 0, newComment);
				}
				else {
					dbPost.comments = [newComment];
				}
				postService.save(dbPost, function(savedPost) {
						res.send(savedPost.comments[0]);
					});
			});
	});
router.route('/api/comments/:id')
	.delete(function(req, res) {
		postService.deleteComment(req.params.id, function(err) {
			if (err) {
				console.log("Database error: " + err)
				res.sendStatus(500);
			}
			else res.sendStatus(200);
		});
	});

router.route(['/*'])
	.get(function(req, res) {
    res.sendFile('./index.html' , { root : __dirname + "/../"});
});

app.use('/', router);

var server = app.listen(port, function () {
	log(service, 'info', 'Web server listening on port ' + port + '.' +
			' Connecting to Seaport at ' + config.seaport.host + ', port ' + config.seaport.port);
	
});
// websockets.connect(server);
}