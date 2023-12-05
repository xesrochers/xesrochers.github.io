/************************************************
 * Url class definition
 ************************************************/
function Url() {
}

/************************************************
 * qs()
 ************************************************/
Url.qs = function(key) {
	var result = '';

	var regexS = "[\\?&]"+key+"=([^&#]*)", 
	regex = new RegExp( regexS ),
	results = regex.exec( window.location.search );
	if( results != null ){
		result = decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	return result;
}

/************************************************
 * wireup()
 ************************************************/
Url.wireup = function() {
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   //Url.wireup();
});



