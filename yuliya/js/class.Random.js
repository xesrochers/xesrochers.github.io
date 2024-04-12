/************************************************
 * Random class definition
 ************************************************/
function Random() {
}

Random.Colors = [
    "#ffd7d5",
    "#ffe9d6",
    "#ffffd1",
    "#d6ffda",
    "#d7eeff",
    "#dad6ff",
    "#ffd6e8",
    "#f5f5dc",
    "#f4e4e4",
    "#e4e6f4" 
  ];


/************************************************
 * randomColor()
 * Same as toggle, but does the adjacent node
 ************************************************/
Random.randomColor = function() {
   var color = colors[Math.floor(Math.random() * colors.length)];
   this.style.backgroundColor = color;
}

/************************************************
 * wireup()
 ************************************************/
Random.wireup = function() {
   $('.random.color').randomColor();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Random.wireup();
});



