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
}
		
window.addEventListener("message", toolSelection);