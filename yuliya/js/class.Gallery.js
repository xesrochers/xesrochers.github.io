/************************************************
 * Gallery class definition
 ************************************************/
function Gallery() {
}

/************************************************
 * applyFilter()
 ************************************************/
Gallery.applyFilter = function(e) {
   e.preventDefault()

   var filter = $(this).attr('filter');

   $('#gallery .button').removeClass('active');
   $(this).addClass('active');

   if (filter == '') {
      $('#gallery .item').show();
   } else {
      $('#gallery .item').hide();
      $('#gallery .item.'+filter).show(); 
   }
}

/************************************************
 * wireup()
 ************************************************/
Gallery.wireup = function() {
   $('#gallery #filters .button').click(Gallery.applyFilter);
   lightbox.option({'resizeDuration': 200,'wrapAround': true});
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Gallery.wireup();
});
