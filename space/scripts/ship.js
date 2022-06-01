class Ship extends Particle {
	#angle = 0;
	shooting = false;
	thrusting = false;
	static shipLength = 30;
	#bullets = [];

	constructor(x = 50, y = 50, angle = 0, speed = 0) {
		super(x,y,speed,angle);
		this.#angle = angle;
	}

	getAngle() { return this.#angle; }
	getLength() { return Ship.shipLength; }

	// rotate the ship using radians
	rotateRad(radians) {
		this.#angle += radians;
	}

	// rotate the ship using degrees
	rotateDeg(degrees) {
		this.rotateRad(degrees*(Math.PI/180));
	}
		
	// absolute coordinates relative to the base canvas
	static getAbsolutePoints() {
		/*
			dY = rsin(theta)
			dX = r - rcos(theta)

			polar to cartesian conversions
		*/

		return [
			[Ship.shipLength*Math.cos(this.#angle), Ship.shipLength*Math.sin(this.#angle)],
			[Ship.shipLength/2*Math.cos(this.#angle+4*Math.PI/6),Ship.shipLength/2*Math.sin(this.#angle+4*Math.PI/6)],
			[Ship.shipLength/2*Math.cos(this.#angle), Ship.shipLength/2*Math.sin(this.#angle)],
			[Ship.shipLength/2*Math.cos(this.#angle-4*Math.PI/6),Ship.shipLength/2*Math.sin(this.#angle-4*Math.PI/6)]
			];
	}

	#drawFire(ctx) {
		if(this.thrusting) {
			ctx.beginPath();
			ctx.moveTo(-Ship.shipLength/3, 0);
			ctx.lineTo(-Ship.shipLength/3-Ship.shipLength,0);
			ctx.strokeStyle = "red";
			ctx.stroke();
		}
	}

	// uses canvas translation and relative points
	draw(ctx) {
		// ctx.fillStyle = "white";
		//let points = this.#computePoints();
		
		ctx.translate(this.getX(), this.getY());
		ctx.rotate(this.#angle);
		ctx.beginPath();

		ctx.moveTo(Ship.shipLength, 0);
		ctx.lineTo(-Ship.shipLength/2, -Ship.shipLength/3);
		ctx.lineTo(-Ship.shipLength/3, 0);
		ctx.lineTo(-Ship.shipLength/2, Ship.shipLength/3);
		ctx.lineTo(Ship.shipLength, 0);
		ctx.strokeStyle = "orange";
		ctx.stroke();


		this.#drawFire(ctx);
		

		return ctx;
	}

	update(ctx) {
		ctx.save();

		ctx = this.draw(ctx);
		this.shoot();

		super.update();

		ctx.restore();

		this.drawBullets(ctx);
	}

	#computeBulletSpeed() {
		// needs to account for the speed of the ship relative to the direction the bullet is travelling
		// bullet shoots out at Bullet.bulletSpeed
		let bVel = new Vector(0,0);
		bVel.setLength(Bullet.bulletSpeed);
		bVel.setAngle(this.#angle);

		let sVel = super.getVelocity();
		return (sVel.add(bVel)).getLength();
	}

	shoot() {
		let bSpeed = this.#computeBulletSpeed();
		if (this.shooting) {
			this.shooting = false;
			this.#bullets.push(new Bullet(super.getX(), super.getY(), bSpeed, this.#angle));
		}
	}

	drawBullets(ctx) {
		this.#bullets.forEach((e) => {
			e.draw(ctx);
		});
	}
}