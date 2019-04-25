function floorUp() {			
	window.parent.postMessage("floorUp", "*");
}

function floorDown() {			
	window.parent.postMessage("floorDown", "*");
}

function updateObject(x, y, width, height, pictureID, rotation) {
	var args = x + "," + y + "," + width + "," + height + "," + pictureID + "," + rotation;
	window.parent.postMessage("updateObject,"+ args, "*");
}