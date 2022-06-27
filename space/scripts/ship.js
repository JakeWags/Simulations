class Ship extends Particle {
	#angle = 0;
	shooting = false;
	hasShot = false;
	thrusting = false;
	static shipLength = 30;
	static bullets = [];
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
	static getAbsolutePoints(angle, x, y) {
		/*
			dY = rsin(theta)
			dX = r - rcos(theta)

			polar to cartesian conversions
		*/
		return [
			[x+Ship.shipLength*Math.cos(angle), y+Ship.shipLength*Math.sin(angle)],
			[x+Ship.shipLength/2*Math.cos(angle+4*Math.PI/6),y+Ship.shipLength/2*Math.sin(angle+4*Math.PI/6)],
			[x-Ship.shipLength/2*Math.cos(angle), y-Ship.shipLength/2*Math.sin(angle)],
			[x+Ship.shipLength/2*Math.cos(angle-4*Math.PI/6),y+Ship.shipLength/2*Math.sin(angle-4*Math.PI/6)]
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
		ctx.fillStyle = "orange";
		ctx.fill();


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
		if (this.shooting && !this.hasShot) {
			let bVel = this.#computeBulletVelocity();
			this.#points = Ship.getAbsolutePoints(this.#angle, super.getX(), super.getY());
			Ship.bullets.push(new Bullet(this.#points[0][0], this.#points[0][1], bVel.getLength(), bVel.getAngle(), this.#angle));
			this.hasShot = true;
		}
	}

	#drawBullets(ctx) {
		Ship.bullets.forEach((e) => {
			e.draw(ctx);
			if (e.checkAsteroidCollision()) {
				this.deleteBullet(e);
			}
		});
	}

	#deleteBullets() {
		Ship.bullets.forEach((e) => {
			if (e.getX() > window.innerWidth || e.getX() < 0 || e.getY() < 0 || e.getY() > window.innerHeight) {
				Ship.bullets = Ship.bullets.filter(b => b !== e); // filter the array for everything other than the bullet to delete
			}
		});
	}

	deleteBullet(b) {
		Ship.bullets = Ship.bullets.filter(e => e !== b); // filter the array for everything other than the bullet to delete
	}

	getBullets() {
		return Ship.bullets;
	}

	checkAsteroidCollision(asteroids) {
		
	}

}