class Bullet extends Particle {
	static bulletSpeed = 10;
	static bulletLength = 20;
	#shipAngle;
	#bulletTip;

	constructor(x, y, speed = Bullet.bulletSpeed, angle, shipAngle) {
		super(x, y, speed, angle);
		this.#shipAngle = shipAngle;
	}

	#computeBulletPoints() {
		return [
			[super.getX(), super.getY()],
			[super.getX()+Bullet.bulletLength*Math.cos(this.#shipAngle), super.getY()+Bullet.bulletLength*Math.sin(this.#shipAngle)],
		]
	}

	draw(ctx) {
		let lineWidth = ctx.lineWidth;
		let points = this.#computeBulletPoints();
		super.update();

		ctx.beginPath();
		ctx.lineWidth = "3";
		ctx.moveTo(points[0][0], points[0][1]);
		ctx.lineTo(points[1][0], points[1][1]);
		ctx.strokeStyle = "green";
		ctx.stroke();

		ctx.lineWidth = lineWidth;
	}

	// returns a vector position
	getBulletTip() {
		let points = this.#computeBulletPoints();
		return new Vector(points[1][0],points[1][1]);
	}

	getBulletTipWithVelocity() {

	}

	checkAsteroidCollision() {
		let bulletTip = this.getBulletTip();
	
		let topLeft,
			topRight,
			bottomRight,
			bottomLeft;
		let astPoints;
		for(let i = 0; i < Asteroid.Asteroids.length; i++) {
			let e = Asteroid.Asteroids[i];
			astPoints = e.getBounds();
			topLeft = astPoints[0];
			topRight = astPoints[1];
			bottomRight = astPoints[2];
			bottomLeft = astPoints[3];
			let xBound = [topLeft.getX(), bottomRight.getX()];
			let yBound = [topLeft.getY(), bottomRight.getY()];
			if (bulletTip.getX() >= xBound[0] && bulletTip.getX() <= xBound[1] && bulletTip.getY() >= yBound[0] && bulletTip.getY() <= yBound[1]) {
				Asteroid.Asteroids = Asteroid.Asteroids.filter(b => b !== e);
				return true;
			}
		}
	}
}