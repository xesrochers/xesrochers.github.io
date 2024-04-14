/************************************************
 * Random class definition
 ************************************************/
function Random() {
}

Random.Colors = [ "#b18e50", "#1eaedb" ];
  //   "#ffd7d5",
  //   "#ffe9d6",
  //   "#ffffd1",
  //   "#d6ffda",
  //   "#d7eeff",
  //   "#dad6ff",
  //   "#ffd6e8",
  //   "#f5f5dc",
  //   "#f4e4e4",
  //   "#e4e6f4" 
  // ];


/************************************************
 * randomColor()
 * Same as toggle, but does the adjacent node
 ************************************************/
Random.randomColor = function() {
   return Random.Colors[Math.floor(Math.random() * Random.Colors.length)];
}

/************************************************
 * wireup()
 ************************************************/
Random.wireup = function() {
   $('.random.color').each( function() {
      var color = Random.randomColor();
      $(this).css('background-color', color);
   });
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Random.wireup();
});



