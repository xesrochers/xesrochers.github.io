/************************************************
 * Search class definition
 ************************************************/
function Search() {
}


/************************************************
 * filter()
 ************************************************/
Search.filter = function() {
  var f = $(this).val();
  var regex = new RegExp(f, 'gi');

  $('h2').hide();
  $('.song-list li').hide()
  $('.song-list li').hide()
    .each(function() {
      if($(this).find('a').html().match(regex)) {
         $(this).show();
      }
   });
}

/************************************************
 * wireup()
 ************************************************/
Search.wireup = function() {
   $('#filter').keyup(Search.filter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Search.wireup();
});
