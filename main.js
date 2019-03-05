var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");


startUp();

var startX;
var startY;

function onMouseDownCanvas(){
	//alert("h");
	startX = event.offsetX;
	startY = event.offsetY;

	context.beginPath();
	context.arc(startX, startY, 4, 0, 2 * Math.PI);
	context.stroke();
	
}

function onMouseUpCanvas(){
	//alert("h");
	var endX = event.offsetX;
	var endY = event.offsetY;

	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
	
}

function startUp(){
	console.log(convasDiv.offsetHight);
	canvas.width = convasDiv.offsetWidth;
	canvas.hight = convasDiv.offsetHight;
	canvas.addEventListener("mousedown", onMouseDownCanvas);
	canvas.addEventListener("mouseup", onMouseUpCanvas);
	//canvas.onClick = onClickCanvas;
	
	
}


/*

CanvasRenderingContext2D.translate()
Adds a translation transformation by moving the canvas and its origin x horzontally and y vertically on the grid.


*/