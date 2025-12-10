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
 * isOdd
 ************************************************/
Metronome.isOdd = function(bpm) {
	return (bpm % 2 !== 0); 
} 

/************************************************
 * init()
 ************************************************/
Metronome.init = function() {
	Metronome.active = Metronome.checkCookie();

	if ($('#metro').size() > 0) { 
		// Get metronome data defined in the DOM (under @metro tag)
		Metronome.bpm = WebUtils.readDomConfig("metro", Metronome.bpm);
		if (Metronome.isOdd(Metronome.bpm)) {
			// We only support even numbers in metronome.css
			Metronome.bpm += 1;
		}
		$("#js-metro-tag").html(Metronome.bpm + " bpm");
		$("#js-metro-tag").show();
	} else {
		$('#js-metronome').hide();
		$("#js-metro-tag").hide();
	}

	// Set the checkbox 
	if (Metronome.active) {
		$("#js-metronome input").attr('checked', 'checked');
		$('hr.metronome').addClass('metro'+Metronome.bpm);
		$("hr.metronome").show(500);
	}
 }

/************************************************
 * activate()
 ************************************************/
Metronome.activate = function(e) {
	Metronome.active = this.checked;
	if (this.checked) {
		WebUtils.saveCookie('metronome', 'true');
		$('hr.metronome').show(500);
	} else {
		WebUtils.saveCookie('metronome', 'false');		
		$('hr.metronome').hide(500);
	}
}

/************************************************
 * wireup()
 ************************************************/
Metronome.wireup = function() {
	Metronome.init();
	$('#js-metronome input').click(Metronome.activate);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Metronome.wireup();
});

