/************************************************
 * TabSlide class definition
 ************************************************/
function TabSlide() {
}

/************************************************
 * TabSlide attributes
 ************************************************/
TabSlide.open   = "&bull;"
TabSlide.close  = "o"
TabSlide.state  = "hide";

/************************************************
 * appendHandle()
 ************************************************/
TabSlide.appendHandle = function(append) {
   TabSlide.open  = TabSlide.open + append;
   TabSlide.close = TabSlide.close + append;
   $('.tab-handle').html(TabSlide.open);
}


/************************************************
 * hide()
 ************************************************/
TabSlide.hide = function() {
   TabSlide.state = 'hide';
   $('.tab-handle').html(TabSlide.open);
   $('.tab-slide').hide(300);
}

/************************************************
 * show()
 ************************************************/
TabSlide.show = function() {
   TabSlide.state = 'show';
   $('.tab-handle').html(TabSlide.close);
   $('.tab-slide').show(300); 
}

/************************************************
 * toggle()
 ************************************************/
TabSlide.toggle = function(e) {
   e.preventDefault();

   if (TabSlide.state == 'hide') {
      TabSlide.show();
   } else {
      TabSlide.hide();      
   }
}


/************************************************
 * wireup()
 ************************************************/
TabSlide.wireup = function() {
   $('.tab-slide').hide();
   $('.tab-handle').html(TabSlide.open);
   $('.tab-handle').click(TabSlide.toggle);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   TabSlide.wireup();
});



