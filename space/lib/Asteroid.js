class Asteroid extends Particle {
	#color;
	#sideLength;
	static Asteroids = [];

	#showHitBox = false; // if true, draw the asteroid hitbox

	// add asteroid rotation if square?
	// add polygonal asteroids?
	//   - would need revamped point generation and collision detection based on bounds
	constructor(x, y, speed, direction) {
		super(x, y, speed, direction, new Vector(0,0));

		//this.#generatePoints();
		this.#color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
	//	this.#radius = Math.random() + 10;
		this.#sideLength = Math.random() * 40 + 20;
	}

	getBounds() {
		return [
			new Vector(super.getX(), super.getY()), // top left
			new Vector(super.getX()+this.#sideLength, super.getY()), // top right
			new Vector(super.getX()+this.#sideLength, super.getY()+this.#sideLength), // bottom right
			new Vector(super.getX(), super.getY()+this.#sideLength)  // bottom left
		]
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.#color;
		// ctx.arc(super.getX(), super.getY(), this.#radius, 0, Math.PI*2, false);
		ctx.fillRect(super.getX(), super.getY(), this.#sideLength, this.#sideLength);
		ctx.fill();

		let b = this.getBounds();

		if (this.#showHitBox) {
			ctx.beginPath();
			ctx.strokeStyle = "green";
			ctx.moveTo(b[0].getX(), b[0].getY());
			ctx.lineTo(b[1].getX(), b[1].getY());
			ctx.lineTo(b[2].getX(), b[2].getY());
			ctx.lineTo(b[3].getX(), b[3].getY());
			ctx.lineTo(b[0].getX(), b[0].getY());
			ctx.stroke();
		}
	}

	checkBulletCollision(bullets) {
		let retVal = false;
		bullets.forEach((e) => {
			let x = e.getBulletTip().getX();
			let y = e.getBulletTip().getY();
			if (Math.abs(super.getX() - x) <= 20 && Math.abs(super.getY() - y) <= 20) {
				retVal = true;
				console.log("collision detected");
			}
		});
		return retVal;
	}
}