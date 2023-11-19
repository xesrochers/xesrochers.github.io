/************************************************
 * Toggle class definition
 ************************************************/
function Toggle() {
}

/************************************************
 * toggle()
 ************************************************/
Toggle.toggle = function() {
	var href = $(this).attr('href');
	$(href).toggle();
}

/************************************************
 * toggleNext()
 * Same as toggle, but does the adjacent node
 ************************************************/
Toggle.toggleNext = function() {
   var href = $(this).parent().next();
   $(href).toggle();
}

/************************************************
 * wireup()
 ************************************************/
Toggle.wireup = function() {
   $('.toggle').click(Toggle.toggle);
   $('.toggle-next').click(Toggle.toggleNext);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Toggle.wireup();
});



