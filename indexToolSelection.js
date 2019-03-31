var frame = document.getElementById("canvasFrame");

function toolSelection(event) {
	var data = event.data.split(",");
	
	if(data[0] === "selectTool") {
		frame.contentWindow.postMessage("selectTool", "*");
	}
	
	if(data[0] === "panTool") {	
		frame.contentWindow.postMessage("panTool", "*");
	}

	if(data[0] === "wallTool") {
		frame.contentWindow.postMessage("wallTool", "*");
	}
	
	if(data[0] === "addFurniture") {
		frame.contentWindow.postMessage(event.data, "*");
	}
	
	if(data[0] === "floorUp") {
		frame.contentWindow.postMessage("floorUp", "*");
	}
	
	if(data[0] === "floorDown") {
		frame.contentWindow.postMessage("floorDown", "*");
	}
}
		
window.addEventListener("message", toolSelection);