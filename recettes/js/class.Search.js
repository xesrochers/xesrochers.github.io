"use strict";

/************************************************
 * Search constructor
 ************************************************/
function Search() {
}


/************************************************
 * wireup()
 ************************************************/
Search.wireup = function() {
	$('#searchbox-js').fastLiveFilter('.searchdata-js');
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Search.wireup();
});
