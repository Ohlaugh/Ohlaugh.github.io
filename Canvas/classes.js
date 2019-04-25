class Blueprint {
	constructor(name){
		this.floors = [];
		this.name = name;
		this.floorCount = 0;
		this.currentFloor = 0;
		this.selectedObject = undefined;
		this.draw = undefined;
		this.translateX = 0;
		this.translateY = 0;
	}
	add(floor, onTop = true){
		if(onTop){
			this.floors.push(floor);
			this.currentFloor++;
		} else {
			this.floors.unshift(floor);
		}
		this.floorCount++;
		return;
	}
	objectCollision(x, y){
		var Objects = this.floors[this.currentFloor].RoomObjects;
		for(var i = 0; i < Objects.length; i++){
			var x1 = Objects[i].x + this.translateX;
			var y1 = Objects[i].y + this.translateY;
			var x2 = x1 + Objects[i].width;
			var y2 = y1 + Objects[i].height;
			if(x >= x1 && x <= x2 && y >= y1 && y <= y2){
				this.selectedObject = i;
				this.bringToFront();
				return;
			}
		}
		this.selectedObject = undefined;
	}
	
	bringToFront(){
		var first = this.floors[this.currentFloor].RoomObjects[this.selectedObject];
		this.floors[this.currentFloor].RoomObjects.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
		this.selectedObject = 0;
	}
	
	
	translate(x, y){
		this.translateX += x;
		this.translateY += y;
	}
}


class Floor {
	constructor(floorNum){
		this.floorNum = floorNum;
		this.RoomObjects = [];
		this.Walls = [];
		this.draw = undefined;
	}
	
	add(object,x,y){
		var tempObject = new RoomObject();
		tempObject = Object.assign(tempObject, object);
		tempObject.move(x,y)
		this.RoomObjects.push(tempObject);
		return;
	}
	
}


class RoomObject {
	constructor(width,height,pictureID){
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.pictureID = pictureID;
		this.rotation = 0;
	}
	move(x, y){
		this.x = x;
		this.y = y;		
	}
	
	translate(x, y){
		this.x += x;
		this.y += y;		
	}
}

class Wall {
	constructor(startX, startY, endX, endY, id){
		this.thickness = 4;
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.id = id;
		this.connected = [];
		
		
	}
	get point1() {
		var dx = this.endX = this.startX;
		var dy = this.endY = this.startY;
		var sum = dx + dy;
		var x1, y1;
		return [x1, y1];
	}
}