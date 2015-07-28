(function() {

  var gimmeRandom = function() {
    return Math.floor(Math.random() * 5000);
  };


  var nrDoors = 8;
  var Door = function($el) {

    this.$el = $el;
    this.openTimeoutId = null;
    this.showSalamTimeoutId = null;
    this.stopTimeoutId = null;
    this.closed = null;

    this.start = function() {
      this.openTimeoutId = setTimeout(this.open.bind(this), gimmeRandom());
    };

    this.open = function() {

      this.$el.removeClass('Door--closed').addClass('Door--open');
      this.showSalamTimeoutId = setTimeout(this.showSalam.bind(this), gimmeRandom());
      this.openTimeoutId = null;
	
    };

    this.showSalam = function() {
      if (this.$el.hasClass('Door--open') ) {
	this.$el.addClass('Door--salamWantsIn');
        this.stopTimeoutId = setTimeout(this.stop.bind(this), gimmeRandom());
        this.showSalamTimeoutId = null;
	}
    };

    this.stop = function() {
	if (this.$el.hasClass('Door--salamWantsIn') ) {
	      this.$el.removeClass('Door--open Door--salamWantsIn').addClass('Door--closed Door--salamIsIn');
	      this.stopTimeoutId = null;
	      clearAllTimeouts();
	      $('.RightPane-message').html('Game over: Salam is in your house... :-('); 
	}
    };

    this.close = function() {
	if (this.$el.hasClass('Door--open') || this.$el.hasClass('Door--salamWantsIn') ){
		this.$el.attr('class', 'Door Door--closed');
		closedDoors++;
	}	
	if (closedDoors == nrDoors ) {
		 $('.RightPane-message').html('You win! :)'); 
	}

    };
  };



  var $leftPane = $('.LeftPane');
  var collection = [];
  var closedDoors = 0;
  var clearAllTimeouts = function() {
    var model;
    for (var index = 0, length = collection.length; index < length; ++index) {
      model = collection[index];
      if (model.openTimeoutId) clearTimeout(model.openTimeoutId);
      if (model.showSalamTimeoutId) clearTimeout(model.showSalamTimeoutId);
      if (model.stopTimeoutId) clearTimeout(model.stopTimeoutId);
    };
  };



  for (var index = 0, nrDoors = 8; index < nrDoors; ++index) {

    var $door = $('<div />')
      .addClass('Door Door--closed')
      .append($('<div />').addClass('Door-left'))
      .append($('<div />').addClass('Door-placeholder'))
      .append($('<div />').addClass('Door-right'));

    $leftPane.append($door);

    var model = new Door($door);
    model.start();
    collection.push(model);
	
  }
	
   $('.Door').click(function() {
	 var model = new Door($(this));
	return model.close();
    });

  
})();
