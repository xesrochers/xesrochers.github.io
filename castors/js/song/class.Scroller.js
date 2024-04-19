/************************************************
 * Scroller class definition
 ************************************************/
function Scroller() {
}

/************************************************
 * Scroller attributes
 ************************************************/
Scroller.sleep = 5;
Scroller.speed = 50; 
Scroller.wait  = 5;
Scroller.timeout = null;

/************************************************
 * getState()
 ************************************************/
Scroller.getState = function(state) {
	var playBtn = $('#js-play');
   return playBtn.attr('state');
}

/************************************************
 * setState()
 ************************************************/
Scroller.setState = function(state) {
	var playBtn = $('#js-play');
   playBtn.attr('state', state);
   console.log('state changed to ' + state);

}

/************************************************
 * fillBar()
 ************************************************/
Scroller.fillBar = function() {
	var percent = (Scroller.wait/Scroller.sleep)*100;
	$('.bar').css('width', ''+percent+'%');
}


/************************************************
 * setControls()
 ************************************************/
Scroller.setControls = function(state) {

	var playBtn = $('#js-play');
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
 * snooze()
 ************************************************/
Scroller.snooze = function() {
	if (Scroller.wait > 0) {
		Scroller.setState('snoozing');
		Scroller.setControls('snoozing');
		Scroller.wait -= 2;
		Scroller.timeout = setTimeout(Scroller.snooze, 2000);
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
		Metronome.beep(false);
		Metronome.start();
		Scroller.snooze();
	} else if (state == 'snoozing') {
		Scroller.snooze();
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
	Scroller.wait = Scroller.sleep;
	Scroller.setState('reset');
	Scroller.setControls('reset');
	$('html, body').animate({ scrollTop: 0 }, 1000);
}

/************************************************
 * start()
 ************************************************/
Scroller.start = function() {
	var max = parseInt($('#js-speed input').attr('max'));
	SmoothScroller.setMax(max);
	SmoothScroller.setSpeed(Scroller.speed);
	SmoothScroller.setCallback(Scroller.completed);
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
 * setSleep()
 ************************************************/
Scroller.setSleep = function(val) {
	Scroller.sleep = val;
	Scroller.wait = val;
	console.log('sleep changed to ' + val);
	$("#js-sleep label").html(val + " sec");
	$('#js-sleep input').val(val);
}

/************************************************
 * updateSleep()
 * 
 ************************************************/
Scroller.updateSleep = function(e) {
	e.preventDefault();
	var val = $(this).val();
	Scroller.setSleep(val);
	WebUtils.saveStorage('sleep', val);
	e.stopPropagation();
}

/************************************************
 * setSpeed()
 ************************************************/
Scroller.setSpeed = function(val) {
	console.log('speed changed to ' + val);
	Scroller.speed = parseInt(val); // passed in as string #@!$@
	SmoothScroller.setSpeed(Scroller.speed)
	$("#js-speed label").html(val + " pet");
	$('#js-speed input').val(val);
}

/************************************************
 * updateSpeed()
 ************************************************/
Scroller.updateSpeed = function(e) {
	e.preventDefault();
	var val = parseInt($(this).val());
	Scroller.setSpeed(val);
	WebUtils.saveStorage('speed', val);
	e.stopPropagation();
}

/************************************************
 * disableControls()
 ************************************************/
Scroller.disableControls = function(disable) {

	if (disable) {
		$('#js-sleep input').attr('disabled',true).addClass('disabled');
		$('#js-speed input').attr('disabled',true).addClass('disabled');
	} else {
		$('#js-sleep input').removeAttr('disabled').removeClass('disabled');
		$('#js-speed input').removeAttr('disabled').removeClass('disabled');
	}

}

/************************************************
 * override()
 ************************************************/
Scroller.override = function(e) {
	if (this.checked) {
		Scroller.setSleep(WebUtils.readStorage("sleep", Scroller.sleep));		
		Scroller.setSpeed(WebUtils.readStorage("speed", Scroller.speed));
		Scroller.disableControls(false);
	} else {
		Scroller.setSleep(WebUtils.readDomConfig("sleep", Scroller.sleep));
		Scroller.setSpeed(WebUtils.readDomConfig("speed", Scroller.speed));
		Scroller.disableControls(true);
	}

}

/************************************************
 * songPage()
 ************************************************/
Scroller.songPage = function() {
	return $('.chord').length >0;
}

/************************************************
 * init()
 ************************************************/
Scroller.init = function() {
	var sleep = Scroller.sleep;
	var speed = Scroller.speed;

	if (typeof(Storage) !== "undefined") {
		sleep = WebUtils.readStorage("sleep", Scroller.sleep);
		speed = WebUtils.readStorage("speed", Scroller.speed);
	}

	if (WebUtils.hasDomConfig()) {
	   	sleep = WebUtils.readDomConfig('sleep', Scroller.sleep);
	   	speed  = WebUtils.readDomConfig("speed", Scroller.speed);
	   	console.log('using DOM configuration');
	   	Scroller.disableControls(true);
	   	TabSlide.setHandle("&lt;<br><span class='tiny'>"+speed+"</span>");
	}

	Scroller.setSleep(sleep);
	Scroller.setSpeed(speed);
}

/************************************************
 * wireup()
 ************************************************/
Scroller.wireup = function() {
	Scroller.init();

	$('#js-play').click(Scroller.play);
	$('#js-sleep input').change(Scroller.updateSleep);
	$('#js-speed input').change(Scroller.updateSpeed);  
	$('#js-override input').click(Scroller.override);
	$('#js-refresh').click(WebUtils.refresh);

	if (Scroller.songPage()) {
		if (AutoPlay.isActive()) $('#js-play').click();
	} else {
		$(".controls").hide();
		$(".tab-handle").hide();
		$('#filter').removeClass('hidden');
	}
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Scroller.wireup();
});

