/************************************************
 * Chords class definition
 ************************************************/
function Chords() {
}

/************************************************
 * Chords attributes
 ************************************************/
Chords.scale = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

/************************************************
 * normalize()
 ************************************************/
Chords.normalize = function(chord) {
	return chord.replace('Bb','A#').replace('Db','C#').replace('Eb','D#').replace('Gb','F#').replace('Ab','G#');
}


/************************************************
 * isSpace()
 ************************************************/
Chords.isSpace = function(item) {
	return (item == ' ' || item == '\t');
}

/************************************************
 * isChord()
 ************************************************/
Chords.isChord = function(chord) {
	var result = false;
	if (chord.length >0) {
		result |= chord[0] == 'A'; 
		result |= chord[0] == 'B'; 
		result |= chord[0] == 'C'; 
		result |= chord[0] == 'D'; 
		result |= chord[0] == 'E'; 
		result |= chord[0] == 'F'; 
		result |= chord[0] == 'G'; 
	}
	return result; 
}


/************************************************
 * noteSplit()
 ************************************************/
Chords.noteSplit = function(chord) {
    var result = ['',''];
    if (chord.length == 1) {
   	  	result[0] = chord;
    } else if ((chord.length == 2) && (chord.charAt(1) == '#')) {
		result[0] = chord;
    } else {
    	if (chord.charAt(1) == '#') {
			result[0] = chord.substring(0,2);
			result[1] = chord.substring(2,chord.length);
    	} else {
			result[0] = chord.substring(0,1);
			result[1] = chord.substring(1,chord.length);    		
    	}
    }
    return result;
}

/************************************************
 * transposeIndex()
 ************************************************/
Chords.transposeIndex = function(index) {
	var result = index;
	if (index > 11) {
      result = 0;
	} else if (index < 0) {
		result = 11;
	}
	return result;
}

/************************************************
 * transposeChord()
 ************************************************/
Chords.transposeChord = function(chord, delta) {
	var result = chord;

	chord = Chords.normalize(chord);
	var note = Chords.noteSplit(chord);
	var base = Chords.scale.indexOf(note[0]);
	var index = Chords.transposeIndex(base + delta);

	result = Chords.scale[index] + note[1];

	return result;
}

/************************************************
 * transposeLine()
 ************************************************/
Chords.transposeLine = function(chords, delta) {
	var result = '';
	var SPACE = 0;
	var BUILD = 1;
	
	/// Line state machine
	var i = 0; 
	var state = SPACE;
	var chord = '';
	while (i < chords.length) {
		var item = chords[i];
		switch (state) {
			case SPACE: 
			  if (Chords.isSpace(item)) {
			  	result += item; 
			  } else {
			  	chord = item; // start fresh
			  	state = BUILD;
			  }
			  break;

			case BUILD: 
			  if (Chords.isSpace(item)) {
			  	if (Chords.isChord(chord)) {
			  		result += Chords.transposeChord(chord, delta);
			  		chord = ''; // reset chord buffer
			  	} else {
			  		result += chord; // not a chord... just append what was there
			  	}
			  	result += item; // Append whatever was there 
			  	state = SPACE;
			  } else {
			  	chord += item; // Append to chord buffer
			  }
			  break;
		}
		i++;
	}

	// Process last chord in the line
	if (state == BUILD) {
		if (Chords.isChord(chord)) {
			result += Chords.transposeChord(chord, delta);
		} else {
			result += chord; // not a chord... just append what was there
		}
	}

	return result;
}


/************************************************
 * transposeSong()
 ************************************************/
Chords.transposeSong = function(delta) {
	$('p.chord').each(function () {
		var line = $(this).text();
		var chords = Chords.transposeLine(line, delta);
		$(this).text(chords);
	});
}

/************************************************
 * transpose()
 ************************************************/
Chords.transpose = function(e) {
	e.preventDefault();

	var delta = 1;
	if ($(this).hasClass("down")) {
		delta = -1;
	}
    
	var from = Chords.normalize($('#key').html());
	var to = Chords.transposeChord(from, delta);
	Chords.transposeSong(delta);		

	$('#key').html(to)
}


/************************************************
 * scrape()
 ************************************************/
Chords.scrape = function() {
	var chords = $('p.chord');
	if ((chords != null) && (chords.length > 0)) {
		var chords = $($('p.chord')[0]).text();
		chords = chords.replace(/-/g, ''); // remove dashes
		chords = chords.replace(/ +(?= )/g,''); // remove duplicate spaces
		chords = $.trim(chords); // remove leading and trailing spaces

		$('#chords').val(chords);

		// Now set the origin
		var origin = chords[0];
		$('#key').html(origin);
	}
}

/************************************************
 * hideNav()
 * hack to get rid of the nav on song collections
 ************************************************/
Chords.hideNav = function() {
	if ($('.song-collection').size()) {
		$('nav').hide();
	}
}

/************************************************
 * wireup()
 ************************************************/
Chords.wireup = function() {
	$('#js-transpose a').click(Chords.transpose);
	Chords.scrape();
}

/************************************************
 * jQuery.ready()
 ************************************************/
$(function() {
   Chords.wireup();
});
