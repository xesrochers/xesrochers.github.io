/************************************************
 * Scroller class definition
 ************************************************/
function Scroller() {
}

/************************************************
 * Scroller attributes
 ************************************************/
Scroller.rate = 5000; 
Scroller.snooze = 5000;
Scroller.wait  = 5000;
Scroller.timeout = null;


/************************************************
 * getState()
 ************************************************/
Scroller.getState = function(state) {
	var playBtn = $('.play.button');
   return playBtn.attr('state');
}

/************************************************
 * setState()
 ************************************************/
Scroller.setState = function(state) {
	var playBtn = $('.play.button');
   playBtn.attr('state', state);
   console.log('state changed to ' + state);

}


/************************************************
 * fillBar()
 ************************************************/
Scroller.fillBar = function() {
	var percent = (Scroller.wait/Scroller.snooze)*100;
	$('.bar').css('width', ''+percent+'%');
}


/************************************************
 * setControls()
 ************************************************/
Scroller.setControls = function(state) {

	var playBtn = $('.play.button');
	if (state == 'reset') {
		playBtn.removeClass("blink");
		playBtn.attr('title', 'play');
		playBtn.find('.icon').removeClass('bar').html('start');
		TabSlide.show();
	} else if (state == 'snoozing') {
		playBtn.addClass("blink");
		playBtn.attr('title', 'pause');
		playBtn.find('.icon').addClass('bar').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		Scroller.fillBar();
		TabSlide.hide();
	} else if (state == 'paused') {
		playBtn.removeClass("blink");
		playBtn.attr('title', 'resume');
		playBtn.find('.icon').removeClass('bar').html('resume');
		TabSlide.show();
	} else if (state == 'playing') {
		playBtn.addClass('blink');
		playBtn.attr('title', 'pause');
		playBtn.find('.icon').removeClass('bar').html('pause');
		TabSlide.hide();
		$('.tablature').addClass('hidden');
		$('#harmony-control').addClass('hidden');
	} else if (state == 'completed') {
		playBtn.removeClass("blink");
		playBtn.attr('title', 'top');
		playBtn.find('.icon').removeClass('bar').html('top');
		TabSlide.show();
		$('.tablature').addClass('hidden');
		$('#harmony-control').addClass('hidden');
	}

}

/************************************************
 * snoozy()
 ************************************************/
Scroller.snoozy = function() {

	var rate = 2000;
	if (Scroller.wait > 0) {
		Scroller.setState('snoozing');
		Scroller.setControls('snoozing');
		Scroller.wait -= 1000;
		Scroller.timeout = setTimeout(Scroller.snoozy, 2000);
	} else {
		Scroller.start();
	}
}



/************************************************
 * play()
 ************************************************/
Scroller.play = function(e) {
	e.preventDefault();
   
	var state = Scroller.getState(state);

	console.log('current state is ' + state);

	if (state == 'reset') {
		Scroller.snoozy();
	} else if (state == 'snoozing') {
		Scroller.snoozy();
	} else if (state == 'playing') {
		Scroller.pause();
	} else if (state == 'paused') {
		Scroller.start();			
	} else if (state == 'completed') {
		Scroller.reset();			
	}
}


/************************************************
 * reset()
 ************************************************/
Scroller.reset = function(e) {
	Scroller.setState('reset');
	Scroller.setControls('reset');
	$('html, body').animate({ scrollTop: 0 }, 1000);
}

/************************************************
 * start()
 ************************************************/
Scroller.start = function() {
	var max = parseInt($('input.rate').attr('max'));
	console.log('rate is  ' + Scroller.rate);
	var val = parseInt(max - Scroller.rate);
	console.log('smooth scroller started ' + val);
	SmoothScroller.setCallback(Scroller.completed);
	SmoothScroller.setPace(val);
	SmoothScroller.start();

	Scroller.setState('playing');
	Scroller.setControls('playing');
}

/************************************************
 * pause()
 ************************************************/
Scroller.pause = function() {
	SmoothScroller.pause();
	Scroller.clearTimeouts();
	Scroller.setState('paused');
	Scroller.setControls('paused');
}


/************************************************
 * completed()
 ************************************************/
Scroller.completed = function() {
	Scroller.clearTimeouts();
	SmoothScroller.reset();	
	Scroller.setState('completed');
	Scroller.setControls('completed');
}


/************************************************
 * clearTimeouts()
 ************************************************/
Scroller.clearTimeouts = function() {

	var state = Scroller.getState();
	if (state == 'snoozing') {
		if (Scroller.timeout != null) {
			clearTimeout(Scroller.timeout);
		}
	}	

}


/************************************************
 * getPath()
 ************************************************/
Scroller.getPath = function() {
	return window.location.pathname.replace(".html","");
}

/************************************************
 * updateSnooze()
 * 
 ************************************************/
Scroller.updateSnooze = function(e) {
	e.preventDefault();
	var val = $('.snooze').val();
	Scroller.setSnooze(val);
	localStorage.setItem(Scroller.getPath() +"-snooze", val);
}

/************************************************
 * setSnooze()
 ************************************************/
Scroller.setSnooze = function(val) {
	Scroller.snooze = val;
	Scroller.wait = val;
	console.log('snooze changed to ' + val);
	$("#snooze").html(Math.floor(val/1000) + " sec");
	$('.snooze').val(val);
}

/************************************************
 * updateRate()
 ************************************************/
Scroller.updateRate = function(e) {
	e.preventDefault();
	var val = parseInt($('.rate').val());
	Scroller.setRate(val);
	localStorage.setItem(Scroller.getPath() +"-rate", val);
}

/************************************************
 * setRate()
 ************************************************/
Scroller.setRate = function(val) {
	console.log('rate changed to ' + val);
	Scroller.rate = val;
	$("#rate").html(Math.floor(val/1000) + " pet");
	$('.rate').val(val);
}


/************************************************
 * refresh()
 ************************************************/
Scroller.refresh = function(e) {
	e.preventDefault();
	location.reload(true); // loads CSS and JS
	window.location.replace(window.location.href); // go top
}


/************************************************
 * readServer()
 ************************************************/
Scroller.readServer = function(key, def) {
	var result = def;

   var config = $('#config');
	if (config.length) {
	   result = config.attr(key);
	}

	return result;
}


/************************************************
 * readStorage()
 ************************************************/
Scroller.readStorage = function(key, def) {
	var result = def;
	var key = Scroller.getPath() + "-" + key;
	test = localStorage.getItem(key);
	if (test !== null) {
		result = test;
	}
	return result;
}

/************************************************
 * saveCookie()
 ************************************************/
Scroller.saveCookie = function(key, def) {
	var domainName = window.location.hostname;
	document.cookie = key + '=' + def +'; path=/; domain=.' + domainName;
}

/************************************************
 * readCookie()
 ************************************************/
Scroller.readCookie = function(key, def) {
 // Get name followed by anything except a semicolon
  var cookiestring=RegExp(key+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

/************************************************
 * disableControls()
 ************************************************/
Scroller.disableControls = function(view) {

	if (view) {
		$('.rate').removeAttr('disabled').removeClass('disabled');
		$('.snooze').removeAttr('disabled').removeClass('disabled');
	} else {
		$('.rate').attr('disabled',true).addClass('disabled');
		$('.snooze').attr('disabled',true).addClass('disabled');
	}

}


/************************************************
 * flipConfig()
 ************************************************/
Scroller.flipConfig = function(e) {
	if (this.checked) {
		Scroller.setRate(Scroller.readServer("rate", Scroller.rate));
		Scroller.setSnooze(Scroller.readServer("snooze", Scroller.snooze));
		Scroller.disableControls(false);
	} else {
		Scroller.setRate(Scroller.readStorage("rate", Scroller.rate));
		Scroller.setSnooze(Scroller.readStorage("snooze", Scroller.snooze));		
		Scroller.disableControls(true);
	}

}

/************************************************
 * autoPlay()
 ************************************************/
Scroller.autoPlay = function() {
	var result = false;
	var cookie = Scroller.readCookie('autoPlay');
	if (cookie != null) {
		result = cookie == 'true';
	}

	return result;
}


/************************************************
 * setAutoPlay()
 ************************************************/
Scroller.setAutoPlay = function(e) {
	if (this.checked) {
		Scroller.saveCookie('autoPlay', 'true');
	} else {
		Scroller.saveCookie('autoPlay', 'false');		
	}
}

/************************************************
 * init()
 ************************************************/
Scroller.init = function() {
	var rate = Scroller.rate;
	var snooze = Scroller.snooze;

	if (typeof(Storage) !== "undefined") {
		rate = Scroller.readStorage("rate", Scroller.rate);
		snooze = Scroller.readStorage("snooze", Scroller.snooze);
	} else {
		$(".rate").hide(500);
	}

   var config = $('#config');
	if (config.length) {
	   	rate  = Scroller.readServer("rate", Scroller.rate);
	   	snooze = Scroller.readServer('snooze', Scroller.snooze);
	   	console.log('rate and snooze restored from configuration');
	   	Scroller.disableControls(false);
	   	$('#js-server-option').show();
	} else {
	   	$('#js-server-option').hide();
	}

	Scroller.setRate(rate);
	Scroller.setSnooze(snooze);
}

/************************************************
 * wireup()
 ************************************************/
Scroller.wireup = function() {
	Scroller.init();

	$('.play').click(Scroller.play);
	$('.rate').change(Scroller.updateRate);  
	$('.snooze').change(Scroller.updateSnooze);

	$('#js-auto-play').click(Scroller.setAutoPlay);
	$('#js-server').click(Scroller.flipConfig);
	$('#refresh').click(Scroller.refresh);

	if ($(".chord").length == 0) { // check if on song page
		$(".controls").hide();
		$(".tab-handle").hide();
	} else {
		$("#searchbox-js").hide();
	}

	if (Scroller.autoPlay()) {
		$("#js-auto-play").attr('checked', 'checked');
		$('.play').click();
	}
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Scroller.wireup();
});

