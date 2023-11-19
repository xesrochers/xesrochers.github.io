/************************************************
 * Scroller class definition
 ************************************************/
function Scroller() {
}

/************************************************
 * Scroller attributes
 ************************************************/
Scroller.height = 50;
Scroller.minHeight = 50;
Scroller.maxHeight = 200;
Scroller.pace = 50; // In percent
Scroller.reference = 0;
Scroller.sleep = 5000;
Scroller.sleepTop = 11000;
Scroller.snooze = 5000;
Scroller.snoozeTop = 11000;
Scroller.lag = 1000;
Scroller.maxLag = 1000;
Scroller.interval;
Scroller.blinkval;

/************************************************
 * setPace()
 * Adjusts the context for fast pace songs
 ************************************************/
Scroller.setPace = function(sleep) {
	var result = sleep;
	if (result <= Scroller.lag) {
		result = Scroller.lag; 
		Scroller.lag =  Scroller.maxLag * Scroller.pace/100;
		Scroller.height = Scroller.maxHeight * Scroller.pace/100;
		//console.log("SetPace: sleep is " + sleep + " result is " + result + " lag is " + Scroller.lag + " height is " + Scroller.maxHeight);
	} else {
		Scroller.lag =  Scroller.maxLag;
		Scroller.height = Scroller.minHeight;
	}
	return result;
}

/************************************************
 * scroll()
 ************************************************/
Scroller.scroll = function() {
	Scroller.reference += Scroller.height;
	$('html, body').animate({ scrollTop: Scroller.reference }, Scroller.lag);
}

/************************************************
 * autoScroll()
 ************************************************/
Scroller.autoScroll = function() {
	var scroll = Scroller.reference != 0; // 

	//if (Scroller.interval >= 0) clearInterval(Scroller.interval);

	var sleeper = Scroller.sleepTop-Scroller.sleep;

	if (scroll) { // Scroll mode
		$('.play.button i').attr("class", "").addClass('icon-pause');
		$('.play.button').removeClass('snoozing');
		$('.play.button').attr('title', 'pause');
	} else { // Snooze mode
		sleeper = Scroller.snooze;
		$('.play.button i').attr("class", "").addClass('icon-circle-blank');
		$('.play.button').addClass('snoozing');
		$('.play.button').attr('title', 'snooze');
	}

	if (Scroller.atBottom()) {
		// Stop everything
		clearInterval(Scroller.interval); // stop everything
		$('.play.button').click();
	} else {
		// Schedule the next autoScroll event
		sleeper = Scroller.setPace(sleeper);
		clearInterval(Scroller.interval); // clear pending intervals before adding another
		Scroller.interval = setInterval(Scroller.autoScroll, sleeper);		

		if (scroll) {
			// Scroll it
			Scroller.scroll();
		} else {
			// Snooze it (for now)
			Scroller.reference = 1; // Leave snooze mode
		}
	}
}

/************************************************
 * onScroll()
 ************************************************/
Scroller.onScroll = function() {
	Scroller.reference = window.pageYOffset;
	Scroller.showHideBigplay();
	if (Scroller.reference == 0) {
		$('.play').removeClass('disabled');
		Scroller.showHideBigplay();
	} 
	// console.log("Page Offset" + window.pageYOffset);
}

/************************************************
 * blinker()
 ************************************************/
Scroller.blinker = function() {
    var rate = (Scroller.sleepTop-Scroller.sleep)/10;
    $('.play.button').addClass("blink");
}

/************************************************
 * atBottom()
 ************************************************/
Scroller.atBottom = function() {
	var result = false;
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) < 50) {
	    result = true;
	}
	return result;
}

/************************************************
 * bigplay()
 ************************************************/
Scroller.bigplay = function(e) {
	e.preventDefault();
	$('.play.button').click();
}

/************************************************
 * play()
 ************************************************/
Scroller.play = function(e) {
	e.preventDefault();
	var self = $(this);

	//$('body').removeClass("top");

	if (!self.hasClass('disabled')) {
		$('.big-play').addClass('hidden');
		if (self.hasClass('scroll')) {
			self.find('i').attr("class", "").addClass('icon-play');
			self.removeClass('scroll');
			$('.tab-slide').removeClass("hidden");
			$('.play.button').removeClass("blink");
			$('.play.button').attr('title', 'play');

			if (!Scroller.atBottom()) {
				$('.tablature').removeClass('hidden');
				$('#harmony-control').removeClass('hidden');			
			}

			clearInterval(Scroller.interval);
		} else {
			self.find('i').attr("class", "").addClass('icon-pause');
			self.addClass('scroll');
			$('.tab-slide').addClass("hidden");
			$('.tablature').addClass('hidden');
			$('#harmony-control').addClass('hidden');
			$('.play.button').addClass("blink");

			if (!Scroller.atBottom()) {
				Scroller.autoScroll();
				Scroller.blinker();
			}
		}
	}

	if (Scroller.atBottom()) {
		$('.play.button').addClass("disabled");
	}



}

/************************************************
 * doSnooze()
 ************************************************/
Scroller.doSnooze = function() {
	var val = $('.snooze').val();
	Scroller.setSnooze(val);
	localStorage.setItem(Scroller.getPath() +"-Snooze", val);
}

/************************************************
 * getPath()
 ************************************************/
Scroller.getPath = function() {
	return window.location.pathname.replace(".html","");
}

/************************************************
 * setSnooze()
 ************************************************/
Scroller.setSnooze = function(val) {
	Scroller.snooze = val;
	console.log('snooze changed to ' + val);
	$("#snooze").html(Math.floor(val/1000) + " sec");
	$('.snooze').val(val);
}


/************************************************
 * doSleep()
 ************************************************/
Scroller.doSleep = function() {
	var val = $('.rate').val();
	Scroller.setRate(val);
	localStorage.setItem(Scroller.getPath() +"-Sleep", val);
}

/************************************************
 * setRate()
 ************************************************/
Scroller.setRate = function(val) {
	Scroller.sleep = val;
	console.log('rate changed to ' + val);
	Scroller.pace = Math.floor((val/Scroller.sleepTop) * 100);
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
 * reset()
 ************************************************/
Scroller.reset = function(e) {

	// if ($('.play.button').hasClass("scroll") || $('.play.button').hasClass("done")) {
	// 	$('.play.button').click(); // stop scroller
	// }
	//$('body').addClass("top");
	$('html, body').animate({ scrollTop: 0 }, Scroller.lag);
	Scroller.reference = 0;
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
 * toggleBigplay()
 * Bigplay button preference (setting)
 ************************************************/
Scroller.toggleBigplay = function() {
	var self = $(this); 
	if (self.hasClass('yes')) {
		localStorage.setItem("bigplay", 1);
	} else {
		localStorage.setItem("bigplay", 0);
	}

	Scroller.showHideBigplay();
}

/************************************************
 * showHideBigplay()
 ************************************************/
Scroller.showHideBigplay = function() {
	var result = (Scroller.reference == 0); 

	// check settings
	test = localStorage.getItem("bigplay");
	if (test !== null) {
		result = result && (test == 1);
		if (result) {
			$(".big-play").removeClass("hidden");
		} else {
			$(".big-play").addClass("hidden");
		}
		$("#.show-big-play a").removeClass("selected");
		if (test == 1) {
			$("#.show-big-play a.yes").addClass("selected");
		} else {
			$("#.show-big-play a.no").addClass("selected");			
		}
	}

	// if (result) {
	// 	$("body").addClass("top"); // show big play
	// } else {
	// 	$("body").removeClass("top"); // hide big play
	// }

	return result;
}

/************************************************
 * init()
 ************************************************/
Scroller.init = function() {
	var sleep = Scroller.sleep;
	var snooze = Scroller.snooze;

	if (typeof(Storage) !== "undefined") {
		sleep = Scroller.readStorage("Sleep", Scroller.sleep);
		snooze = Scroller.readStorage("Snooze", Scroller.snooze);
	} else {
		$(".rate").hide(500);
	}

   var config = $('#config');
	if (config.length) {
	   	sleep  = Scroller.readServer("rate", Scroller.sleep);
	   	snooze = Scroller.readServer('snooze', Scroller.snooze);
	   	console.log('rate and snooze restored from configuration');
	   	Scroller.disableControls(false);
	   	$('#js-server-option').show();
	} else {
	   	$('#js-server-option').hide();
	}

	Scroller.setRate(sleep);
	Scroller.setSnooze(snooze);
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
		Scroller.setRate(Scroller.readServer("rate", Scroller.sleep));
		Scroller.setSnooze(Scroller.readServer("snooze", Scroller.snooze));
		Scroller.disableControls(false);
	} else {
		Scroller.setRate(Scroller.readStorage("Sleep", Scroller.sleep));
		Scroller.setSnooze(Scroller.readStorage("Snooze", Scroller.snooze));		
		Scroller.disableControls(true);
	}

}

/************************************************
 * wireup()
 ************************************************/
Scroller.wireup = function() {
	Scroller.init();

	$(window).scroll(Scroller.onScroll);
	$('.play').click(Scroller.play);
	$('.rate').change(Scroller.doSleep);
	$('.snooze').change(Scroller.doSnooze);
	$('#js-server').click(Scroller.flipConfig);
	$('#top').click(Scroller.reset);
	$('#js-big-play').click(Scroller.bigplay);
	$('#refresh').click(Scroller.refresh);
	$('#js-show-big-play a').click(Scroller.toggleBigplay);

	//$('#reset').click(Scroller.reset);

	if ($(".chord").length == 0) { // check if on song page
		$(".controls").hide();
		$(".tab-slide").hide();
	}

	Scroller.showHideBigplay();

	if (Url.qs('play') != "") {
		$('.play').click();
	}
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Scroller.wireup();
});



