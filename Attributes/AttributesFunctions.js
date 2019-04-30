function floorUp() {			
	window.parent.postMessage("floorUp", "*");
}

function floorDown() {			
	window.parent.postMessage("floorDown", "*");
}

function updateObject(width, height, rotation) {
	if(width != "") {		
		x = globalX;
		y = globalY;
		pictureID = globalID;
		var calcWidth = parseFloat(width)*40;
		var calcHeight = parseFloat(height)*40;
		var args = x + "," + y + "," + calcWidth + "," + calcHeight + "," + pictureID + "," + rotation;
		window.parent.postMessage("updateObject,"+ args, "*");
	}
}

function toolSelection(event) {
	var data = event.data.split(",");
	
	if(data[0] === "objectSelected") {
		autoFill(parseFloat(data[1]),parseFloat(data[2]),parseFloat(data[3]),parseFloat(data[4]),data[5],parseFloat(data[6]));
	}
}

window.addEventListener("message", toolSelection)