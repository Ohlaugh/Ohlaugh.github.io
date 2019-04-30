var globalX;
var globalY;
var globalID;

function autoFill(x, y, width, height, pictureID, rotation) {
	if(pictureID != "") {		
		globalX = x;
		globalY = y;
		globalID = pictureID;
		var heightfeet = height/40;
		var widthfeet = width/40;
		document.getElementById('rotation').value = rotation;
		document.getElementById('inputWidth').value = widthfeet;
		document.getElementById('inputLength').value = heightfeet;
	}
	else {
		document.getElementById('rotation').value = null;
		document.getElementById('inputWidth').value = null;
		document.getElementById('inputLength').value = null;
	}
}