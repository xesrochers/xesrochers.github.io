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
 * init()
 ************************************************/
TabSlide.init = function() {
	$('.tab-slide').tabSlideOut({
            tabHandle: '.tab-slide-handle',             //class of the element that will become your tab
            //pathToTabImage: 'images/contact_tab.gif', //path to the image for the tab //Optionally can be set using css
            imageHeight: '80px',                        //height of tab image           //Optionally can be set using css
            imageWidth: '40px',                         //width of tab image            //Optionally can be set using css
            tabLocation: 'right',                       //side of screen where tab lives, top, right, bottom, or left
            speed: 300,                                 //speed of animation
            action: 'click',                            //options: 'click' or 'hover', action to trigger animation
            topPos: '10%',                              //position from the top/ use if tabLocation is left or right
            leftPos: '20px',                            //position from left/ use if tabLocation is bottom or top
            fixedPosition: true                         //options: true makes it stick(fixed position) on scroll
        });
}


/************************************************
 * wireup()
 ************************************************/
TabSlide.wireup = function() {
	TabSlide.init();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   TabSlide.wireup();
});



