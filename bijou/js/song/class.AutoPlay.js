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
 * updateTag()
 ************************************************/
AutoPlay.updateTag = function(active) {
	if (active) {
		$("#js-autoplay-tag").show();
		$(".config-block").hide();
		$(".harmony-block").hide();
		$.each($(".tablature-block"), function() {
   	   $(this).hide();
		});
	} else {
		$("#js-autoplay-tag").hide();
		$(".config-block").show();
		$(".harmony-block").show();
		$.each($(".tablature-block"), function() {
   	   $(this).show();
		});
	}
}


/************************************************
 * setAutoPlay()
 ************************************************/
AutoPlay.setAutoPlay = function(active) {
	AutoPlay.active = active;
	if (AutoPlay.active) {
		WebUtils.saveCookie('autoPlay', 'true');
		AutoPlay.updateTag(true);
	} else {
		WebUtils.saveCookie('autoPlay', 'false');		
		AutoPlay.updateTag(false);
	}
}

/************************************************
 * autoPlayClick()
 ************************************************/
AutoPlay.autoPlayClick = function(e) {
	AutoPlay.setAutoPlay(this.checked);
	location.reload(); // start it
}

/************************************************
 * killAutoPlay()
 ************************************************/
AutoPlay.killAutoPlay = function(e) {
	AutoPlay.setAutoPlay(false);
	location.reload(); // stop it
}

/************************************************
 * init()
 ************************************************/
AutoPlay.init = function() {
	AutoPlay.active = AutoPlay.checkCookie();
	if (AutoPlay.active) {
		// set the UI
		$("#js-auto-play").attr('checked', 'checked');
		AutoPlay.updateTag(true);
	} else {
		AutoPlay.updateTag(false);
	}
}

/************************************************
 * wireup()
 ************************************************/
AutoPlay.wireup = function() {
	AutoPlay.init();
	$('#js-auto-play').click(AutoPlay.autoPlayClick);
	$("#js-autoplay-tag").click(AutoPlay.killAutoPlay);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   AutoPlay.wireup();
});

