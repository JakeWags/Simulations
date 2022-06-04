class Rocket extends Particle {
	static rocketSpeed = 7;
	static rocketLength = 20;
	#shipAngle;
	#rocketTip;
	static mouse = {x: 0, y: 0};

	constructor(x, y, speed = Rocket.rocketSpeed, angle, shipAngle) {
		super(x, y, speed, angle);
		this.#shipAngle = shipAngle;
		console.log("made a rocket");
	}

	static findCursor(e) {
		Rocket.mouse.x = e.clientX;
		Rocket.mouse.y = e.clientY;
	}

	computeVelocity() {
		//console.log("rocket velocity computed");
		// todo
		// set velocity here
		// use angleBetweenPoint to find angle to the mouse
		// create a velocity vector and add it to the rocket velocity
 	}

 	update() {
 		this.computeVelocity();
 		// do rocket specific things every frame!




 		super.update();
 	}

 	draw(ctx) {
 		//console.log("drawing a rocket");
 		ctx.beginPath();
 		ctx.arc(super.getX(), super.getY(), 40, 0, Math.PI*2, false);
 		ctx.fillStyle = "green";
 		ctx.fill();
 	}
}
