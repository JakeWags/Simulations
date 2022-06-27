window.onload = function() {

	/* TODO
	 *	- Add lives and asteroid ship collision
	 *  - must generate dynamic hitbox for ship (or just a rectangle)
	 *  - add end screen
	 *  - add start screen
	 *  - add other weapons (rockets, laser, etc.)
	 */

	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	let ship = new Particle(width / 2, height / 2, 0, 0);
	let thrust = new Vector(0,0);

	let shipAngle = 0;

	let thrusting = false,
		turningLeft = false,
		turningRight = false,
		shooting = false;


	let ship2 = new Ship(Math.floor(width/2), Math.floor(height/2), 0, 0);

	const keydown = (e) => {
		console.log(e.key);
		switch (e.key) {
			case "ArrowRight":
				turningRight = true;
				break;
			case "ArrowLeft":
				turningLeft = true;
				break;
			case "ArrowUp":
				ship2.thrusting = true;
				break;
			case " ":
				ship2.shooting = true;
				break;
		}
	}

	const keyup = (e) => {
		switch (e.key) {
			case "ArrowRight":
				turningRight = false;
				break;
			case "ArrowLeft":
				turningLeft = false;
				break;
			case "ArrowUp":
				ship2.thrusting = false;
				break;
			case " ":
				ship2.hasShot = false;
				ship2.shooting = false;
				break;
		}
	}

	document.onkeydown = keydown;
	document.onkeyup = keyup;


	const edgeWrap = (e) => {
		if (e.getX() > width) { // right wrap to left
			e.setX(0);
		}
		if (e.getX() < 0) { // left wrap to right
			e.setX(width);
		}

		if (e.getY() > height) { // bottom wrap to top
			e.setY(0);
		}
		if (e.getY() < 0) { // top wrap to bottom
			e.setY(height);
		}
	}

	const drawShip = () => {
		ctx.save();
		ctx.translate(ship.getPosition().getX(), ship.getPosition().getY());
		ctx.rotate(shipAngle);

		ctx.beginPath();
		ctx.moveTo(10, 0);
		ctx.lineTo(-10, -7);
		ctx.lineTo(-10, 7);
		ctx.lineTo(10, 0);
		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}

	const rotate = () => {
		if (turningRight) {
			ship2.rotateRad(0.05);
		}
		if (turningLeft) {
			ship2.rotateRad(-0.05);
		}

	}

	const shoot = () => {
		ship2.shoot();
	}

	const applyThrust = () => {
		if (ship2.thrusting) {
			thrust.setX(Math.cos(ship2.getAngle()) * 0.1);
			thrust.setY(Math.sin(ship2.getAngle()) * 0.1);
		} else {
			thrust.setLength(0);
		}
	}

	// let delta = Date.now();

	const generateAsteroids = (numAsteroids) => {
		for (let i = 0; i < numAsteroids; i++) {
			Asteroid.Asteroids.push(new Asteroid(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 1, Math.random() * Math.PI * 2));
		}
	}

	let asteroidCount = 10;

	const init = () => {
		generateAsteroids(asteroidCount);
		update();
	}

	const endGame = () => {
		ctx.clearRect(0, 0, width, height);
		console.log("victory royale");
		// implement end screen
	}

	const update = () => {
		ctx.clearRect(0, 0, width, height);
		// delta = Date.now() - delta;

		asteroidCount = Asteroid.Asteroids.length;

		rotate();
		applyThrust();
		ship2.accelerate(thrust);
		ship2.update(ctx);

		edgeWrap(ship2);

		Asteroid.Asteroids.forEach(function(e, i) {
			e.update();
			edgeWrap(e);

			e.draw(ctx);
		});

		if (asteroidCount != 0) {
			requestAnimationFrame(update);
		} else {
			endGame();
		}
	}

	init();
}