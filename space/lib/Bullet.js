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
		return new Vector(points[0][0],points[0][1]);
	}
}