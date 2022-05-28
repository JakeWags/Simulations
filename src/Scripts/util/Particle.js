class Particle {
	#position;
	#velocity;
	#gravity;

	constructor(x, y, speed, direction, grav) {
		this.#position = new Vector(x,y);
		
		this.#velocity = new Vector(0,0);
		this.#velocity.setLength(speed);
		this.#velocity.setAngle(direction);

		this.#gravity = grav || 0; // grav is an optional parameter
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
}