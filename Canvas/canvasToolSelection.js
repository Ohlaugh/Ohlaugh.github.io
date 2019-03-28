function toolSelection(event) {
	if(event.data === "selectTool") {
		selectTool();
	}	

	if(event.data === "panTool") {
		panTool();
	}	
	
	if(event.data === "wallTool") {
		wallTool();
	}			
}
		
window.addEventListener("message", toolSelection);