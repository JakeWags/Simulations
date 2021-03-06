class Particle {
	#position;
	#velocity;
	#gravity;

	constructor(x, y, speed = 0, direction = 0, grav = 0) {
		this.#position = new Vector(x,y);
		
		this.#velocity = new Vector(0,0);
		this.#velocity.setLength(speed);
		this.#velocity.setAngle(direction);

		this.#gravity = grav; // grav is an optional parameter
	}

	move() {
		this.#position.addTo(this.#velocity);
	}

	accelerate(acc) {
		this.#velocity.addTo(acc);		
	}

	applyGravity() {
		this.#velocity.addTo(this.#gravity);
	}

	update() {
		if (this.#gravity != 0) this.applyGravity();

		this.move();
	}

	getPosition() { return this.#position; }
	getVelocity() { return this.#velocity; }
	getX() { return this.#position.getX(); }
	getY() { return this.#position.getY(); }
	getSpeed() { return this.#velocity.getLength(); }
	
	setX(x) { this.#position.setX(x); }
	setY(y) { this.#position.setY(y); }

	// angle between the particle and an x and y coordinate
	angleBetweenPoint(x, y) {
		return Math.atan2(this.#position.getX() - y, this.#position.getX() - x);
	}

	angleBetween(p2) {
		return Math.atan2(this.#position.getY()-p2.getPosition().getY(), this.#position.getX() - p2.getPosition().getX());
	}
}