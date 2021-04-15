// drawing.js
// This file contains functions to draw on the HTML5 canvas

var drawScreen = function (game, player) {
  // draw background
  game.ctx.fillStyle = "#FFFFFF";
  game.ctx.fillRect(0, 0, game.viewport.width, game.viewport.height);

  // Draw message in center (for countdown, e.g.)
  if (player.message) {
    game.ctx.font = "bold 23pt Helvetica";
    game.ctx.textAlign = 'center';
    wrapText(game, player.message,
      game.world.width / 2, game.world.height / 4,
      game.world.width * 4 / 5,
      25);
  }
  else {
    highlightCell(game, player);
    drawGrid(game);
    drawObjects(game, player);
  }
};

// Draws a grid of cells on the canvas (evenly divided 
var drawGrid = function (game) {
  //console.log("****");
  //size of canvas
  var cw = game.viewport.width;
  var ch = game.viewport.height;

  //padding around grid
  var p = game.cellPadding / 2;

  //grid width and height
  var bw = cw - (p * 2);
  var bh = ch - (p * 2);

  game.ctx.beginPath();

  // vertical lines
  for (var x = 0; x <= bw; x += Math.floor((cw - 2 * p) / game.numHorizontalCells)) {
    game.ctx.moveTo(0.5 + x + p, p);
    game.ctx.lineTo(0.5 + x + p, bh + p);
  }

  // horizontal lines
  for (var x = 0; x <= bh; x += Math.floor((ch - 2 * p) / game.numVerticalCells)) {
    game.ctx.moveTo(p, 0.5 + x + p);
    game.ctx.lineTo(bw + p, 0.5 + x + p);
  }

  game.ctx.lineWidth = 1;
  game.ctx.strokeStyle = "#000000";
  game.ctx.stroke();
};

// Loop through the object list and draw each one in its specified location
var drawObjects = function (game, player) {
  //console.log("***");
  //console.log("***");
  //console.log("***");
  //console.log(game.objects)
  if (game.objects[0]) {
    console.log("trial_type: ", game.objects[0].trial_type )
    console.log("condition: ", game.objects[0].condition);
  }
  _.map(game.objects, function (obj) {
    // console.log("game.objects according to drawing.drawObjects" + game.objects);
    game.ctx.drawImage(obj.img, obj.trueX, obj.trueY,
      obj.width, obj.height);
  });
  var currentDragObject = game.objects[game.dragIndex];
  if (currentDragObject) {
    game.ctx.drawImage(currentDragObject.img, currentDragObject.trueX, currentDragObject.trueY,
      currentDragObject.width, currentDragObject.height);
  }

};



var highlightCell = function (game, player) {
  // look through game.objects
  // find the one with targetStatus = "target"
  // set upperLeftX, upperLeftY to its X and Y
  //console.log("game.objects according to drawing" + game.objects);
  if (player.role == game.playerRoleNames.role1) {
    var targetObjects = _.filter(game.objects, function (x) {
      return x.targetStatus == "target";
    });
    for (var n = 0; n < targetObjects.length; n++) {
      var upperLeftX = targetObjects[n].speakerCoords.gridPixelX;
      var upperLeftY = targetObjects[n].speakerCoords.gridPixelY;
      if (upperLeftX != null && upperLeftY != null) {
        game.ctx.beginPath();
        game.ctx.lineWidth = "20";
        game.ctx.strokeStyle = "green";
        game.ctx.rect(upperLeftX, upperLeftY, 300, 300);
        game.ctx.stroke();
      }
    }
  }
};

// This is a helper function to write a text string onto the HTML5 canvas.
// It automatically figures out how to break the text into lines that will fit
// Input:
//    * game: the game object (containing the ctx canvas object)
//    * text: the string of text you want to writ
//    * x: the x coordinate of the point you want to start writing at (in pixels)
//    * y: the y coordinate of the point you want to start writing at (in pixels)
//    * maxWidth: the maximum width you want to allow the text to span (in pixels)
//    * lineHeight: the vertical space you want between lines (in pixels)
function wrapText(game, text, x, y, maxWidth, lineHeight) {
  var cars = text.split("\n");
  game.ctx.fillStyle = 'white';
  game.ctx.fillRect(0, 0, game.viewport.width, game.viewport.height);
  game.ctx.fillStyle = 'red';

  for (var ii = 0; ii < cars.length; ii++) {

    var line = "";
    var words = cars[ii].split(" ");

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = game.ctx.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > maxWidth) {
        game.ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    game.ctx.fillText(line, x, y);
    y += lineHeight;
  }
}
