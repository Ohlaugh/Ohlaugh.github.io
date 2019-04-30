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
		var calcWidth = parseInt(width)*40;
		var calcHeight = parseInt(height)*40;
		var args = x + "," + y + "," + calcWidth + "," + calcHeight + "," + pictureID + "," + rotation;
		window.parent.postMessage("updateObject,"+ args, "*");
	}
}

function toolSelection(event) {
	var data = event.data.split(",");
	
	if(data[0] === "objectSelected") {
		autoFill(parseInt(data[1]),parseInt(data[2]),parseInt(data[3]),parseInt(data[4]),data[5],parseInt(data[6]));
	}
}

window.addEventListener("message", toolSelection)