/************************************************
 * ReadMore class definition
 ************************************************/
function ReadMore() {
}


/************************************************
 * toggle()
 ************************************************/
ReadMore.toggle = function(e) {
   e.preventDefault();
   $(this).hide().next().toggle();
}

/************************************************
 * hideItems()
 ************************************************/
ReadMore.hideItems = function() {

   if ($('.readmore').length >0 ){
      $('.readmore').each(function() {
         $(this).hide();
         $(this).before("<a class='read-toggle' href='#''>&gt;&gt;&gt;</a>");
      });
   }

}

/************************************************
 * wireup()
 ************************************************/
ReadMore.wireup = function() {
   ReadMore.hideItems();
   $('.read-toggle').click(ReadMore.toggle);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   ReadMore.wireup();
});
