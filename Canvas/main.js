var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");

/// settings

var darkColor = "#000000"; //color of background grid
var lightColor = "#DDDDDD"; //color of gray background grid
var wallColor = "#AAAAAA"; //color of gray background grid
var baseWidthpx = 40; //pixels between smaller background grid
var darkerSize = 4; //grid squares between darker lines
var wallPointColor = "#222222";

var wallPointRadius = 6;

/// end settings
	

var startX;
var startY;
var isDown = false;
var currentTool = "select";
var isSaved = true;


var floor1 = new Floor(1);
var floor2 = new Floor(2);
var blueprint = new Blueprint("name");

blueprint.add(floor1);
blueprint.floors[0].Walls.push(new Wall(120, 80, 800, 80, 1));
blueprint.floors[0].Walls.push(new Wall(120, 600, 800, 600, 1));
blueprint.floors[0].Walls.push(new Wall(800, 80, 800, 600, 1));
blueprint.floors[0].Walls.push(new Wall(120, 80, 120, 600, 1));

blueprint.add(floor2);
blueprint.floors[1].Walls.push(new Wall(120, 80, 800, 80, 1));
blueprint.floors[1].Walls.push(new Wall(120, 600, 800, 600, 1));
blueprint.floors[1].Walls.push(new Wall(800, 80, 800, 600, 1));
blueprint.floors[1].Walls.push(new Wall(120, 80, 120, 600, 1));

blueprint.floors[0].add(new RoomObject(63, 75, "chair3"), 450, 500);
blueprint.floors[0].RoomObjects[0].rotation = 180;
blueprint.floors[0].add(new RoomObject(150, 150, "tableCircle"), 405, 350);


blueprint.currentFloor = 0;
blueprint.selectedObject = 0;




window.onload = startUp;

blueprint.draw = function(){
	drawBackGround();
	drawWalls();
	drawObjects();
}

blueprint.redraw = function(){
	clearCanvas();
	blueprint.draw();
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
	
	points = [];
	
	for(var i = Walls.length - 1; i >= 0; i--){
		context.strokeStyle = wallColor;
		context.lineWidth = Walls[i].thickness * 2;
		context.beginPath();
		points.push([Walls[i].startX + translateX, Walls[i].startY + translateY]);
		points.push([Walls[i].endX + translateX, Walls[i].endY + translateY]);
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
	for(var i = 0; i < points.length; i++){
		context.fillStyle = wallPointColor;
		context.beginPath();
		context.arc(points[i][0], points[i][1], wallPointRadius, 0, 2 * Math.PI);
		context.fill();
	}
	
}

function drawObjects(){
	var currentFloor = blueprint.currentFloor;
	
	var Objects = blueprint.floors[currentFloor].RoomObjects;
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	for(var i = Objects.length - 1; i >= 0; i--){
		var img = document.getElementById(Objects[i].pictureID);
		if(Objects[i].rotation){
			rotateAndPaintImage(img, Objects[i].rotation ,Objects[i].x + translateX, Objects[i].y + translateY, Objects[i].width, Objects[i].height);
		}else{
			context.drawImage(img, Objects[i].x + translateX, Objects[i].y + translateY, Objects[i].width, Objects[i].height);			
		}
	}	
}

function rotateAndPaintImage(img, angleInDeg , positionX, positionY, sizeX, sizeY ) {
	var angleInRad = angleInDeg*Math.PI/180
	
	positionX += sizeX/2;
	positionY += sizeY/2;
	
	context.translate(positionX, positionY);
	context.rotate(angleInRad);
	context.drawImage(img, -sizeX/2, -sizeY/2, sizeX, sizeY);
	context.rotate(-angleInRad);
	context.translate(-positionX, -positionY);
}


function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function floorUp(){
	if(blueprint.currentFloor >= blueprint.floorCount - 1)
		throw new Error('Floor does not exist');
	blueprint.currentFloor++;
	clearCanvas();
	blueprint.draw();
	
}

function floorDown(){
	if(blueprint.currentFloor <= 0)
		throw new Error('Floor does not exist');
	blueprint.currentFloor--;
	clearCanvas();
	blueprint.draw();
	
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
	if(selectedObject >= 0){
		isSaved = false;
		var currentObject = blueprint.floors[currentFloor].RoomObjects[selectedObject];
		if(startX == undefined && startY == undefined){
			startX = currentObject.width / 2;
			startY = currentObject.height / 2;
		}
		currentObject.translate(endX - startX, endY - startY);
		
	}
	
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

function addFurniture(width, height, pictureID){
	isSaved = false;
	selectTool();
	var currentFloor = blueprint.currentFloor;
	var translateX = blueprint.translateX;
	var translateY = blueprint.translateY;
	
	
	var ro = new RoomObject(width, height, pictureID);
	isDown = true;
	startX = undefined;
	startY = undefined;
	
	//negative translates as we want it added at relative 0, 0
	blueprint.floors[currentFloor].add(ro, -translateX, -translateY);
	
	blueprint.selectedObject = blueprint.floors[currentFloor].RoomObjects.length - 1;
	blueprint.bringToFront();
				
	blueprint.redraw();

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
	window.onbeforeunload = function(e) {
		if(!isSaved)
			return 'hello world';
    };
	//blueprint.draw();
}

function updateObject(x, y, width, height, pictureID, rotation){
	var selectedObject = blueprint.selectedObject;
	var currentFloor = blueprint.currentFloor;
	var currentObject = blueprint.floors[currentFloor].RoomObjects[selectedObject];
	currentObject.x = x;
	currentObject.y = y;
	currentObject.width = width;
	currentObject.height = height;
	currentObject.pictureID = pictureID;
	currentObject.rotation = rotation;
	
	blueprint.redraw();
}
