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
		turningRight = false;

	const keydown = (e) => {
		switch (e.key) {
			case "ArrowRight":
				turningRight = true;
				break;
			case "ArrowLeft":
				turningLeft = true;
				break;
			case "ArrowUp":
				thrusting = true;
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
				thrusting = false;
				break;
		}
	}

	document.onkeydown = keydown;
	document.onkeyup = keyup;


	const edgeWrap = () => {
		if (ship.getPosition().getX() > width) { // right wrap to left
			ship.getPosition().setX(0);
		}
		if (ship.getPosition().getX() < 0) { // left wrap to right
			ship.getPosition().setX(width);
		}

		if (ship.getPosition().getY() > height) { // bottom wrap to top
			ship.getPosition().setY(0);
		}
		if (ship.getPosition().getY() < 0) { // top wrap to bottom
			ship.getPosition().setY(height);
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

	const rotateShip = () => {
		if (turningLeft) {
			shipAngle -= 0.05;
		}
		if (turningRight) {
			shipAngle += 0.05;
		}
	}

	const applyThrust = () => {
		if (thrusting) {
			//to be implemented
		}
	}


	const update = () => {
		ctx.clearRect(0, 0, width, height);

		rotateShip();
		applyThrust();
		ship.accelerate(thrust);
		ship.update();
		edgeWrap();

		drawShip();

		requestAnimationFrame(update);
	}

	update();
}