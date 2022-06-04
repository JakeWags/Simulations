window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	const g = 0.04;

	let p = new Particle(width/2, height/2, 0, 0);
	p.radius = 10;
	p.mass = 10;
	p.setGravity(new Vector(0, p.mass * g))

	const floorHeight = height - 100;
	let movement = new Vector(0,0);

	const drawBottom = () => {
		ctx.beginPath();
		ctx.fillStyle = "#2D3047";
		ctx.fillRect(0, floorHeight, width, 100);
	}

	const calcFloorCollision = () => {
		if (p.getY() + p.radius + p.getVelocity().getY() >= floorHeight) {
			p.setY(floorHeight-p.radius);
			p.getVelocity().setY((!jump)? (p.getVelocity().getY() * -2*bounceConstant) : 0);
			p.applyGrav = false;

			return true;
		} else {
			p.applyGrav = true;

			return false;
		}
	}

	const bounceConstant = 0.15;

	const calcWallCollision = () => {
		if (p.getX() + p.radius + p.getVelocity().getX() >= width) {
			p.setX(width - p.radius);
			p.getVelocity().setX(p.getVelocity().getX() * -bounceConstant);

			return true;
		}
		if (p.getX() - p.radius + p.getVelocity().getX() < 0) {
			p.setX(p.radius);
			p.getVelocity().setX(p.getVelocity().getX() * -bounceConstant);

			return true;
		}
		return false;
	}

	let left = false,
		right = false,
		jump = false,
		isOnFloor = false;

	const keydown = (e) => {
		switch (e.key) {
			case "ArrowRight":
				right = true;
				break;
			case "ArrowLeft":
				left = true;
				break;
			case " ":
				jump = true;
				break;
		}
	}

	const keyup = (e) => {
		switch (e.key) {
			case "ArrowRight":
				right = false;
				break;
			case "ArrowLeft":
				left = false;
				break;
			case " ":
				jump = false;
				break;
		}
	}

	const calcMovement = () => {
		movement.setLength(0);
		if (left) {
			movement.setX(-0.15);
		}
		if (right) {
			movement.setX(0.15);
		}
		if (jump && isOnFloor) {
			movement.setY(-6);
		}
		p.accelerate(movement);
	}

	const frictionCoefficient = 0.020;
	const calcFriction = () => {
		if (isOnFloor) {
			let fVec = new Vector(0,0);
			if (p.getVelocity().getX() > 0) { // moving right
				fVec.setX(frictionCoefficient * -1 * p.mass); // todo
			} else if (p.getVelocity().getX() < 0) { // moving left
				fVec.setX(frictionCoefficient * p.mass); // todo
			}

			if (Math.abs(p.getVelocity().getX()) < 0.2) {
				p.getVelocity().setX(0);
				return;
			}
			p.getVelocity().addTo(fVec);
		}
	}

	const update = () => {
		ctx.clearRect(0, 0, width, floorHeight); // uses floorHeight rather than height to avoid redrawing the floor

		ctx.beginPath();
		ctx.arc(p.getX(), p.getY(), p.radius, 0, Math.PI*2, false);
		ctx.fill();

	
		isOnFloor = calcFloorCollision();
		calcWallCollision();

		calcMovement();
		calcFriction();

		p.update();

		requestAnimationFrame(update);
	}


	drawBottom();
	ctx.fillStyle = "#1B998B";
	document.onkeydown = keydown;
	document.onkeyup = keyup;


	update();


};