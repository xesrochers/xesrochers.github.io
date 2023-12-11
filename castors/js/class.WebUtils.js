/************************************************
 * WebUtils class definition
 ************************************************/
function WebUtils() {
}

/************************************************
 * WebUtils attributes
 ************************************************/
WebUtils.active = false; 


/************************************************
 * getPath()
 ************************************************/
WebUtils.getPath = function() {
    return window.location.pathname.replace(".html","");
}

/************************************************
 * refresh()
 ************************************************/
WebUtils.refresh = function(e) {
    e.preventDefault();
    location.reload(true); // loads CSS and JS
    window.location.replace(window.location.href); // go top
}


/************************************************
 * readQueryString()
 ************************************************/
WebUtils.readQueryString = function(key) {
    var result = '';

    var regexS = "[\\?&]"+key+"=([^&#]*)", 
    regex = new RegExp( regexS ),
    results = regex.exec( window.location.search );
    if( results != null ){
        result = decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    return result;
}


/************************************************
 * hasDomConfig()
 ************************************************/
WebUtils.hasDomConfig = function() {
    var result = false;

    var config = $('.config');
    if (config.length) {
       result = true;
    }

    return result;
}

/************************************************
 * readDomConfig()
 ************************************************/
WebUtils.readDomConfig = function(key, def) {
    var result = def;

    var config = $('#'+key);
    if (config.length) {
        result = config.attr('value');
    }

    return result;
}


/************************************************
 * saveCookie()
 ************************************************/
WebUtils.saveCookie = function(key, def) {
    var domainName = window.location.hostname;
    document.cookie = key + '=' + def +'; path=/; domain=.' + domainName;
}

/************************************************
 * readStorage()
 ************************************************/
WebUtils.readStorage = function(key, def) {
    var result = def;
    var key = WebUtils.getPath() + "-" + key;
    test = localStorage.getItem(key);
    if (test !== null) {
        result = test;
    }
    return result;
}

/************************************************
 * saveStorage()
 ************************************************/
WebUtils.saveStorage = function(key, val) {
    var result = val;
    var key = WebUtils.getPath() + "-" + key;
    localStorage.setItem(key, val);
}

/************************************************
 * readCookie()
 ************************************************/
WebUtils.readCookie = function(key, def) {
 // Get name followed by anything except a semicolon
  var cookiestring=RegExp(key+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

/************************************************
 * wireup()
 ************************************************/
WebUtils.wireup = function() {
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   WebUtils.wireup();
});


