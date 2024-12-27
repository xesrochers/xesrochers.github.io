/************************************************
 * AutoPlay class definition
 ************************************************/
function AutoPlay() {
}

/************************************************
 * AutoPlay attributes
 ************************************************/
AutoPlay.active = false; 

/************************************************
 * checkCookie()
 ************************************************/
AutoPlay.isActive = function() {
	return AutoPlay.active;
}

/************************************************
 * checkCookie()
 ************************************************/
AutoPlay.checkCookie = function() {
	var result = false;
	var cookie = WebUtils.readCookie('autoPlay');
	if (cookie != null) {
		result = cookie == 'true';
	}

	return result;
}

/************************************************
 * setAutoPlay()
 ************************************************/
AutoPlay.setAutoPlay = function(e) {
	AutoPlay.active = this.checked;
	if (this.checked) {
		WebUtils.saveCookie('autoPlay', 'true');
		$("#js-autoplay-tag").show();
	} else {
		WebUtils.saveCookie('autoPlay', 'false');		
		$("#js-autoplay-tag").hide();
	}
}


/************************************************
 * init()
 ************************************************/
AutoPlay.init = function() {
	AutoPlay.active = AutoPlay.checkCookie();
	if (AutoPlay.active) {
		// set the UI
		$("#js-auto-play").attr('checked', 'checked');
		$("#js-autoplay-tag").show();
	} else {
		$("#js-autoplay-tag").hide();		
	}
}

/************************************************
 * wireup()
 ************************************************/
AutoPlay.wireup = function() {
	AutoPlay.init();
	$('#js-auto-play').click(AutoPlay.setAutoPlay);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   AutoPlay.wireup();
});

