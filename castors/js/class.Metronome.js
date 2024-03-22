/************************************************
 * Metronome class definition
 ************************************************/
function Metronome() {
}

/************************************************
 * Metronome attributes
 ************************************************/
Metronome.active = true; 
Metronome.bpm = 50;       // default bpm 
Metronome.animate = 1000; 

/************************************************
 * setCallback()
 ************************************************/
Metronome.setCallback = function(callback) {
	Metronome.callback = callback;
}

/************************************************
 * init()
 ************************************************/
Metronome.init = function() {
	// Use metronome if defined in the DOM (under @metro tag)
	if ($('#metro').size() > 0) { 
		// Calculate pace from bpm
		Metronome.bpm = WebUtils.readDomConfig("metro", Metronome.bpm);
		Metronome.pace = (30 * 1000) / Metronome.bpm; 
		Metronome.pulse();
	}
}

/************************************************
 * pulse()
 ************************************************/
Metronome.pulse = function() {
	if (Metronome.active) {
		$('hr.metronome').toggle();
		Metronome.timeout = setTimeout(Metronome.pulse, Metronome.pace);
	}
}

/************************************************
 * start()
 ************************************************/
Metronome.start = function() {
	console.log('Metronome started');
	Metronome.active = true;
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
 * wireup()
 ************************************************/
Metronome.wireup = function() {
	Metronome.init();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Metronome.wireup();
});

