function selectTool() {			
	window.parent.postMessage("selectTool", "*");
}

function panTool() {			
	window.parent.postMessage("panTool", "*");
}

function wallTool() {			
	window.parent.postMessage("wallTool", "*");
}

function addFurniture(width, height, pictureID) {
	var args = width +"," + height + "," + pictureID;
	window.parent.postMessage("addFurniture," + args, "*");
}

function saveFile() {
	window.parent.postMessage("saveFile", "*");
}

function uploadFile() {
	window.parent.postMessage("uploadFile", "*");
}