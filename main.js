var canvas = document.getElementById("mainCanvas");
var convasDiv = document.getElementById("mainCanvasDiv")
var context = canvas.getContext("2d");


startUp();


function startUp(){
	console.log(convasDiv.offsetHight);
	canvas.width = convasDiv.offsetWidth;
	canvas.hight = convasDiv.offsetHight;
	
	
}


/*

CanvasRenderingContext2D.translate()
Adds a translation transformation by moving the canvas and its origin x horzontally and y vertically on the grid.


*/