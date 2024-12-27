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
TabSlide.extra  = "";

/************************************************
 * setExtra()
 ************************************************/
TabSlide.setExtra = function(extra) {
   var dom = "<br><span class='extra'>"+extra+"</span>"
   TabSlide.open  = "&bull;" + dom;
   TabSlide.close = "o" + dom;
   $('.tab-handle').html(TabSlide.open);
}

/************************************************
 * setExtraoverrideTag()
 ************************************************/
TabSlide.overrideTag = function(active) {
   if (active) {
      $('.tab-handle').addClass('override-active');
   } else {
      $('.tab-handle').removeClass('override-active');
   }
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



