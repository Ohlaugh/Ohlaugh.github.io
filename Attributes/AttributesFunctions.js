function floorUp() {			
	window.parent.postMessage("floorUp", "*");
}

function floorDown() {			
	window.parent.postMessage("floorDown", "*");
}

function updateObject(x, y, width, height, pictureID, rotation) {
	var calcWidth = parseInt(width)*40;
	var calcHeight = parseInt(height)*40;
	var args = x + "," + y + "," + calcWidth + "," + calcHeight + "," + pictureID + "," + rotation;
	window.parent.postMessage("updateObject,"+ args, "*");
}