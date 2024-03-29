/************************************************
 * Slider class definition
 ************************************************/
function Slider() {
}


Slider.active = 0;


/************************************************
 * getActive()
 * Determine the index of the slide to show
 ************************************************/
Slider.getActive = function(length) {
  result = Slider.active + 1;
  if (result >= length) result = 0;
  return result;
}


/************************************************
 * run()
 ************************************************/
Slider.run = function() {
  slides = $('.slide');

  //alert("showing "+Slider.active);

  // Start fresh, hide all slides
  slides.each(function(index) {
    $(this).hide();
  });


  // Show the active slide 
  slides.each(function( index ) {
    if (Slider.active == index) $(this).show();
  });

  // Update the active tracer
  $( ".dot" ).each(function( index ) {
    if (Slider.active == index) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');      
    }
  });

  // Update the active slide
  Slider.active = Slider.getActive(slides.length);

  // Auto run the slider
  setTimeout(Slider.run, 5000);
}


/************************************************
 * wireup()
 ************************************************/
Slider.wireup = function() {
    Slider.run();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
    Slider.wireup();
});
