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

var wallClipping = 40;
/// end settings
	

var startX;
var startY;
var isDown = false;
var currentTool = "select";
var isSaved = true;


var floor1 = new Floor(1);
//var floor2 = new Floor(2);
var blueprint = new Blueprint("name");

blueprint.add(floor1);
blueprint.floors[0].Walls.push(new Wall(120, 80, 800, 80, 1));
blueprint.floors[0].Walls.push(new Wall(120, 600, 800, 600, 1));
blueprint.floors[0].Walls.push(new Wall(800, 80, 800, 600, 1));
blueprint.floors[0].Walls.push(new Wall(120, 80, 120, 600, 1));

// blueprint.add(floor2);
// blueprint.floors[1].Walls.push(new Wall(120, 80, 800, 80, 1));
// blueprint.floors[1].Walls.push(new Wall(120, 600, 800, 600, 1));
// blueprint.floors[1].Walls.push(new Wall(800, 80, 800, 600, 1));
// blueprint.floors[1].Walls.push(new Wall(120, 80, 120, 600, 1));

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
	var currentFloor = blueprint.currentFloor;
	var selectedObject = blueprint.selectedObject;
	if(selectedObject != undefined){
		var currentObject = blueprint.floors[currentFloor].RoomObjects[selectedObject];
		objectSelected(currentObject.x, currentObject.y, currentObject.width, currentObject.height, currentObject.pictureID, currentObject.rotation);
	}
	else {
		objectSelected("","","","","","");
	}	
	// context.beginPath();
	// context.arc(startX, startY, 4, 0, 2 * Math.PI);
	// context.stroke();
	
	blueprint.draw();
	
}

function objectSelected(x, y, width, height, pictureID, rotation) {
	var args = x + "," + y + "," + width + "," + height + "," + pictureID + "," + rotation;
	window.parent.postMessage("objectSelected,"+ args, "*");
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
	
	var currentFloor = blueprint.currentFloor;
	var selectedObject = blueprint.selectedObject;
	if(selectedObject != undefined){
		var currentObject = blueprint.floors[currentFloor].RoomObjects[selectedObject];
		objectSelected(currentObject.x, currentObject.y, currentObject.width, currentObject.height, currentObject.pictureID, currentObject.rotation);
	}
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
	
	var currentFloor = blueprint.currentFloor;
	var selectedObject = blueprint.selectedObject;
	if(selectedObject != undefined){
		var currentObject = blueprint.floors[currentFloor].RoomObjects[selectedObject];
		objectSelected(currentObject.x, currentObject.y, currentObject.width, currentObject.height, currentObject.pictureID, currentObject.rotation);
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
	startX = getClippedValue(event.offsetX, -blueprint.translateX);
	startY = getClippedValue(event.offsetY, -blueprint.translateY);
	
	
	var currentFloor = blueprint.currentFloor;
	
	blueprint.floors[currentFloor].addWall(startX, startY);
	blueprint.redraw();
}

function onMouseUpWall(){
	isDown = false;
	
	// var endX = event.offsetX;
	// var endY = event.offsetY;
	var endX = getClippedValue(event.offsetX, -blueprint.translateX);
	var endY = getClippedValue(event.offsetY, -blueprint.translateY);
	
	var currentFloor = blueprint.currentFloor;
	var Walls = blueprint.floors[currentFloor].Walls;
	var currentWall = Walls[Walls.length - 1];
	currentWall.translate(endX - startX, endY - startY);
	
	startX = endX;
	startY = endY;
	
}

function onMouseMoveWall(){
	if(!isDown)
		return;
	clearCanvas();
	
	// var endX = event.offsetX;
	// var endY = event.offsetY;
	var endX = getClippedValue(event.offsetX, -blueprint.translateX);
	var endY = getClippedValue(event.offsetY, -blueprint.translateY);
	
	var currentFloor = blueprint.currentFloor;
	var Walls = blueprint.floors[currentFloor].Walls;
	var currentWall = Walls[Walls.length - 1];
	currentWall.translate(endX - startX, endY - startY);
	
	
	blueprint.draw();
	
	startX = endX;
	startY = endY;
	
}

// function getClippedValue(value, translation){
	// value = value + wallClipping / 2 - (value + wallClipping / 2) % wallClipping;
	// translation = translation % wallClipping
	// if(translation >= wallClipping/2){
		// console.log(value + translation);
		// return value + translation;
	// } else {
		// console.log(value - translation);
		// return value - translation;
	// }
// }

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
	var currentFloor = currentFloor ? currentFloor : blueprint.currentFloor;
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
	
	
	if(pictureID == "stairs" ){
		var currentFloorObject = blueprint.floors[currentFloor];
		
		var newFloor = new Floor(blueprint.floors.length - 1);
		newFloor.Walls = copyWalls(currentFloorObject.Walls);
		blueprint.add(newFloor);
		//addFurniture(width, height, pictureID, currentFloor + 1)
	}
	
	blueprint.redraw();

}


function resize(){
	canvas.width = convasDiv.offsetWidth;
	canvas.height = convasDiv.offsetHeight;
	blueprint.draw();
}

function undo(){
	var currentFloor = blueprint.currentFloor;
	blueprint.floors[currentFloor].Walls.pop();
	blueprint.redraw();
}

function deleteObject(){
	var currentFloor = blueprint.currentFloor;
	var selectedObject = blueprint.selectedObject;
	if(selectedObject != undefined){
		blueprint.floors[currentFloor].RoomObjects.splice(selectedObject, 1);
		blueprint.selectedObject = undefined;
		objectSelected("","","","","","");
	}
	blueprint.redraw();
}

function keypress(e){
	var key = String.fromCharCode(e.keyCode);
	if(key == "z"){
		undo();
	} else if(key == "d"){
		deleteObject();
	}
}

function startUp(){
	resize();
	canvas.addEventListener("mousedown", handelMouseDown);
	canvas.addEventListener("mouseup", handelMouseUp);
	canvas.addEventListener("mousemove", handelMouseMove);
	window.addEventListener("keypress", keypress, false);
	window.addEventListener("resize", resize);
	window.onbeforeunload = function(e) {
		if(!isSaved)
			return 'hello world';
    };
	
	if(window.location.search){
		blueprint = importFile('{"floors":[{"floorNum":1,"RoomObjects":[{"x":1063,"y":656,"width":150,"height":150,"pictureID":"tableCircle","rotation":0},{"x":1186,"y":734,"width":63,"height":75,"pictureID":"chair3","rotation":120},{"x":1019,"y":695.5,"width":60,"height":71,"pictureID":"chair3","rotation":270},{"x":758,"y":850,"width":200,"height":120,"pictureID":"tableSquare","rotation":0},{"x":640,"y":917,"width":240,"height":200,"pictureID":"couchCorner","rotation":180},{"x":202,"y":1038.5,"width":120,"height":80,"pictureID":"sinkSmallA","rotation":180},{"x":379,"y":939,"width":80,"height":280,"pictureID":"tableRectangle","rotation":90},{"x":122,"y":799,"width":80,"height":160,"pictureID":"tableRectangle","rotation":0},{"x":122,"y":959,"width":80,"height":160,"pictureID":"tableRectangle","rotation":0},{"x":139,"y":493,"width":80,"height":80,"pictureID":"chairRound","rotation":210},{"x":408,"y":369,"width":250,"height":100,"pictureID":"couchLargeB","rotation":270},{"x":719,"y":320,"width":80,"height":200,"pictureID":"tableRectangle","rotation":0},{"x":135,"y":233,"width":60,"height":60,"pictureID":"tableSquare","rotation":0},{"x":187,"y":48,"width":120,"height":250,"pictureID":"bedTwin","rotation":270},{"x":1615,"y":24.5,"width":80,"height":200,"pictureID":"sinkSmallA","rotation":90},{"x":1401,"y":82.5,"width":100,"height":65,"pictureID":"sinkSmallA","rotation":0},{"x":1561,"y":207,"width":120,"height":120,"pictureID":"doorR","rotation":0},{"x":111,"y":597,"width":500,"height":200,"pictureID":"stairs","rotation":180},{"x":1339,"y":82.5,"width":60,"height":113,"pictureID":"toilet","rotation":0},{"x":1099,"y":462,"width":40,"height":320,"pictureID":"tableRectangle","rotation":90},{"x":1667,"y":515,"width":80,"height":80,"pictureID":"tableSquare","rotation":0},{"x":1665,"y":807,"width":80,"height":80,"pictureID":"tableSquare","rotation":0},{"x":1647,"y":983,"width":120,"height":120,"pictureID":"doorR","rotation":270},{"x":1535,"y":580,"width":200,"height":240,"pictureID":"bed","rotation":90},{"x":1273,"y":817,"width":120,"height":120,"pictureID":"doorR","rotation":90},{"x":1037,"y":82.5,"width":60,"height":113,"pictureID":"toilet","rotation":0},{"x":1175,"y":82.5,"width":100,"height":65,"pictureID":"sinkSmallA","rotation":0},{"x":953,"y":161,"width":120,"height":120,"pictureID":"doorL","rotation":91},{"x":687,"y":159,"width":120,"height":120,"pictureID":"doorR","rotation":270}],"Walls":[{"thickness":4,"startX":120,"startY":80,"endX":800,"endY":80,"id":1,"connected":[]},{"thickness":4,"startX":120,"startY":600,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":4,"startX":800,"startY":80,"endX":800,"endY":600,"id":1,"connected":[]},{"thickness":4,"startX":120,"startY":80,"endX":120,"endY":600,"id":1,"connected":[]},{"thickness":4,"startX":800,"startY":80,"endX":1280,"endY":80,"id":4,"connected":[]},{"thickness":4,"startX":1280,"startY":80,"endX":1280,"endY":600,"id":5,"connected":[]},{"thickness":4,"startX":1280,"startY":600,"endX":960,"endY":600,"id":6,"connected":[]},{"thickness":4,"startX":960,"startY":600,"endX":960,"endY":80,"id":7,"connected":[]},{"thickness":4,"startX":1280,"startY":80,"endX":1760,"endY":80,"id":8,"connected":[]},{"thickness":4,"startX":1760,"startY":80,"endX":1760,"endY":960,"id":9,"connected":[]},{"thickness":4,"startX":1760,"startY":960,"endX":1280,"endY":960,"id":10,"connected":[]},{"thickness":4,"startX":1280,"startY":960,"endX":1280,"endY":600,"id":11,"connected":[]},{"thickness":4,"startX":120,"startY":600,"endX":120,"endY":1120,"id":12,"connected":[]},{"thickness":4,"startX":120,"startY":1120,"endX":1760,"endY":1120,"id":13,"connected":[]},{"thickness":4,"startX":1760,"startY":1120,"endX":1760,"endY":960,"id":14,"connected":[]},{"thickness":4,"startX":1280,"startY":320,"endX":1760,"endY":320,"id":15,"connected":[]},{"thickness":4,"startX":960,"startY":480,"endX":1280,"endY":480,"id":16,"connected":[]},{"thickness":4,"startX":1240,"startY":520,"endX":1200,"endY":520,"id":17,"connected":[]},{"thickness":4,"startX":1200,"startY":520,"endX":1200,"endY":560,"id":18,"connected":[]},{"thickness":4,"startX":1200,"startY":560,"endX":1240,"endY":560,"id":19,"connected":[]},{"thickness":4,"startX":1240,"startY":560,"endX":1240,"endY":520,"id":20,"connected":[]},{"thickness":4,"startX":1040,"startY":520,"endX":1000,"endY":520,"id":21,"connected":[]},{"thickness":4,"startX":1000,"startY":520,"endX":1000,"endY":560,"id":22,"connected":[]},{"thickness":4,"startX":1000,"startY":560,"endX":1040,"endY":560,"id":23,"connected":[]},{"thickness":4,"startX":1040,"startY":560,"endX":1040,"endY":520,"id":24,"connected":[]}]},{"floorNum":2,"RoomObjects":[{"x":1335,"y":478,"width":100,"height":160,"pictureID":"tableRectangle","rotation":0},{"x":1359,"y":281,"width":80,"height":80,"pictureID":"tableSquare","rotation":0},{"x":851,"y":109,"width":140,"height":140,"pictureID":"tableCircle","rotation":0},{"x":969,"y":143.5,"width":60,"height":71,"pictureID":"chair1","rotation":90},{"x":1253,"y":296,"width":120,"height":250,"pictureID":"bedTwin","rotation":90},{"x":519,"y":478,"width":80,"height":160,"pictureID":"tableRectangle","rotation":0},{"x":99,"y":342.5,"width":120,"height":72,"pictureID":"sinkSmallA","rotation":270},{"x":149,"y":492.5,"width":60,"height":113,"pictureID":"toilet","rotation":270},{"x":793,"y":319,"width":120,"height":120,"pictureID":"doorL","rotation":90},{"x":487,"y":319,"width":120,"height":120,"pictureID":"doorR","rotation":270},{"x":113,"y":75,"width":500,"height":200,"pictureID":"stairs","rotation":0}],"Walls":[{"thickness":4,"startX":120,"startY":80,"endX":800,"endY":80,"id":1,"connected":[]},{"thickness":4,"startX":800,"startY":80,"endX":800,"endY":640,"id":1,"connected":[]},{"thickness":4,"startX":800,"startY":640,"endX":120,"endY":640,"id":2,"connected":[]},{"thickness":4,"startX":120,"startY":640,"endX":120,"endY":80,"id":3,"connected":[]},{"thickness":4,"startX":600,"startY":280,"endX":600,"endY":640,"id":4,"connected":[]},{"thickness":4,"startX":600,"startY":280,"endX":120,"endY":280,"id":5,"connected":[]},{"thickness":4,"startX":800,"startY":80,"endX":1440,"endY":80,"id":6,"connected":[]},{"thickness":4,"startX":1440,"startY":80,"endX":1440,"endY":640,"id":7,"connected":[]},{"thickness":4,"startX":1440,"startY":640,"endX":800,"endY":640,"id":8,"connected":[]}]},{"floorNum":2,"RoomObjects":[],"Walls":[]}],"name":"name","floorCount":2,"currentFloor":0,"translateX":-110,"translateY":-60}');
		blueprint.redraw();
	}
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

function getClippedValue(value, trans){
	value = value + trans;
	return value + wallClipping/2 - mod((value + wallClipping/2), wallClipping);
}

function mod(i,j){
	if(i < 0)
		return i % j + j;
	else 
		return i % j;
}