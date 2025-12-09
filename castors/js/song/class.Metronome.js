/************************************************
 * Metronome class definition
 ************************************************/
function Metronome() {
}

/************************************************
 * Metronome attributes
 ************************************************/
Metronome.active  = false; 
Metronome.bpm     = 0;
Metronome.show    = true;
Metronome.measure = 4;    // one measure beeps
Metronome.audio   = null;

/************************************************
 * setCallback()
 ************************************************/
Metronome.setCallback = function(callback) {
	Metronome.callback = callback;
}

/************************************************
 * checkCookie()
 ************************************************/
Metronome.checkCookie = function() {
	var result = false;
	var cookie = WebUtils.readCookie('metronome');
	if (cookie != null) {
		result = cookie == 'true';
	}

	return result;
}

/************************************************
 * init()
 ************************************************/
Metronome.init = function() {
	Metronome.active = Metronome.checkCookie();

	// Set the checkbox 
	if (Metronome.active) {
		$("#js-metronome input").attr('checked', 'checked');
	}

	// Get metronome data defined in the DOM (under @metro tag)
	if ($('#metro').size() > 0) { 
		// Calculate pace from bpm
		Metronome.bpm = WebUtils.readDomConfig("metro", Metronome.bpm);
		Metronome.pace = (30 * 1000) / Metronome.bpm;
	}

	// Load beep wave no matter what 
	if ($('#js-beep').size() > 0) {
		var media = $('#js-beep').attr('data');
		Metronome.audio = new Audio(media);
	}
}

/************************************************
 * displayTag()
 ************************************************/
Metronome.displayTag = function() {
	// Get metronome data defined in the DOM (under @metro tag)
	if ($('#metro').size() > 0) { 
		// Calculate pace from bpm
		Metronome.bpm = WebUtils.readDomConfig("metro", Metronome.bpm);
		$("#js-metro-tag").html(Metronome.bpm + " bpm");
		$("#js-metro-tag").show();
	} else {
		$("#js-metro-tag").hide();
	}
}

/************************************************
 * beep()
 ************************************************/
Metronome.beep = function(measure) {
	if (Metronome.audio != null && Metronome.active) {
		if (Metronome.measure > 0) {
			Metronome.audio.play();
			if (measure) Metronome.measure--;
		} else {
			Metronome.stop();
		}
	}
}

/************************************************
 * pulse()
 ************************************************/
Metronome.pulse = function() {
	if (Metronome.active && Metronome.bpm > 0) { // we have metronome data and it's active
		if (Metronome.show) {
			Metronome.show = false;
			$('hr.metronome').show();
			Metronome.beep(true);
		} else {
			Metronome.show = true;
			$('hr.metronome').hide();
		}
		
		Metronome.timeout = setTimeout(Metronome.pulse, Metronome.pace);
	}
}

/************************************************
 * start()
 ************************************************/
Metronome.start = function() {
	console.log('Metronome started');
	Metronome.pulse();
}

/************************************************
 * clearTimeout()
 ************************************************/
Metronome.clearTimeout = function() {
	if (Metronome.timeout != null) {
		clearTimeout(Metronome.timeout);
	}
}

/************************************************
 * stop()
 ************************************************/
Metronome.stop = function() {
	Metronome.active = false;
	Metronome.clearTimeout();
	$('hr.metronome').hide();
}

/************************************************
 * reset()
 ************************************************/
Metronome.reset = function() {
	Metronome.clearTimeout(); 
}

/************************************************
 * setMetronome()
 ************************************************/
Metronome.setMetronome = function(e) {
	Metronome.active = this.checked;
	if (this.checked) {
		WebUtils.saveCookie('metronome', 'true');
	} else {
		WebUtils.saveCookie('metronome', 'false');		
	}
}


/************************************************
 * wireup()
 ************************************************/
Metronome.wireup = function() {
	Metronome.displayTag();
	Metronome.init();
	$('#js-metronome input').click(Metronome.setMetronome);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Metronome.wireup();
});

