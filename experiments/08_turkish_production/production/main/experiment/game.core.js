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

if (typeof _ === 'undefined') {
  if (has_require) {
    _ = require('underscore');
    utils = require('../../sharedUtils/sharedUtils.js');
  }
  else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

var game_core = function (options) {
  //console.log('OPTIONS game_core', options)

  // Store a flag if we are the server instance
  this.server = options.server;

  // How many players in the game?
  this.players_threshold = 2;
  this.playerRoleNames = {
    role1: 'speaker',
    role2: 'listener'
  };

  //Dimensions of world in pixels and numberof cells to be divided into;
  this.numHorizontalCells = 4;
  this.numVerticalCells = 1;
  this.cellDimensions = { height: 300, width: 300 }; // in pixels
  this.cellPadding = 0;
  this.world = {
    height: (this.cellDimensions.height * this.numVerticalCells
      + this.cellPadding),
    width: (this.cellDimensions.width * this.numHorizontalCells
      + this.cellPadding)
  };

  // Which round are we on (initialize at -1 so that first round is 0-indexed)
  this.roundNum = -1;

  // How many rounds do we want people to complete?
  this.numRounds = 60; // 5 practice + 30 overinformativeness + 15 adj ordering + 10 filler

  // How many mistakes have the pair made on the current trial?
  this.attemptNum = 0;

  // This will be populated with the tangram set
  this.objects = [];

  if (this.server) {
    // If we're initializing the server game copy, pre-create the list of trials
    // we'll use, make a player object, and tell the player who they are
    this.id = options.id;
    this.expName = options.expName;
    this.player_count = options.player_count;
    //this.order_type = options.order_type
    //this.last_round = options.last_round

    // this was for ctsl (to start experiment from saved trial order)
    // console.log('Order_type =>>>> ',this.order_type)
    // if(this.order_type == 'random_order')
    //   this.trialList = this.makeTrialList(); // to create a new trial order
    // else if (this.order_type == 'last_order') {
    //   this.trialList = this.restoreTrialList(); // if we want to restore the same order as last time
    //   this.roundNum = (this.last_round)-3;
    //   console.log("CHANGED ROUND NUM: ", this.roundNum)
    // }

    this.trialList = this.makeTrialList(); // to create a new trial order

    this.data = {
      id: this.id.slice(0, 6),
      trials: [],
      catch_trials: [], system: {},
      subject_information: {
        gameID: this.id.slice(0, 6)
      }
    };
    this.players = [{
      id: options.player_instances[0].id,
      instance: options.player_instances[0].player,
      player: new game_player(this, options.player_instances[0].player)
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
var game_player = function (game_instance, player_instance) {
  this.instance = player_instance;
  this.game = game_instance;
  this.role = '';
  this.message = '';
  this.id = '';
};

// server side we set some classes to global types, so that
// we can use them in other files (specifically, game.server.js)
if ('undefined' != typeof global) {
  var objectList = _.map(require('./stimuli/itemSet', _.clone));
  var fillerList = _.map(require('./stimuli/fillerSet', _.clone));
  module.exports = global.game_core = game_core;
  module.exports = global.game_player = game_player;
}

// HELPER FUNCTIONS

// Method to easily look up player 
game_core.prototype.get_player = function (id) {
  var result = _.find(this.players, function (e) { return e.id == id; });
  return result.player;
};

// Method to get list of players that aren't the given id
game_core.prototype.get_others = function (id) {
  var otherPlayersList = _.filter(this.players, function (e) { return e.id != id; });
  var noEmptiesList = _.map(otherPlayersList, function (p) { return p.player ? p : null; });
  return _.without(noEmptiesList, null);
};

// Returns all players
game_core.prototype.get_active_players = function () {
  var noEmptiesList = _.map(this.players, function (p) { return p.player ? p : null; });
  return _.without(noEmptiesList, null);
};

// Advance to the next round
game_core.prototype.newRound = function () {
  if (this.roundNum == this.numRounds - 1) {
    // If you've reached the planned number of rounds, end the game
    var local_game = this;
    _.map(local_game.get_active_players(), function (p) {
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
    fillerTrialList = [],
    numOverinformative = 0;

  for (var i = 0; i < objectList.length; i++) { // for each object in objectSet
    const data = objectList[i];
    addCondition(data, numOverinformative);
    if (data.trial_type == "overinformativeness")
      numOverinformative++;
    var objList = sampleObjects(data); // should return 4 objects (critical trials)
    var locs = sampleStimulusLocs(objList);
    trialList.push(_.map(_.zip(objList, locs.speaker, locs.listener), function (tuple) {
      var speakerGridCell = local_this.getPixelFromCell(tuple[1][0], tuple[1][1]);
      var listenerGridCell = local_this.getPixelFromCell(tuple[2][0], tuple[2][1]);
      return addCellInfoToObj(tuple, speakerGridCell, listenerGridCell);
    }));
  };

  for (var i = 0; i < fillerList.length; i++) {    // if you change the number of filler items also change condition in fillerSet.js
    const fillerdata = fillerList[i]
    addCondition(fillerdata);
    var fillerobjList = sampleObjects(fillerdata); // should return 4 objects (critical trials)
    var locs = sampleStimulusLocs(fillerobjList);
    fillerTrialList.push(_.map(_.zip(fillerobjList, locs.speaker, locs.listener), function (tuple) {
      var speakerGridCell = local_this.getPixelFromCell(tuple[1][0], tuple[1][1]);
      var listenerGridCell = local_this.getPixelFromCell(tuple[2][0], tuple[2][1]);
      return addCellInfoToObj(tuple, speakerGridCell, listenerGridCell);
    }));
  };

  trialList = _.shuffle(trialList);
  var practiceList = fillerTrialList.slice(0, 5);
  console.log("practice list: ", practiceList.length)
  var fillerRest = fillerTrialList.slice(5, 15)
  console.log("rest of fillers: ", fillerRest.length)
  var notPractice = _.shuffle(trialList.concat(fillerRest));
  console.log("non-practice: ", notPractice.length)
  var allTrials = practiceList.concat(notPractice);

  console.log("alltrialList Length ", allTrials.length);

  // save trial order as json object
  const fs = require('fs');
  // stringify JSON Object
  var jsonContent = JSON.stringify(allTrials);

  fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });

  return (allTrials);
};


game_core.prototype.restoreTrialList = function () {
  const fs = require('fs');

  let rawdata = fs.readFileSync('output.json');
  let allTrials = JSON.parse(rawdata);

  console.log('JSON is parsed, last order is restored');
  return (allTrials);

};

game_core.prototype.server_send_update = function () {
  //Make a snapshot of the current state, for updating the clients
  var local_game = this;

  // Add info about all players
  var player_packet = _.map(local_game.players, function (p) {
    return {
      id: p.id,
      player: null
    };
  });

  var state = {
    gs: this.game_started,   // true when game's started
    pt: this.players_threshold,
    pc: this.player_count,
    dataObj: this.data,
    roundNum: this.roundNum,
    objects: this.objects
  };

  _.extend(state, { players: player_packet });
  _.extend(state, { instructions: this.instructions });
  if (player_packet.length == 2) {
    _.extend(state, { objects: this.objects });
  }

  //Send the snapshot to the players
  this.state = state;
  _.map(local_game.get_active_players(), function (p) {
    p.player.instance.emit('onserverupdate', state);
  });
};

var addCondition = function (data, numOverinformative) {
  if (data.trial_type == "adjective_ordering") {
    data.condition = 'none'
  }
  else if (data.trial_type == "overinformativeness") {
    //console.log("numOverinformative: ",numOverinformative);
    if (numOverinformative < 16) {
      data.condition = 'size_sufficient'
    }
    else {
      data.condition = 'color_sufficient'
    }
  }
  else if (data.trial_type == "filler") {
    data.condition = 'none'
  }
};

// gets called as many times as object number and returns object quadruplets to be displayed
var sampleObjects = function (data) {
  var distractors = [];
  var target = {
    targetStatus: 'target',
    trial_type: data.trial_type,
    condition: data.condition,
    width: 250,
    height: 250
  };

  var numArray = _.shuffle([0, 1, 2, 3]);
  if (data.trial_type == "filler") { // in filler displays, target is always the first image
    var targetIndex = 0;
  } else {
    var targetIndex = numArray.pop();

  }
  var targetImage = data.images[targetIndex]

  target.label = targetImage['label']
  target.adj1 = targetImage['adj1']
  target.adj2 = targetImage['adj2']
  target.url = 'stimuli/' + target.label + '.png'


  if (target.trial_type == "adjective_ordering") {
    distractors = adjOrdDistractors(data, targetIndex);
  }
  else if (target.trial_type == "overinformativeness") {
    distractors = chooseOverinformativeDistractors(target, data);
  } else if (target.trial_type == "filler") {
    distractors = adjOrdDistractors(data, targetIndex);
  }

  // console.log("TARGET: ", target)
  // console.log("DISTRACTORS: ", distractors)
  // console.log("*****************************************************")

  return [target].concat(distractors);
};

var adjOrdDistractors = function (data, targetIndex) {
  let distractors = [];

  for (var i = 0; i < 4; i++) {
    if (i !== targetIndex) {
      let distractorItem = {
        width: 250,
        height: 250
      };
      var distractorImage = data.images[i]
      distractorItem.targetStatus = 'distractor'
      distractorItem.trial_type = data.trial_type
      distractorItem.condition = data.condition
      distractorItem.label = distractorImage['label']
      distractorItem.adj1 = distractorImage['adj1']
      distractorItem.adj2 = distractorImage['adj2']
      distractorItem.url = 'stimuli/' + distractorItem.label + '.png'
      distractors.push(distractorItem)
    }
  }
  return distractors;
}

var chooseOverinformativeDistractors = function (target, data) {
  // adj1: size, adj2: color
  if (target.condition == 'size_sufficient') {
    // distractors must be of different adj1 as target & repeating distractor must have same adj2 as target
    return getOverinformativeDistractors(target, data, 'adj1', 'adj2')
  } else if (target.condition == 'color_sufficient') {
    // distractors must be of different adj2 as target & repeating distractor must have same adj1 as target
    return getOverinformativeDistractors(target, data, 'adj2', 'adj1')
  }
}

var getOverinformativeDistractors = function (target, data, sufficientAdj, nonSufficientAdj) {
  var distractors = []
  // sufficient adj should be different than target sufficient adj value
  const diffSufficientAdjDistractor = data.images.filter(function (image) {
    if (image[sufficientAdj] !== target[sufficientAdj]) {
      return true;
    }
  })
  distractors = distractors.concat(diffSufficientAdjDistractor)
  // from the list diffSufficientAdjDistractor, pick the distiractor with the same non sufficient adj
  const sameNonSufficientAdjDistractor = diffSufficientAdjDistractor.filter(function (image) {
    if (image[nonSufficientAdj] === target[nonSufficientAdj]) {
      return true;
    }
  });

  for (i = 0; i < distractors.length; i++) {
    distractors[i].targetStatus = 'distractor'
    distractors[i].trial_type = target.trial_type
    distractors[i].condition = target.condition
    distractors[i].width = 250,
      distractors[i].height = 250,
      // distractors[i].label = distractorImage['label']
      // distractors[i].adj1 = distractorImage['adj1']
      // distractors[i].adj2 = distractorImage['adj2']
      distractors[i].url = 'stimuli/' + distractors[i].label + '.png'
  }
  return distractors.concat(sameNonSufficientAdjDistractor)
}

// Util functions
var addCellInfoToObj = function (tuple, speakerGridCell, listenerGridCell) {
  var object = _.clone(tuple[0]);
  object.speakerCoords = {
    gridX: tuple[1][0],
    gridY: tuple[1][1],
    trueX: speakerGridCell.centerX - object.width / 2,
    trueY: speakerGridCell.centerY - object.height / 2,
    gridPixelX: speakerGridCell.centerX - 150,
    gridPixelY: speakerGridCell.centerY - 150
  };
  object.listenerCoords = {
    gridX: tuple[2][0],
    gridY: tuple[2][1],
    trueX: listenerGridCell.centerX - object.width / 2,
    trueY: listenerGridCell.centerY - object.height / 2,
    gridPixelX: listenerGridCell.centerX - 150,
    gridPixelY: listenerGridCell.centerY - 150
  };
  return object;
};

var sampleStimulusLocs = function (objList) {
  var minX = objList.length === 3 ? 2 : 1;
  var maxX = objList.length === 5 ? 5 : 4;
  var locs = _.map(_.range(minX, maxX + 1), function (i) { return [i, 1]; });
  return { listener: _.shuffle(locs), speaker: _.shuffle(locs) };
};

var firstClassSelector = function (target, list) {
  return _.sample(_.filter(list, function (x) {
    return target.basiclevel === x.basiclevel;
  }));
};

var secondClassSelector = function (target, list) {
  return _.sample(_.filter(list, function (x) {
    return target.superdomain === x.superdomain;
  }));
};

var thirdClassSelector = function (target, list) {
  return _.extend(_.sample(list), { targetStatus: "distrClass3" });
};

// maps a grid location to the exact pixel coordinates
// for x = 1,2,3,4; y = 1,2,3,4
game_core.prototype.getPixelFromCell = function (x, y) {
  return {
    centerX: (this.cellPadding / 2 + this.cellDimensions.width * (x - 1)
      + this.cellDimensions.width / 2),
    centerY: (this.cellPadding / 2 + this.cellDimensions.height * (y - 1)
      + this.cellDimensions.height / 2),
    upperLeftX: (this.cellDimensions.width * (x - 1) + this.cellPadding / 2),
    upperLeftY: (this.cellDimensions.height * (y - 1) + this.cellPadding / 2),
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
  for (i = 0; i < this.objects.length; i++) {
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
  var trueX = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerX - objImage.width / 2;
  var trueY = this.getPixelFromCell(objLocation.gridX, objLocation.gridY).centerY - objImage.height / 2;
  if (coord == "xCoord") {
    return trueX;
  }
  if (coord == "yCoord") {
    return trueY;
  }
};

