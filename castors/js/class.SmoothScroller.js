/************************************************
 * SmoothScroller class definition
 ************************************************/
function SmoothScroller() {
}

/************************************************
 * SmoothScroller attributes
 ************************************************/
SmoothScroller.active = true; 
SmoothScroller.pace = 5000;    // sleep interval
SmoothScroller.stride = null;  // vertical pixels
SmoothScroller.animate = 1000; 
SmoothScroller.timeout = null;
SmoothScroller.offset = 0;
SmoothScroller.callback = null;
SmoothScroller.lastPosition = 0;

/************************************************
 * setCallback()
 ************************************************/
SmoothScroller.setCallback = function(callback) {
	SmoothScroller.callback = callback;
}

/************************************************
 * setPace()
 ************************************************/
SmoothScroller.setPace = function(pace) {
	var speed   = 11000-pace; 
	SmoothScroller.pace = (pace <= 0) ? 1000 : pace;
	SmoothScroller.animate = 2000; 
	SmoothScroller.stride = parseInt(speed/100) + 5;
	if (speed >= 9000) {
		SmoothScroller.animate = 500; 
	}

	// console.log('*** pace is ' + SmoothScroller.pace);
	// console.log('*** animate is ' + SmoothScroller.animate);
	// console.log('*** stride is ' + SmoothScroller.stride);
}

/************************************************
 * scroll()
 ************************************************/
SmoothScroller.scroll = function() {

	if (!SmoothScroller.completed()) {
		if (SmoothScroller.active) {
			SmoothScroller.offset += SmoothScroller.stride;	
			$('html,body').animate({scrollTop: SmoothScroller.offset}, SmoothScroller.pace-SmoothScroller.animate);
			SmoothScroller.timeout = setTimeout(SmoothScroller.scroll, SmoothScroller.pace);
		}
	}
}

/************************************************
 * start()
 ************************************************/
SmoothScroller.start = function() {
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

