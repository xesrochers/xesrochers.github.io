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
SmoothScroller.timeout = null;
SmoothScroller.offset = 0;
SmoothScroller.callback = null;

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
	if (pace < 2000) {
		// scroll is chunky so run this hack instead
		SmoothScroller.pace = 2000;
		SmoothScroller.stride = 200;
	} else if (pace < 1000) {
		// scroll is chunky so run this hack instead
		SmoothScroller.pace = 2000;
		SmoothScroller.stride = 400;
	} else {
		SmoothScroller.stride = 70;
		SmoothScroller.pace = pace;
	}
}

/************************************************
 * scroll()
 ************************************************/
SmoothScroller.scroll = function() {

	if (!SmoothScroller.completed()) {
		if (SmoothScroller.active) {
			SmoothScroller.offset += SmoothScroller.stride;	
			$('html,body').animate({scrollTop: SmoothScroller.offset}, SmoothScroller.pace-1000);
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
	if ((scrollHeight - scrollPosition) < 50) {
	    result = true;
	}

	if (result && (SmoothScroller.callback != null)) {
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

