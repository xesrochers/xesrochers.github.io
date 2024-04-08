/************************************************
 * Filter class definition
 ************************************************/
function Filter() {
}

/************************************************
 * applyFilter()
 ************************************************/
Filter.applyFilter = function(e) {
   e.preventDefault()

   var filter = $(this).attr('filter');

   $('#filters .button').removeClass('active');
   $(this).addClass('active');

   if (filter == '') {
      $('.filter-list .item').show();
   } else {
      $('.filter-list .item').hide();
      $('.filter-list .item[filter='+filter+']').show(); 
   }
}

/************************************************
 * wireup()
 ************************************************/
Filter.wireup = function() {
   $('#filters .button').click(Filter.applyFilter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Filter.wireup();
});
