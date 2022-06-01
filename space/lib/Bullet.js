class Bullet extends Particle {
	static bulletSpeed = 4;

	constructor(x, y, speed = Bullet.bulletSpeed, angle) {
		super(x, y, speed, angle);
	}

	draw(ctx) {
		super.update();
		ctx.beginPath();
		ctx.arc(super.getX(), super.getY(), 5, 0, Math.PI*2, false);
		ctx.fillStyle = "green";
		ctx.fill();
	}
}