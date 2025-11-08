/************************************************
 * TopNav class definition
 ************************************************/
function TopNav() {
}


/************************************************
 * showHide()
 ************************************************/
TopNav.showHide = function(e) {
  e.preventDefault();
  // $('#topnav a').attr('style','display: block');  
  if ($('#topnav').hasClass('expand')) {
    $('#topnav').removeClass('expand');
  } else {
    $('#topnav').addClass('expand');
  }
  $('#topnav .hamburger').show();
}



/************************************************
 * wireup()
 ************************************************/
TopNav.wireup = function() {
    $('#topnav .hamburger').click(TopNav.showHide);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
    TopNav.wireup();
});
