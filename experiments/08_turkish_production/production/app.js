/*  Copyright (c) 2012 Sven "FuzzYspo0N" Bergström, 2013 Robert XD Hawkins

    originally written for: http://buildnewgames.com/real-time-multiplayer/
    
    substantially modified for collective behavior experiments 

    MIT Licensed.
*/

var
  use_https = true,
  gameport = 8882, // check which ports are in use with 'ss -tulw'
  https = require('https'),
  fs = require('fs'),
  app = require('express')(),
  _ = require('underscore');

try {
  // var privateKey  = fs.readFileSync('/etc/apache2/ssl/private.key'),
  //     certificate = fs.readFileSync('/etc/apache2/ssl/ssl.crt'),
  //     options     = {key: privateKey, cert: certificate},
  // var privateKey  = fs.readFileSync('/etc/apache2/ssl/rxdhawkins.me.key'),
  //     certificate = fs.readFileSync('/etc/apache2/ssl/rxdhawkins.me.crt'),
  //     intermed    = fs.readFileSync('/etc/apache2/ssl/intermediate.crt'),
  //     options     = {key: privateKey, cert: certificate, ca: intermed},
  //     server      = require('https').createServer(options,app).listen(gameport),
  //     io          = require('socket.io')(server);

  var privateKey = fs.readFileSync('/etc/apache2/ssl/stanford-cogsci.org.key'),
    certificate = fs.readFileSync('/etc/apache2/ssl/stanford-cogsci.org.crt'),
    options = { key: privateKey, cert: certificate },
    server = require('https').createServer(options, app).listen(gameport),
    io = require('socket.io')(server);
} catch (err) {
  console.log("cannot find SSL certificates; falling back to http");
  var server = app.listen(gameport),
    io = require('socket.io')(server);
}
console.log(process.argv)

if (process.argv[2]) {
  var exp = process.argv[2];
  var gameServer = require('./sharedUtils/serverBase.js')(exp);
} else {
  throw new ("no experiment supplied");
}

var utils = require('./sharedUtils/sharedUtils.js');

var global_player_set = {};

// Log something so we know that server-side setup succeeded
console.log("info  - socket.io started");
console.log('\t :: Express :: Listening on port ' + gameport);

//  This handler will listen for requests on /*, any file from the
//  root of our server. See expressjs documentation for more info 
app.get('/*', function (req, res) {
  // this is the current file they have requested
  var file = req.params[0];
  if (req.query.workerId && !valid_id(req.query.workerId)) {
    console.log("invalid id: blocking request");
    // res.redirect('https://rxdhawkins.me:8889/sharedUtils/invalid.html');
    res.redirect('https://stanford-cogsci.org:8882/main/experiment/forms/invalid.html');
  } else if (req.query.wo0rkerId && req.query.workerId in global_player_set) {
    console.log("duplicate id: will not block during testing");
    // delete what's below when not testing
    console.log('\t :: Express :: file requested: ' + file);
    if (req.query.workerId) {
      console.log(" by workerID " + req.query.workerId);
    }
    res.sendfile("./" + file); // give them what they want
    console.log("file: ", file);

    console.log("duplicate id: blocking request");
    res.redirect('https://stanford-cogsci.org:8882/main/experiment/forms/duplicate.html');
    // res.redirect('https://rxdhawkins.me:8889/sharedUtils/duplicate.html');
  } else {
    console.log('\t :: Express :: file requested: ' + file);
    if (req.query.workerId) {
      console.log(" by workerID " + req.query.workerId);
    }
    res.sendfile("./" + file); // give them what they want
  }
});

// Socket.io will call this function when a client connects. We check
// to see if the client supplied a id. If so, we distinguish them by
// that, otherwise we assign them one at random
io.on('connection', function (client) {
  // Recover query string information and set condition
  var hs = client.request;
  console.log(hs.headers);
  var query = require('url').parse(hs.headers.referer, true).query;
  var id;
  if (!(query.workerId && query.workerId in global_player_set)) {
    if (query.workerId) {
      global_player_set[query.workerId] = true;
      // useid from query string if exists
      id = query.workerId;
    } else {
      id = utils.UUID();
    }
    if (valid_id(id)) {
      initialize(query, client, id);
    }
  }
});


var valid_id = function (id) {
  return (id.length <= 15 && id.length >= 12) || id.length == 41;
};

var initialize = function (query, client, id) {
  client.userid = id;
  client.emit('onconnected', { id: client.userid});

  // Good to know when they connected
  console.log('\t socket.io:: player ' + client.userid + ' connected');

  //Pass off to game.server".js code
  // console.log("TEST order type: ", query.order_type)
  // console.log("TEST last round: ", query.last_round)

  gameServer.findGame(query, client);

  // Now we want set up some callbacks to handle messages that clients will send.
  // We'll just pass messages off to the server_onMessage function for now.
  client.on('message', function (m) {
    gameServer.onMessage(client, m);
  });

  // When this client disconnects, we want to tell the game server
  // about that as well, so it can remove them from the game they are
  // in, and make sure the other player knows that they left and so on.
  client.on('disconnect', function () {
    console.log('\t socket.io:: client id ' + client.userid
      + ' disconnected from game id ' + client.game.id);

    //If the client was in a game set by gameServer.findGame,
    //we can tell the game server to update that game state.
    if (client.userid && client.game && client.game.id)
      //player leaving a game should change that game
      gameServer.endGame(client.game.id, client.userid);
  });
};

