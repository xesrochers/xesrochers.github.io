/************************************************
 * Player class definition
 ************************************************/
function Player() {
}

Player.List; 

/************************************************
 * sleep()
 ************************************************/
Player.sleep = function(time) {
	var now = new Date().getTime();
	while (new Date().getTime() < now + time) {
		// do nothing
	}
}

/************************************************
 * playNote()
 ************************************************/
Player.playNote = function(e) {
   var note = $(this).text();
   if (note != null) {
      //console.log(note);
	   note = note.replace("#","s");
	   result = document.getElementById('js-audio');
	   if (result != null) {
         result.src = "/mp3/"+note+".mp3";
         result.play();
         result.currentTime = 0;  
	   }
	}
}

/************************************************
 * wireup()
 ************************************************/
Player.wireup = function() {
	$('.harmony .group i').click(Player.playNote);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Player.wireup();
});



