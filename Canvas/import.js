// var savedFile = JSON.stringify({"floors":[{"floorNum":1,"RoomObjects":[{"x":760.5,"y":550.5,"width":63,"height":75,"pictureID":"chair3","rotation":0},{"x":372.5,"y":246.5,"width":71,"height":75,"pictureID":"chair2","rotation":0},{"x":457.5,"y":360.5,"width":63,"height":75,"pictureID":"chair1","rotation":0},{"x":573,"y":181,"width":200,"height":200,"pictureID":"table2","rotation":0},{"x":215,"y":145,"width":100,"height":100,"pictureID":"table","rotation":0}],"Walls":[{"thickness":5,"startX":120,"startY":80,"endX":800,"endY":80,"id":1,"connected":[]},{"thickness":5,"startX":120,"startY":600,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":5,"startX":800,"startY":80,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":5,"startX":120,"startY":80,"endX":120,"endY":600,"id":1,"connected":[]}]},{"floorNum":2,"RoomObjects":[{"x":595,"y":85,"width":200,"height":200,"pictureID":"table2","rotation":0}],"Walls":[{"thickness":5,"startX":120,"startY":80,"endX":800,"endY":80,"id":1,"connected":[]},{"thickness":5,"startX":120,"startY":600,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":5,"startX":800,"startY":80,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":5,"startX":120,"startY":80,"endX":120,"endY":600,"id":1,"connected":[]}]}],"name":"name","floorCount":2,"currentFloor":0,"selectedObject":0,"translateX":0,"translateY":0})


// var newBlueprint = importFile(savedFile);
// console.log(newBlueprint);
function importFile(savedFile){
	savedFile = JSON.parse(savedFile);
	var NewBluePrint = new Blueprint(savedFile.name);
	NewBluePrint.floors = copyFloors(savedFile.floors);
	NewBluePrint.name = savedFile.name;
	NewBluePrint.floorCount = savedFile.floorCount;
	NewBluePrint.currentFloor = savedFile.currentFloor;
	NewBluePrint.selectedObject = savedFile.selectedObject;
	//bad code change?
	NewBluePrint.draw = function(){
		drawBackGround();
		drawWalls();
		drawObjects();
	}
	NewBluePrint.redraw = function(){
		clearCanvas();
		blueprint.draw();
	}
	
	NewBluePrint.translateX = savedFile.translateX;
	NewBluePrint.translateY = savedFile.translateY;
	
	
	return NewBluePrint;
}

function copyFloors(floors){ //returns the list of floors 
	var newFloors = [];
	floors.forEach(f => {
		var newFloor = new Floor(f.floorNum);
		newFloor.RoomObjects = copyObjects(f.RoomObjects);
		newFloor.Walls = copyWalls(f.Walls);
		newFloors.push(newFloor);
	})
	
	return newFloors;
}

function copyObjects(roomObjects){ //returns the list of floors 
	var newObjects = [];
	roomObjects.forEach(o => {
		var newObject = new RoomObject(o.width, o.height, o.pictureID);
		newObject.x = o.x;
		newObject.y = o.y;
		newObject.rotation = o.rotation;
		newObjects.push(newObject);
	})
	
	return newObjects;
}

function copyWalls(walls){ //returns the list of floors 
	var newWalls = [];
	walls.forEach(w => {
		var newWall = new Wall(w.startX, w.startY, w.endX, w.endY, w.id);
		newWall.thickness = w.thickness;
		newWall.connected = w.connected;
		newWalls.push(newWall);
	})
	
	return newWalls;
}

function saveFile(){
	var text = JSON.stringify(blueprint)
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	saveAs(blob, blueprint.name + ".ryr");
}

function openFile(){
	var input = document.createElement('input');
	input.type = 'file';
	input.accept = '.ryr';
	input.onchange = (e => { 
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file, 'UTF-8');

		// here we tell the reader what to do when it's done reading...
		reader.onload = readerEvent => {
			var content = readerEvent.target.result; // this is the content!
			blueprint = importFile(content);
			blueprint.redraw();
		}
	})
	input.click();
}
