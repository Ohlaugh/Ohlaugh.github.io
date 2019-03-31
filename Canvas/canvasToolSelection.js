function toolSelection(event) {
	var data = event.data.split(",");
	
	if(data[0] === "selectTool") {
		selectTool();
	}	

	if(data[0] === "panTool") {
		panTool();
	}	
	
	if(data[0] === "wallTool") {
		wallTool();
	}

	if(data[0] === "addFurniture") {
		addFurniture(parseInt(data[1]),parseInt(data[2]),data[3]);
	}
}
		
window.addEventListener("message", toolSelection);