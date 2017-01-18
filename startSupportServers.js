"use strict";

// Starts Seaport server, user authentication server and
// proxy server. Start with CLI command: forever startSupportServers.js.

var config = require('./server/config');
var spawn = require('child_process').exec;
var os = require('os');
var redis = require('./server/service/redisService');
var log = require('./server/service/logFunction.js');
var service = 'SUPPORT SERVERS START SCRIPT';
var seaport = require('seaport').connect(config.seaport);

console.log("\n*** STARTING SUPPORT SERVERS ***");

// SEAPORT SERVER STARTUP

var spawnSeaport = function() {
    return spawn("seaport listen " + config.seaport.port, function(error) {
        if (error) {
            log(service, 'error', 'SEAPORT: ' + error);
        }
        log('error', "SEAPORT EXITED WHEN SPAWNING INSTANCE");
    });

}
var startSeaportServer = function() {
    log('info', '*** STARTING SEAPORT SERVER ***');
    var seaport_child = spawnSeaport();
    seaport_child.stdout.on('data', function (data) {
        log(service, 'info', 'SEAPORT: ' + data);
    });
    seaport_child.stderr.on('data', function (data) {
        log(service, 'error', 'SEAPORT ERROR: ' + data);
    });
    seaport_child.on('close', function(code) {
        console.log(code);
        log(service, 'info', 'SEAPORT EXITED WITH CODE: ' + code);
        exit(1);
    });
};

// USER AUTHENTICATION SERVER STARTUP

var startUserAuthServer = function() {
    log('info', '*** STARTING USER AUTHENTICATION SERVER ***');
    var userAuthServer_child = spawn("forever --minUptime 1000 --spinSleepTime 1000 server/userAuthServer.js localhost", function(error) {
        if (error) {
            log(service, 'error', 'USER-AUTH-SERVER ERROR: ' + error);

        }
        log(service, 'info', "USER-AUTH-SERVER EXITED");
    });
     userAuthServer_child.stderr.on('data', function (data) {
        console.log(data);
        log(service, 'error', 'USER-AUTH-SERVER ERROR: ' + data);
    });
        
          userAuthServer_child.stdout.on('data', function (data) {
        console.log(data);
        
    });
    userAuthServer_child.on('close', function(code) {
        log(service, 'info', 'USER-AUTH-SERVER EXITED WITH CODE: ' + code);
        startUserAuthServer();
    });
}


// LOG SERVICE STARTUP

var startLogService = function() {
    var logger_child = spawn("forever --minUptime 1000 --spinSleepTime 1000 server/service/logService.js", function(error) {
        if (error) {
            console.error("!!!! LOGGER ERROR: " + error);
        }
        console.log("LOGGER EXITED");
    });
    logger_child.stdout.on('data', function (data) {
        console.log(data);
    });
    logger_child.stderr.on('data', function (data) {
        console.log(data);
    });
    logger_child.on('close', function(code) {
        console.log("!!!! LOGGER EXITED WITH CODE: " + code);
        startLogService();
    }); 
};

// START SERVERS AND SERVICES

startLogService();
startSeaportServer();
startUserAuthServer();

console.log("\nSUPPORT SERVERS STARTED!");