/************************************************
 * Login class definition
 ************************************************/
function Login() {
}



/************************************************
 * applyLogin()
 ************************************************/
Login.login = function(e) {
   e.preventDefault();

   var usr = $('#usr').val();
   var pwd = $('#pwd').val();

   if ((usr == 'Yuliya') && (pwd == 'bijou')) {
      $('#login').hide();
      $('#admin').show();   
   } else {
      if ($('.error').length == 0) {
         $('#login button').after( "<p class='error'>Invalid Username/Password</p>" );
      }
   }
}

/************************************************
 * wireup()
 ************************************************/
Login.wireup = function() {
   $('#login button').click(Login.login);
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Login.wireup();
});
