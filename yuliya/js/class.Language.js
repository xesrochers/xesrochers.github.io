/************************************************
 * Language class definition
 ************************************************/
function Language() {
}

/************************************************
 * flip()
 ************************************************/
Language.flip = function() {
	var lang = $('html').attr('lang');
   if (lang == 'en-ca') {
      $('html').attr('lang', 'fr-ca');
   } else {
      $('html').attr('lang', 'en-ca');
   }
}

/************************************************
 * init()
 * Set language as per URL path
 ************************************************/
Language.init = function() {
   if (window.location.href.indexOf("/fr") != -1) {
      $('html').attr('lang', 'fr-ca');
   }
}

/************************************************
 * wireup()
 ************************************************/
Language.wireup = function() {
   $('#language').click(Language.flip);

   Language.init();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Language.wireup();
});



