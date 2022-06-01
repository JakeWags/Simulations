class Ship extends Particle {
	#angle = 0;
	shooting = false;
	shipLength = 30;

	constructor(x = 50, y = 50, angle = 0, speed = 0) {
		super(x,y,speed,angle);
		this.#angle = angle;

	}

	getAngle() { return this.#angle; }

	// rotate the ship using radians
	rotateRad(radians) {
		this.#angle += radians;
	}

	// rotate the ship using degrees
	rotateDeg(degrees) {
		this.rotateRad(degrees*(Math.PI/180));
	}
		

	#computePoints() {
		/*
			dY = rsin(theta)
			dX = r - rcos(theta)

			polar to cartesian conversions
		*/
		return [
			[this.shipLength*Math.cos(this.#angle), this.shipLength*Math.sin(this.#angle)],
			[this.shipLength/2*Math.cos(this.#angle+4*Math.PI/6),this.shipLength/2*Math.sin(this.#angle+4*Math.PI/6)],
			[this.shipLength/2*Math.cos(this.#angle), this.shipLength/2*Math.sin(this.#angle)],
			[this.shipLength/2*Math.cos(this.#angle-4*Math.PI/6),this.shipLength/2*Math.sin(this.#angle-4*Math.PI/6)]
			];
	}

	draw(ctx) {
		// ctx.fillStyle = "white";
		//let points = this.#computePoints();
		
		ctx.save();
		ctx.translate(this.getX(), this.getY());
		ctx.rotate(this.#angle);
		ctx.beginPath();
		ctx.moveTo(0,0);

		ctx.lineTo(this.shipLength, 0);
		ctx.lineTo(-this.shipLength/2, -this.shipLength/3);
		ctx.lineTo(-this.shipLength/3, 0);
		ctx.lineTo(-this.shipLength/2, this.shipLength/3);
		ctx.lineTo(this.shipLength, 0);
		ctx.strokeStyle = "orange";
		ctx.stroke();

		// context rotation works totally fine. I just had this.angle rather than this.#angle, so javascript wasn't throwing any errors

		// ctx.lineTo(points[0][0], points[0][1]);
		// ctx.lineTo(points[1][0],points[1][1]);
		// ctx.lineTo(points[2][0], points[2][1]);
		// ctx.lineTo(points[3][0], points[3][1]);
		// ctx.lineTo(points[0][0],points[0][1]);
		//ctx.fill();



		ctx.restore();
	}
}