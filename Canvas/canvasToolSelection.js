function toolSelection(event) {
	if(event.data === "selectTool") {
		selectTool();
	}	

	if(event.data === "panTool") {
		panTool();
	}			
}
		
window.addEventListener("message", toolSelection);