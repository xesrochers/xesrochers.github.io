/************************************************
 * TabSlide class definition
 ************************************************/
function TabSlide() {
}

/************************************************
 * TabSlide attributes
 ************************************************/
TabSlide.height = 50;


/************************************************
 * hide()
 ************************************************/
TabSlide.hide = function() {
   $('.tab-handle').html("&lt;").hide(300);
   $('.tab-slide').hide(300);
}

/************************************************
 * show()
 ************************************************/
TabSlide.show = function() {
   $('.tab-handle').html("&lt;").show(300);
   $('.tab-slide').hide(300); // make sue it's hidden 
}

/************************************************
 * toggle()
 ************************************************/
TabSlide.toggle = function(e) {
   e.preventDefault();

   $('.tab-slide').toggle(300);
   var hook = $('.tab-handle').html();
   if (hook == "&lt;") {
      $('.tab-handle').html("X");
   } else {
      $('.tab-handle').html("&lt;");
   }
}


/************************************************
 * wireup()
 ************************************************/
TabSlide.wireup = function() {
   $('.tab-slide').hide();
   $('.tab-handle').click(TabSlide.toggle);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   TabSlide.wireup();
});



