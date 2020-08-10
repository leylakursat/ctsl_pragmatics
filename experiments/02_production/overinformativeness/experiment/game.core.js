/*  Copyright (c) 2012 Sven "FuzzYspo0N" Bergström, 
                  2013 Robert XD Hawkins
    
 written by : http://underscorediscovery.com
    written for : http://buildnewgames.com/real-time-multiplayer/
    
    substantially modified for collective behavior experiments on the web
    MIT Licensed.
*/

/*
  The main game class. This gets created on both server and
  client. Server creates one for each game that is hosted, and each
  client creates one for itself to play the game. When you set a
  variable, remember that it's only set in that instance.
*/
var has_require = typeof require !== 'undefined';

if( typeof _ === 'undefined' ) {
  if( has_require ) {
    _ = require('underscore');
    utils  = require('../../sharedUtils/sharedUtils.js');
  }
  else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

var game_core = function(options){
  // Store a flag if we are the server instance
  this.server = options.server ;
  
  // How many players in the game?
  this.players_threshold = 2;
  this.playerRoleNames = {
    role1 : 'speaker',
    role2 : 'listener'
  };
  
  //Dimensions of world in pixels and numberof cells to be divided into;
  this.numHorizontalCells = 4;
  this.numVerticalCells = 1;
  this.cellDimensions = {height : 300, width : 300}; // in pixels
  this.cellPadding = 0;
  this.world = {height : (this.cellDimensions.height * this.numVerticalCells
              + this.cellPadding),
              width : (this.cellDimensions.width * this.numHorizontalCells
              + this.cellPadding)}; 
  
  // Which round are we on (initialize at -1 so that first round is 0-indexed)
  this.roundNum = -1;

  // How many rounds do we want people to complete?
  this.numRounds = 32;

  // How many mistakes have the pair made on the current trial?
  this.attemptNum = 0;

  // This will be populated with the tangram set
  this.objects = [];
  
  if(this.server) {
    // If we're initializing the server game copy, pre-create the list of trials
    // we'll use, make a player object, and tell the player who they are
    this.id = options.id;
    this.expName = options.expName;
    this.player_count = options.player_count;
    this.trialList = this.makeTrialList();

    this.data = {
      id : this.id.slice(0,6),
      trials : [],
      catch_trials : [], system : {}, 
      subject_information : {
        gameID: this.id.slice(0,6)
      }
    // console.log("3");
    };
    this.players = [{
      id: options.player_instances[0].id,
      instance: options.player_instances[0].player,
      player: new game_player(this,options.player_instances[0].player)
    }];
    this.streams = {};
    this.server_send_update();
  } else {
    // If we're initializing a player's local game copy, create the player object
    this.players = [{
      id: null,
      instance: null,
      player: new game_player(this)
    }];
  }
};
var game_player = function( game_instance, player_instance) {
  this.instance = player_instance;
  this.game = game_instance;
  this.role = '';
  this.message = '';
  this.id = '';
}; 

// server side we set some classes to global types, so that
// we can use them in other files (specifically, game.server.js)
if('undefined' != typeof global) {
  var objectList = _.map(require('./stimuli/objectSet', _.clone)); //  create objects for each item, first item in objectList[0][0]
  module.exports = global.game_core = game_core;
  module.exports = global.game_player = game_player;
}

// HELPER FUNCTIONS

// Method to easily look up player 
game_core.prototype.get_player = function(id) {
  var result = _.find(this.players, function(e){ return e.id == id; });
  return result.player;
};

// Method to get list of players that aren't the given id
game_core.prototype.get_others = function(id) {
  var otherPlayersList = _.filter(this.players, function(e){ return e.id != id; });
  var noEmptiesList = _.map(otherPlayersList, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Returns all players
game_core.prototype.get_active_players = function() {
  var noEmptiesList = _.map(this.players, function(p){return p.player ? p : null;});
  return _.without(noEmptiesList, null);
};

// Advance to the next round
game_core.prototype.newRound = function() {
  if(this.roundNum == this.numRounds - 1) {
    // If you've reached the planned number of rounds, end the game
    var local_game = this;
    _.map(local_game.get_active_players(), function(p){
      p.player.instance.disconnect();
    });
  } else {
    // Otherwise, get the preset list of tangrams for the new round
    this.roundNum += 1;
    console.log("now on round " + (this.roundNum + 1));
    this.objects = this.trialList[this.roundNum];
    this.server_send_update();
  }
};

game_core.prototype.makeTrialList = function () {
  local_this = this,
  trialList = [],
  targetPos = 0;
  randomObjectList = [objectList[0]];

  for (var i = 0; i < randomObjectList[0].length; i++) {
    var objList = sampleObjects(targetPos); // should return 4 objects (critical trials)
    targetPos++;
    var locs = sampleStimulusLocs(objList);
    trialList.push(_.map(_.zip(objList, locs.speaker, locs.listener), function (tuple) {
      var speakerGridCell = local_this.getPixelFromCell(tuple[1][0], tuple[1][1]);
      var listenerGridCell = local_this.getPixelFromCell(tuple[2][0], tuple[2][1]);
      return addCellInfoToObj(tuple, speakerGridCell, listenerGridCell);
    }));
  };

  trialList = _.shuffle(trialList);
  console.log("trialList Length ", trialList.length);
  return (trialList);
};

game_core.prototype.server_send_update = function(){
  //Make a snapshot of the current state, for updating the clients
  var local_game = this;
  
  // Add info about all players
  var player_packet = _.map(local_game.players, function(p){
    return {id: p.id,
            player: null};
  });

  var state = {
    gs : this.game_started,   // true when game's started
    pt : this.players_threshold,
    pc : this.player_count,
    dataObj  : this.data,
    roundNum : this.roundNum,
    objects: this.objects
  };

  _.extend(state, {players: player_packet});
  _.extend(state, {instructions: this.instructions});
  if(player_packet.length == 2) {
    _.extend(state, {objects: this.objects});
  }

  //Send the snapshot to the players
  this.state = state;
  _.map(local_game.get_active_players(), function(p){
    p.player.instance.emit( 'onserverupdate', state);});
};

// gets called as many times as object number and returns object quadruplets to be displayed
var sampleObjects = function(targetPos) {
  var target = randomObjectList[0][targetPos]
  target.targetStatus = "target";

  var distractors = sampleDistractors(target); // returns three objects

  
  return [target].concat(distractors);
};

var sampleDistractors = function(target) {
  var distractorList = _.map(require('./stimuli/distractorSet', _.clone)); 
  var competitors = []
  var not_competitors = [];

  if (target.condition == 'high_difficulty') { // high difficulty --> yes to material
    var sufficient = 'color';
    var overinformative = 'material';
  } else if  (target.condition == 'low_difficulty') { // low difficulty --> yes to color
    var sufficient = 'material';
    var overinformative = 'color';
  }
  
  for (var i = 0; i < (distractorList.length); i++) {
    if ((distractorList[i].item === target.item) && ((distractorList[i][sufficient]) !== target[sufficient]) && ((distractorList[i][overinformative]) === target[overinformative])) {
      competitors.push(distractorList[i]) // array with possible competitors to the item (different sufficient same overinformative with target)
    } if ((distractorList[i].item === target.item) && ((distractorList[i][sufficient]) !== target[sufficient]) && ((distractorList[i][overinformative]) !== target[overinformative])) {
      not_competitors.push(distractorList[i]) // array with possible not_competitors to the item (same sufficient different overinformative with competitor )
    } 
  }  

  var distractorSufficient = [];
  for (var i = 0; i<not_competitors.length; i++) {
    for (var j = 0; j<competitors.length; j++) {
      if (not_competitors[i][sufficient] === competitors[j][sufficient]) {
        distractorSufficient.push(competitors[j][sufficient]) // array with possible sufficient feature options for distractor
      }  
    }
  }

  var uniqueSuff  = distractorSufficient.filter((value, index) => distractorSufficient.indexOf(value) === index)
  distractorSufficient = uniqueSuff[Math.floor(Math.random() * uniqueSuff.length)]; // pick random sufficient feature from list
  
  var possibleComp = [];
  var possibleNotComp = [];

  for (var i = 0; i < (competitors.length); i++) {
    if (competitors[i][sufficient] == distractorSufficient) {
      possibleComp.push(competitors[i]) // array with possible competitors in the selected sufficient
    }  
  }  for (var i = 0; i < (not_competitors.length); i++) {
    if (not_competitors[i][sufficient] == distractorSufficient) {
      possibleNotComp.push(not_competitors[i])  // array with possible non-competitors in the selected sufficient
    }  
  } 

  possibleComp = _.shuffle(possibleComp)
  possibleNotComp = _.shuffle(possibleNotComp)
  possibleComp = possibleComp.slice(0,1); // 1 competitor distractos
  possibleComp.targetStatus = "competitor"; // NEW CHANGE

  possibleNotComp = possibleNotComp.slice(0,1); // 1 non-competitor distractor
  possibleNotComp.targetStatus = "distractor";

  possibleNotComp = possibleNotComp.concat(possibleNotComp) // 1 more non-competitor distractor (same one)

  distractors = possibleNotComp.concat(possibleComp); // 3 distractors total

  for (var i = 0; i < (distractors.length); i++) {
    distractors[i].targetStatus = "distractor";
  }
   return distractors;
};


// Util functions

var addCellInfoToObj = function(tuple, speakerGridCell, listenerGridCell) {
  var object = _.clone(tuple[0]);
  object.speakerCoords = {
    gridX : tuple[1][0],
    gridY : tuple[1][1],
    trueX : speakerGridCell.centerX - object.width/2,
    trueY : speakerGridCell.centerY - object.height/2,
    gridPixelX: speakerGridCell.centerX - 150,
    gridPixelY: speakerGridCell.centerY - 150
  };
  object.listenerCoords = {
    gridX : tuple[2][0],
    gridY : tuple[2][1],
    trueX : listenerGridCell.centerX - object.width/2,
    trueY : listenerGridCell.centerY - object.height/2,
    gridPixelX: listenerGridCell.centerX - 150,
    gridPixelY: listenerGridCell.centerY - 150
  };
  return object;
};

var sampleStimulusLocs = function(objList) {
  var minX = objList.length === 3 ? 2 : 1;
  var maxX = objList.length === 5 ? 5 : 4;
  var locs = _.map(_.range(minX, maxX + 1), function(i) {return [i, 1]; });
  return {listener : _.shuffle(locs), speaker : _.shuffle(locs)};
};

var firstClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.basiclevel === x.basiclevel;
  }));
};

var secondClassSelector = function(target, list) {
  return _.sample(_.filter(list, function(x) {
    return target.superdomain === x.superdomain;
  }));
};

var thirdClassSelector = function(target, list) {
  return _.extend(_.sample(list),{targetStatus : "distrClass3"});
};

// maps a grid location to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getPixelFromCell = function (x, y) {
  return {
    centerX: (this.cellPadding/2 + this.cellDimensions.width * (x - 1)
        + this.cellDimensions.width / 2),
    centerY: (this.cellPadding/2 + this.cellDimensions.height * (y - 1)
        + this.cellDimensions.height / 2),
    upperLeftX : (this.cellDimensions.width * (x - 1) + this.cellPadding/2),
    upperLeftY : (this.cellDimensions.height * (y - 1) + this.cellPadding/2),
    width: this.cellDimensions.width,
    height: this.cellDimensions.height
  };
};

// maps a raw pixel coordinate to to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getCellFromPixel = function (mx, my) {
  var cellX = Math.floor((mx - this.cellPadding / 2) / this.cellDimensions.width) + 1;
  var cellY = Math.floor((my - this.cellPadding / 2) / this.cellDimensions.height) + 1;
  return [cellX, cellY];
};

game_core.prototype.getTangramFromCell = function (gridX, gridY) {
  for (i=0; i < this.objects.length; i++) {
    if (this.objects[i].gridX == gridX && this.objects[i].gridY == gridY) {
      var tangram = this.objects[i];
      var tangramIndex = i;
      // return tangram;
      return i;
    }
  }
  console.log("Did not find tangram from cell!")
}

// readjusts trueX and trueY values based on the objLocation and width and height of image (objImage)
game_core.prototype.getTrueCoords = function (coord, objLocation, objImage) {
  var trueX = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerX - objImage.width/2;
  var trueY = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerY - objImage.height/2;
  if (coord == "xCoord") {
    return trueX;
  }
  if (coord == "yCoord") {
    return trueY;
  }
};

