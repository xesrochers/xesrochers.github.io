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

  $('h2').hide();
  $('.search-data li').hide()
  $('.search-data li').hide()
    .each(function() {
      if($(this).find('a').html().match(regex)) {
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
