var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");



var startX;
var startY;
var isDown = false;
var currentTool = "select";



var floor1 = new Floor(1);
var blueprint = new Blueprint("name");
blueprint.add(floor1);
blueprint.floors[0].add(table2,10 , 15);
blueprint.floors[0].add(table,10 , 15);
blueprint.currentFloor = 0;
blueprint.selectedObject = 0;

blueprint.draw = function(){
	var currentFloor = blueprint.currentFloor;
	
	var Objects = blueprint.floors[currentFloor].RoomObjects;
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	for(var i = Objects.length - 1; i >= 0; i--){
		var img = document.getElementById(Objects[i].pictureID);
		context.drawImage(img, Objects[i].x + translateX, Objects[i].y + translateY, Objects[i].width, Objects[i].height);
	}
	//blueprint.floors[currentFloor].RoomObjects.forEach(RoomObject => {
	//})
}

window.onload = startUp;
function onMouseDownCanvas(){
	isDown = true;
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;

	blueprint.objectCollision(startX, startY);
	
	context.beginPath();
	context.arc(startX, startY, 4, 0, 2 * Math.PI);
	context.stroke();
	
	blueprint.draw();
	
}

function onMouseUpCanvas(){
	isDown = false;
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;

	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
	
	blueprint.draw();

	
}

function onMouseMoveCanvas(){
	if(!isDown)
		return;
	clearCanvas();
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;

	context.beginPath();
	context.arc(startX, startY, 4, 0, 2 * Math.PI);
	context.stroke();
	
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
	
	var currentFloor = blueprint.currentFloor;
	var selectedObject = blueprint.selectedObject;
	if(selectedObject >= 0)
		blueprint.floors[currentFloor].RoomObjects[selectedObject].translate(endX - startX, endY - startY);
	
	startX = event.offsetX;
	startY = event.offsetY;
	
	blueprint.draw();
	
}

function onMouseDownPan(){
	isDown = true;
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;
}

function onMouseUpPan(){
	isDown = false;
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;
	//blueprint.draw();
}

function onMouseMovePan(){
	if(!isDown)
		return;
	clearCanvas();
	
	var endX = event.offsetX;
	var endY = event.offsetY;
	
	blueprint.translate(endX - startX, endY - startY);
	
	blueprint.draw();
	
	
	startX = event.offsetX;
	startY = event.offsetY;
}


function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}


function handelMouseDown(){
	if(currentTool == "select"){
		return onMouseDownCanvas();
	} else if(currentTool == "pan"){
		return onMouseDownPan();
	}
}

function handelMouseUp(){
	if(currentTool == "select"){
		return onMouseUpCanvas();
	} else if(currentTool == "pan"){
		return onMouseUpPan();
	}
}

function handelMouseMove(){
	if(currentTool == "select"){
		return onMouseMoveCanvas();
	} else if(currentTool == "pan"){
		return onMouseMovePan();
	}
}

function selectTool(){
	currentTool = "select";
	canvas.style.cursor = ""
}

function panTool(){
	currentTool = "pan";
	canvas.style.cursor = "move"
}

function startUp(){
	console.log(convasDiv.offsetHight);
	canvas.width = convasDiv.offsetWidth;
	canvas.height = convasDiv.offsetHeight;
	canvas.addEventListener("mousedown", handelMouseDown);
	canvas.addEventListener("mouseup", handelMouseUp);
	canvas.addEventListener("mousemove", handelMouseMove);
	
	blueprint.draw();
}

/*

CanvasRenderingContext2D.translate()
Adds a translation transformation by moving the canvas and its origin x horzontally and y vertically on the grid.


*/