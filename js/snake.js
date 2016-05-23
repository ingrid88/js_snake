(function() {
  window.SG = window.SG || {};

  var Snake = window.SG.Snake = function (board) {
    this.length = 1;
    this.dir = "E";

    var center = Math.floor(board.size / 2);
    this.segments = [[center, center]];
    this.board = board;
  };


  SG.DIR = {
    "N": [1,  0],
    "E": [0,  1],
    "S": [-1, 0],
    "W": [0, -1]
  }

  Snake.prototype.move = function(){
    var head = this.segments[this.segments.length - 1];
    var next = [head[0] + SG.DIR[this.dir][0], head[1] + SG.DIR[this.dir][1]];

    if (this.board.inBounds(next) && !this.include(next)){
      this.segments.push(next);
      if(!this.foodFound()){
        this.segments.shift();
      };
    } else {
      this.segments = [];
    };
  };

  //snake-view calls this to update position
  //disable turn while currently turning!!
  Snake.prototype.turn = function(dir){
    this.dir = dir;
  }

  Snake.prototype.include = function(pos){
    for(var i = 0; i < this.segments.length; i++){
      if(pos[0] === this.segments[i][0] && pos[1] === this.segments[i][1]){
        return false
      };
    };
    true
  };

  var Board = window.SG.Board = function(size){
    this.size = size;
    this.snake = new Snake(this);
  };

  Board.grid = function(size){
    var grid = [];
    for (var i=0; i < size; i++){
      var row = [];
      for (var j=0; j < size; j++){
        row.push(".");
      }
      grid.push(row);
    }
    return grid;
  };

  Board.prototype.food = function(){
    var row = Math.floor(this.size * Math.random());
    var col = Math.floor(this.size * Math.random());

    this.foodSpot = [row, col];
  };

  Board.prototype.render = function(){
    //create grid (dots!)
    var grid = Board.grid(this.size);

    //replace '.' with 's' for all snake segment positions
    this.snake.segments.forEach(function(segment){
      grid[segment[0]][segment[1]] = 's';
    });

    if (typeof this.foodSpot === "undefined"){
      var food = this.food();
    } else {
      var food = this.foodSpot;
    };
    grid[food[0]][food[1]] = 'x';

    //compile the row arrays into strings
    //compile the grid into rows
    var graph = grid.map(function(row) {
      return row.join("");
    }).join("\n");
    return graph;
  };



  Snake.prototype.foodFound = function(){
    var head = this.segments[this.segments.length - 1];
    var food = this.board.foodSpot;

    if(head[0] === food[0] && head[1] === food[1]){
      this.board.foodSpot = undefined;
      return true;
    }
    false
  };

  Board.prototype.inBounds = function(next){
    var vert = next[0];
    var horz = next[1];
    return (vert >= 0 && vert <= this.size && horz >= 0 && horz <= this.size);
  };

})();
