/************************************************
 * Gallery class definition
 ************************************************/
function Gallery() {
}


/************************************************
 * applyFilter()
 ************************************************/
Gallery.applyFilter = function() {
   var filter = $(this).attr('filter');

   $('#gallery .button').removeClass('active');
   $(this).addClass('active');

   if (filter == '') {
      $('#gallery .block').show();
   } else {
      $('#gallery .block').hide();
      $('#gallery .block.'+filter).show(); 
   }

}

/************************************************
 * show()
 ************************************************/
Gallery.show = function() {
   alert("Show Me!");
}

/************************************************
 * wireup()
 ************************************************/
Gallery.wireup = function() {
   $('#gallery img').click(Gallery.show);
   $('#gallery #filters button').click(Gallery.applyFilter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Gallery.wireup();
});
