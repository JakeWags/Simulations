class Particle {
	#position;
	#velocity;
	#gravity;
	applyGrav = false;

	constructor(x, y, speed = 0, direction = 0, grav = 0) {
		this.#position = new Vector(x,y);
		
		this.#velocity = new Vector(0,0);
		this.#velocity.setLength(speed);
		this.#velocity.setAngle(direction);

		this.#gravity = grav; // grav is an optional parameter
		this.applyGrav = (grav != 0) ? true : false;
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
		if (this.applyGrav) this.applyGravity();

		this.move();
	}

	getPosition() { return this.#position; }
	getVelocity() { return this.#velocity; }
	getX() { return this.#position.getX(); }
	getY() { return this.#position.getY(); }
	getGravity() { return this.#gravity; }

	setX(x) { this.#position.setX(x); }
	setY(y) { this.#position.setY(y); }
	setGravity(g) { this.#gravity = g; }
	setVelocity(v) { this.#velocity = v; }

	// angle between the particle and an x and y coordinate
	angleBetweenPoint(x, y) {
		return Math.atan2(this.#position.getX() - y, this.#position.getX() - x);
	}

	angleBetween(p2) {
		return Math.atan2(this.#position.getY()-p2.getPosition().getY(), this.#position.getX() - p2.getPosition().getX());
	}

	distanceTo(p2) {
		let A = p2.getX() - this.getX();
		let B = p2.getY() - this.getY();
		return Math.sqrt((A*A)+(B*B));
	}

	circleCollisionCheck(p2) {
		// closes point on a line
		// https://ericleong.me/research/circle-circle/#the-closest-point-on-a-line-to-a-point-algorithm
		// see circleCollision.js
	}


	// revise this.
	// not properly computing for given line segment, rather, it is interpolating as if the line segment were infinite in the given direction
	static closestPointOnLine(lx1, ly1, lx2, ly2, x0, y0) {
		// given point: x0 y0, line segment is from lx1 ly1 to lx2 ly2
		let a1 = ly2 - ly1;
		let b1 = lx1 - lx2;
		let c1 = a1*lx1 + b1*ly1;
		let c2 = -b1*x0 + a1*y0;
		let det = a1*a1 - -b1*b1;
		let cx = 0,
			cy = 0;

		if (det != 0) {
			cx = (a1*c1 - b1*c2)/det;
			cy = (a1*c2 + b1*c1)/det;
		} else {
			cx = x0;
			cy = y0;
		}

		return new Vector(cx, cy);
	}

	// from https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
	// uses dot product projection
	// see stack overflow answer for clarification
	static distToClosestPointOnLine(x1, y1, x2, y2, x, y) {
		var A = x - x1;
		var B = y - y1;
		var C = x2 - x1;
		var D = y2 - y1;

		var dot = A * C + B * D;
		var len_sq = C * C + D * D;
		var param = -1;
		if (len_sq != 0) //in case of 0 length line
		      param = dot / len_sq;

		var xx, yy;

		if (param < 0) {
		    xx = x1;
		    yy = y1;
		}
		else if (param > 1) {
		    xx = x2;
		    yy = y2;
		}
		else {
			xx = x1 + param * C;
		    yy = y1 + param * D;
		}

		var dx = x - xx;
		var dy = y - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}
}