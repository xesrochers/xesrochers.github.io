/************************************************
 * SearchBox class definition
 ************************************************/
function SearchBox() {
}


/************************************************
 * filter()
 ************************************************/
SearchBox.filter = function() {
  var f = $(this).val();
  var regex = new RegExp(f, 'gi');

  $('.search-data').children().hide();
  $('.search-data').children().each(function() {
      if($(this).html().match(regex)) {
         $(this).show();
      }
   });
}

/************************************************
 * wireup()
 ************************************************/
SearchBox.wireup = function() {
   $('#search-box').keyup(SearchBox.filter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   SearchBox.wireup();
});
