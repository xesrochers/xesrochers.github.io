/************************************************
 * Filter class definition
 ************************************************/
function Filter() {
}


/************************************************
 * renderFilterBar()
 ************************************************/
Filter.renderFilterBar = function() {
   if ($('#filters').length >0 ){
      var list = "";
      var all = ($('html').attr('lang') == 'en-ca') ? 'all' : 'tous'; 
      var buttons = "<a class='button active' filter=''>"+all+"</a>";
      $('[filter]').each(function() {
         var filter = $(this).attr('filter');
         if (!list.includes(filter)) {
            buttons += "<a class='button' filter='"+filter+"'>"+filter+"</a>";
            list += " "+filter;
         } 
      });

      $("#filters").html(buttons);
   }
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
      $('.filter-list [filter]').show();
   } else {
      $('.filter-list [filter]').hide();
      $('.filter-list [filter='+filter+']').show(); 
   }
}

/************************************************
 * wireup()
 ************************************************/
Filter.wireup = function() {
   Filter.renderFilterBar();
   $('#filters .button').click(Filter.applyFilter);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Filter.wireup();
});

