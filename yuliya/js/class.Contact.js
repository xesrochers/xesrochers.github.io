/************************************************
 * Contact class definition
 ************************************************/
function Contact() {
}

Contact.email = 'mailto:info@yuliyafineart.com';

/************************************************
 * contact()
 ************************************************/
Contact.contact = function(e) {
   window.location.replace(Contact.email);
}

/************************************************
 * wireup()
 ************************************************/
Contact.wireup = function() {
   $('#contact a').click(Contact.contact);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Contact.wireup();
});
