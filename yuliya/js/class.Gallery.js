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
      $('#gallery .item').show(500);
   } else {
      $('#gallery .item').hide();
      $('#gallery .item.'+filter).show(500); 
   }

}

/************************************************
 * show()
 ************************************************/
Gallery.show = function(e) {
   e.preventDefault();
   var model = $(this).attr('href');
   $(model).show(500);
   //$('#gallery .modal.'+id).show(500);
}

/************************************************
 * close()
 ************************************************/
Gallery.close = function(e) {
   e.preventDefault();
   $('#gallery .modal').hide(500);
}

/************************************************
 * wireup()
 ************************************************/
Gallery.wireup = function() {
   $('#gallery .view').click(Gallery.show);
   $('#gallery .close').click(Gallery.close);
   $('#gallery #filters button').click(Gallery.applyFilter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Gallery.wireup();
});
