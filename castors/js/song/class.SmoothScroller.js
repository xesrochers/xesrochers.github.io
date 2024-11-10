/************************************************
 * SmoothScroller class definition
 ************************************************/
function SmoothScroller() {
}

/************************************************
 * SmoothScroller attributes
 ************************************************/
SmoothScroller.active = true; 
SmoothScroller.max = 100;      // max speed (from input)
SmoothScroller.speed = 50;     // default speed 
SmoothScroller.pace = 5000;    // sleep interval
SmoothScroller.stride = null;  // vertical pixels
SmoothScroller.animate = 1000; 
SmoothScroller.timeout = null;
SmoothScroller.offset = 0;
SmoothScroller.callback = null;
SmoothScroller.lastPosition = 0;

/************************************************
 * setMax()
 ************************************************/
SmoothScroller.setMax = function(max) {
	SmoothScroller.max = max + 1;
}

/************************************************
 * setSpeed()
 ************************************************/
SmoothScroller.setSpeed = function(speed) {
	SmoothScroller.speed = speed;
	SmoothScroller.pace  = ((SmoothScroller.max - speed) * 80) + 500;
	SmoothScroller.animate = (SmoothScroller.pace <= 1000) ? SmoothScroller.pace/2 : 1000; // pace must be greater //(speed >= 85) ? 400 : 1000; 
	SmoothScroller.stride = speed + 10;

	console.log('*** speed is ' + SmoothScroller.speed);
	console.log('*** pace is ' + SmoothScroller.pace);
	console.log('*** animate is ' + SmoothScroller.animate);
	console.log('*** stride is ' + SmoothScroller.stride);

}

/************************************************
 * setCallback()
 ************************************************/
SmoothScroller.setCallback = function(callback) {
	SmoothScroller.callback = callback;
}

/************************************************
 * scroll()
 ************************************************/
SmoothScroller.scroll = function() {

	if (!SmoothScroller.completed()) {
		if (SmoothScroller.active) {
			SmoothScroller.offset += SmoothScroller.stride;	
			$('html,body').animate({scrollTop: SmoothScroller.offset}, SmoothScroller.animate); //SmoothScroller.pace-SmoothScroller.animate);
			SmoothScroller.timeout = setTimeout(SmoothScroller.scroll, SmoothScroller.pace);
		}
	}
}

/************************************************
 * start()
 ************************************************/
SmoothScroller.start = function() {
	console.log('SmoothScroller started');
	SmoothScroller.active = true;
	SmoothScroller.scroll();
}

/************************************************
 * clearTimeout()
 ************************************************/
SmoothScroller.clearTimeout = function() {
	if (SmoothScroller.timeout != null) {
		clearTimeout(SmoothScroller.timeout);
	}
}

/************************************************
 * pause()
 ************************************************/
SmoothScroller.pause = function() {
	SmoothScroller.active = false;
	SmoothScroller.clearTimeout();
}

/************************************************
 * reset()
 ************************************************/
SmoothScroller.reset = function() {
	SmoothScroller.clearTimeout(); 
	SmoothScroller.offset = 0;
}

/************************************************
 * onScroll()
 ************************************************/
SmoothScroller.onScroll = function() {
	SmoothScroller.offset = window.pageYOffset;
}

/************************************************
 * completed()
 ************************************************/
SmoothScroller.completed = function() {
	var result = false;
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();

   result = (SmoothScroller.lastPosition == scrollPosition);
	SmoothScroller.lastPosition = scrollPosition

	if (result && (SmoothScroller.callback != null)) {
		SmoothScroller.clearTimeout();
		SmoothScroller.callback();
	}

	return result;
}

/************************************************
 * wireup()
 ************************************************/
SmoothScroller.wireup = function() {
	$(window).scroll(SmoothScroller.onScroll);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   SmoothScroller.wireup();
});

