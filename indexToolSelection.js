var frame = document.getElementById("canvasFrame");

function toolSelection(event) {
	if(event.data === "selectTool") {
		frame.contentWindow.postMessage("selectTool", "*");
	}
	
	if(event.data === "panTool") {	
		frame.contentWindow.postMessage("panTool", "*");
	}

	if(event.data === "wallTool") {
		frame.contentWindow.postMessage("wallTool", "*");
	}	
}
		
window.addEventListener("message", toolSelection);