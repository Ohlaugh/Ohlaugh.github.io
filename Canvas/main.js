var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");

/// settings

var darkColor = "#000000"; //color of background grid
var lightColor = "#DDDDDD"; //color of gray background grid
var baseWidthpx = 40; //pixels between smaller background grid
var darkerSize = 6; //grid squares between darker lines

/// end settings
	

var startX;
var startY;
var isDown = false;
var currentTool = "select";



var floor1 = new Floor(1);
var blueprint = new Blueprint("name");
blueprint.add(floor1);
blueprint.floors[0].add(table2, 10, 15);
blueprint.floors[0].add(table, 10, 15);
blueprint.floors[0].Walls.push(new Wall(100, 50, 400, 100, 1));
blueprint.floors[0].Walls.push(new Wall(400, 100, 400, 500, 2));
blueprint.currentFloor = 0;
blueprint.selectedObject = 0;
window.onload = startUp;

blueprint.draw = function(){
	drawBackGround();
	drawWalls();
	drawObjects();
	
	//blueprint.floors[currentFloor].RoomObjects.forEach(RoomObject => {
	//})
}

function drawBackGround(){
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	
	
	
	//draw columns
	var startColumnX = 0 + (translateX % baseWidthpx);
	for(var i = startColumnX; i < canvas.width; i += baseWidthpx){
		if((i - translateX) % (darkerSize * baseWidthpx) == 0){
			context.strokeStyle = darkColor;
		} else {
			context.strokeStyle = lightColor;
		}
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.stroke();
	}
	
	//draw rows
	var startRowY = 0 + (translateY % baseWidthpx);
	for(var i = startRowY; i < canvas.height; i += baseWidthpx){
		if((i - translateY) % (darkerSize * baseWidthpx) == 0){
			context.strokeStyle = darkColor;
		} else {
			context.strokeStyle = lightColor;
		}
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(canvas.width, i);
		context.stroke();
	}
	
}

function drawWalls(){
	var currentFloor = blueprint.currentFloor;
	var Walls = blueprint.floors[currentFloor].Walls;
	
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	//context.lineWidth = 10;
	context.strokeStyle = lightColor;
	
	for(var i = Walls.length - 1; i >= 0; i--){
		context.strokeStyle = lightColor;
		context.lineWidth = Walls[i].thickness * 2;
		context.beginPath();
		context.moveTo(Walls[i].startX + translateX, Walls[i].startY + translateY);
		context.lineTo(Walls[i].endX + translateX, Walls[i].endY + translateY);
		//context.lineTo(canvas.width, i);
		context.stroke();
		
		//console.log(Walls[i].point1);
		
		// context.lineWidth = 1;
		// context.strokeStyle = darkColor;
		// context.beginPath();
		// context.arc(Walls[i].startX, Walls[i].startY, 4, 0, 2 * Math.PI);
		// context.stroke();
		
		// context.beginPath();
		// context.arc(Walls[i].endX, Walls[i].endY, 4, 0, 2 * Math.PI);
		// context.stroke();
	}
	context.lineWidth = 1;
	
}

function drawObjects(){
	var currentFloor = blueprint.currentFloor;
	
	var Objects = blueprint.floors[currentFloor].RoomObjects;
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	for(var i = Objects.length - 1; i >= 0; i--){
		var img = document.getElementById(Objects[i].pictureID);
		context.drawImage(img, Objects[i].x + translateX, Objects[i].y + translateY, Objects[i].width, Objects[i].height);
	}	
}


function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function onMouseDownCanvas(){
	isDown = true;
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;

	blueprint.objectCollision(startX, startY);
	
	// context.beginPath();
	// context.arc(startX, startY, 4, 0, 2 * Math.PI);
	// context.stroke();
	
	blueprint.draw();
	
}

function onMouseUpCanvas(){
	isDown = false;
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;

	// context.beginPath();
	// context.moveTo(startX, startY);
	// context.lineTo(endX, endY);
	// context.stroke();
	
	blueprint.draw();

	
}

function onMouseMoveCanvas(){
	if(!isDown)
		return;
	clearCanvas();
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;

	// context.beginPath();
	// context.arc(startX, startY, 4, 0, 2 * Math.PI);
	// context.stroke();
	
	// context.beginPath();
	// context.moveTo(startX, startY);
	// context.lineTo(endX, endY);
	// context.stroke();
	
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

function onMouseDownWall(){
	isDown = true;
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;	
}

function onMouseUpWall(){
	
}

function onMouseMoveWall(){
	if(!isDown)
		return;
	clearCanvas();
	
	
	
	blueprint.draw();
	
	startX = event.offsetX;
	startY = event.offsetY;
	
}

function handelMouseDown(){
	if(currentTool == "select"){
		return onMouseDownCanvas();
	} else if(currentTool == "pan"){
		return onMouseDownPan();
	} else if(currentTool == "wall"){
		return onMouseDownWall();
	}
}

function handelMouseUp(){
	if(currentTool == "select"){
		return onMouseUpCanvas();
	} else if(currentTool == "pan"){
		return onMouseUpPan();
	} else if(currentTool == "wall"){
		return onMouseUpWall();
	}
}

function handelMouseMove(){
	if(currentTool == "select"){
		return onMouseMoveCanvas();
	} else if(currentTool == "pan"){
		return onMouseMovePan();
	} else if(currentTool == "wall"){
		return onMouseMoveWall();
	}
}

function selectTool(){
	currentTool = "select";
	canvas.style.cursor = "";
}

function panTool(){
	currentTool = "pan";
	canvas.style.cursor = "move";
}

function wallTool(){
	currentTool = "wall";
	canvas.style.cursor = "";
}


function resize(){
	canvas.width = convasDiv.offsetWidth;
	canvas.height = convasDiv.offsetHeight;
	blueprint.draw();
}

function startUp(){
	resize();
	canvas.addEventListener("mousedown", handelMouseDown);
	canvas.addEventListener("mouseup", handelMouseUp);
	canvas.addEventListener("mousemove", handelMouseMove);
	window.addEventListener("resize", resize);
	
	//blueprint.draw();
}

/*

CanvasRenderingContext2D.translate()
Adds a translation transformation by moving the canvas and its origin x horzontally and y vertically on the grid.


*/