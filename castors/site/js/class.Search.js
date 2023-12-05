/************************************************
 * SearchBox class definition
 ************************************************/
function SearchBox() {
}

/************************************************
 * wireup()
 ************************************************/
SearchBox.wireup = function() {
    $('#searchbox-js').fastLiveFilter('.searchdata-js');
    
    // kick the filter when we have data in the search box
    var val = $('#searchbox-js').val();
    if (val != '') {
    	$('#searchbox-js').change();
    }
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   SearchBox.wireup();
});
