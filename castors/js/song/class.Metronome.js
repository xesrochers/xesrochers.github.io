/************************************************
 * Metronome class definition
 ************************************************/
function Metronome() {
}

/************************************************
 * Metronome attributes
 ************************************************/
Metronome.active  = true; 
Metronome.bpm     = 60;     // default bpm 
Metronome.animate = 1000;
Metronome.show    = true;
Metronome.sound   = 8;      // sound
Metronome.audio   = new Audio("../../media/beep.mp3");

/************************************************
 * setCallback()
 ************************************************/
Metronome.setCallback = function(callback) {
	Metronome.callback = callback;
}

/************************************************
 * beep()
 ************************************************/
Metronome.beep = function() {
  Metronome.audio.play();
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
	// Use metronome if defined in the DOM (under @metro tag)
	if ($('#metro').size() > 0) { 
		// Calculate pace from bpm
		Metronome.bpm = WebUtils.readDomConfig("metro", Metronome.bpm);
		Metronome.pace = (30 * 1000) / Metronome.bpm; 

		if ($('#js-metronome').size() > 0) {
			if (Metronome.checkCookie()) {
				$("#js-metronome input").attr('checked', 'checked');
			}
		}
	} else {
		$('#js-metronome').hide();
	}
}

/************************************************
 * pulse()
 ************************************************/
Metronome.pulse = function() {
	if (Metronome.active) {
		if (Metronome.show) {
			Metronome.show = false;
			$('hr.metronome').show();
			if (Metronome.sound > 0) {
				Metronome.beep();
				Metronome.sound--;
			} else {
				Metronome.stop();
			}
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
	Metronome.init();
	$('#js-metronome input').click(Metronome.setMetronome);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Metronome.wireup();
});

