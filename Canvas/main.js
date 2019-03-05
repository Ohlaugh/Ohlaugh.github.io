var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");



var startX;
var startY;
var isDown = false;



var floor1 = new Floor(1);
var blueprint = new Blueprint("name");
blueprint.add(floor1);
blueprint.floors[0].add(table,10 , 15);



startUp();
function onMouseDownCanvas(){
	isDown = true;
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;

	context.beginPath();
	context.arc(startX, startY, 4, 0, 2 * Math.PI);
	context.stroke();
	
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
	
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function startUp(){
	console.log(convasDiv.offsetHight);
	canvas.width = convasDiv.offsetWidth;
	canvas.height = convasDiv.offsetHeight;
	canvas.addEventListener("mousedown", onMouseDownCanvas);
	canvas.addEventListener("mouseup", onMouseUpCanvas);
	canvas.addEventListener("mousemove", onMouseMoveCanvas);
	//canvas.onClick = onClickCanvas;
	
	
}


/*

CanvasRenderingContext2D.translate()
Adds a translation transformation by moving the canvas and its origin x horzontally and y vertically on the grid.


*/