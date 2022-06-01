class Ship extends Particle {
	#angle = 0;
	shooting = false;
	thrusting = false;
	static shipLength = 30;
	#bullets = [];
	#points;

	constructor(x = 50, y = 50, angle = 0, speed = 0) {
		super(x,y,speed,angle);
		this.#angle = angle;
		this.#points = Ship.getAbsolutePoints(this.#angle);
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
	static getAbsolutePoints(angle) {
		/*
			dY = rsin(theta)
			dX = r - rcos(theta)

			polar to cartesian conversions
		*/

		return [
			[Ship.shipLength*Math.cos(angle), Ship.shipLength*Math.sin(angle)],
			[Ship.shipLength/2*Math.cos(angle+4*Math.PI/6),Ship.shipLength/2*Math.sin(angle+4*Math.PI/6)],
			[Ship.shipLength/2*Math.cos(angle), Ship.shipLength/2*Math.sin(angle)],
			[Ship.shipLength/2*Math.cos(angle-4*Math.PI/6),Ship.shipLength/2*Math.sin(angle-4*Math.PI/6)]
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

		this.#drawBullets(ctx);
		this.#deleteBullets();
	}

	#computeBulletVelocity() {
		// needs to account for the speed of the ship relative to the direction the bullet is travelling
		// bullet shoots out at Bullet.bulletSpeed
		let bVel = new Vector(0,0);
		bVel.setLength(Bullet.bulletSpeed);
		bVel.setAngle(this.#angle);

		let sVel = super.getVelocity();
		return sVel.add(bVel);
	}

	shoot() {
		if (this.shooting) {
			let bVel = this.#computeBulletVelocity();
			this.#points = Ship.getAbsolutePoints(this.#angle);
			this.shooting = false;
			this.#bullets.push(new Bullet(this.#points[0][0]+super.getX(), super.getY()+this.#points[0][1], bVel.getLength(), bVel.getAngle()));
		}
	}

	#drawBullets(ctx) {
		this.#bullets.forEach((e) => {
			e.draw(ctx);
		});
	}

	#deleteBullets() {
		this.#bullets.forEach((e) => {
			if (e.getX() > window.innerWidth || e.getX() < 0 || e.getY() < 0 || e.getY() > window.innerHeight) {
				this.#bullets = this.#bullets.filter(b => b !== e); // filter the array for everything other than the bullet to delete
			}
		});
		console.log(this.#bullets.length);
	}

}