class Blueprint {
	constructor(name){
		this.floors = [];
		this.name = name;
		this.floorCount = 0;
		this.currentFloor = undefined;
		this.draw = undefined;
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
}


class Floor {
	constructor(floorNum){
		this.floorNum = floorNum;
		this.RoomObjects = [];
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
	constructor(width,height,picture){
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.picture = picture;
		this.rotation = 0;
	}
	move(x, y){
		this.x = x;
		this.y = y;		
	}
}
