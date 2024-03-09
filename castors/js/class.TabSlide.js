/************************************************
 * TabSlide class definition
 ************************************************/
function TabSlide() {
}

/************************************************
 * TabSlide attributes
 ************************************************/
TabSlide.height = 50;
TabSlide.handle = "&lt;";

/************************************************
 * setHandle()
 ************************************************/
TabSlide.setHandle = function(handle) {
   TabSlide.handle = handle;
   $('.tab-handle').html(TabSlide.handle);
}


/************************************************
 * hide()
 ************************************************/
TabSlide.hide = function() {
   $('.tab-handle').html(TabSlide.handle).hide(300);
   $('.tab-slide').hide(300);
}

/************************************************
 * show()
 ************************************************/
TabSlide.show = function() {
   $('.tab-handle').html(TabSlide.handle).show(300);
   $('.tab-slide').hide(300); // make sue it's hidden 
}

/************************************************
 * toggle()
 ************************************************/
TabSlide.toggle = function(e) {
   e.preventDefault();

   $('.tab-slide').toggle(300);
   var hook = $('.tab-handle').html();
   if (hook == "X") {
      $('.tab-handle').html(TabSlide.handle);
   } else {
      $('.tab-handle').html("X");
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



