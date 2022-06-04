window.onload = function() {
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
			case "r":
				ship2.shootRocket();
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
	document.onmousemove = Rocket.findCursor();


	const edgeWrap = () => {
		if (ship2.getPosition().getX() > width) { // right wrap to left
			ship2.getPosition().setX(0);
		}
		if (ship2.getPosition().getX() < 0) { // left wrap to right
			ship2.getPosition().setX(width);
		}

		if (ship2.getPosition().getY() > height) { // bottom wrap to top
			ship2.getPosition().setY(0);
		}
		if (ship2.getPosition().getY() < 0) { // top wrap to bottom
			ship2.getPosition().setY(height);
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

	document.onmousemove = Rocket.findCursor;



	const update = () => {
		ctx.clearRect(0, 0, width, height);
		// delta = Date.now() - delta;

		rotate();
		applyThrust();
		ship2.accelerate(thrust);
		ship2.update(ctx);

		edgeWrap();

		requestAnimationFrame(update);
	}

	update();
}