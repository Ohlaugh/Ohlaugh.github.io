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
	
	if(data[0] === "floorUp") {
		floorUp();
	}
	
	if(data[0] === "floorDown") {
		floorDown();
	}
	
	if(data[0] === "saveFile") {
		saveFile();
	}
	
	if(data[0] === "uploadFile") {
		openFile();
	}
	
	if(data[0] === "updateObject") {
		updateObject(parseInt(data[1]),parseInt(data[2]),parseInt(data[3]),parseInt(data[4]),data[5],parseInt(data[6]));
	}
}

window.addEventListener("message", toolSelection);