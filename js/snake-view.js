(function () {
  window.SG = window.SG || {};

  var View = SG.View = function ($el) {
    this.$el = $el;
    this.board = new SG.Board(20);
    this.intID = window.setInterval(this.step.bind(this), 500);

    $(document).on("keydown", this.handleKeypress.bind(this));
  }

  View.prototype.step = function(){
    var $figcaption = $("<figcaption>");
    if (this.board.snake.segments.length > 0){
      this.render();
      this.board.snake.move();

      if(this.board.snake.foodFound()){
        debugger
        $figcaption.html("Yummy!");
      };
    } else {

      $figcaption.html("BANG!")
      window.clearInterval(this.intID);
    }
    this.$el.append($figcaption);
  };

  View.prototype.render = function(){
    this.board.render();
    var html = this.board.render();
    this.$el.html(html);

  };

  SG.COMPASS = {
    37: "W",
    38: "S",
    39: "E",
    40: "N"
  };

  View.prototype.handleKeypress = function(e){
    this.board.snake.turn(SG.COMPASS[e.keyCode]);
  };

})();
