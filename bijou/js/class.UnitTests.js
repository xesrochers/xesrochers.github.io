/************************************************
 * UnitTests class definition
 ************************************************/
function UnitTests() {
}


/************************************************
 * updateSummary()
 ************************************************/
UnitTests.updateSummary = function() {
   $("#js-pass-count").html($('.pass').size()-1);
   $("#js-fail-count").html($('.fail').size()-1);
   $("#js-skip-count").html($('.skip').size()-1);
}

/************************************************
 * wireup()
 ************************************************/
UnitTests.wireup = function() {
   UnitTests.updateSummary();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   UnitTests.wireup();
});

