window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	const g = 0.6;

	let particles = [];
	const numParticles = 2000;


	const floorHeight = height - 100;
	let movement = new Vector(0,0);

	const drawBottom = () => {
		ctx.beginPath();
		ctx.fillStyle = "#2D3047";
		ctx.fillRect(0, floorHeight, width, floorHeight + height);
	}

	const generateParticles = () => {
		for (let i = 0; i < numParticles; i++) {
			let r = Math.random() * 10 + 5;
			let p = new Particle(Math.random()*width-50, Math.random()*(floorHeight-r), Math.random()*10, Math.PI*(Math.random()*2), new Vector(0, g));
			p.radius = r;
			p.mass = Math.random() * 10 + 5;

			particles.push(p);
		}
	}

	generateParticles();

	const calcFloorCollision = (p) => {
		if (p.getY() + p.radius + p.getVelocity().getY() >= floorHeight) {
			p.setY(floorHeight-p.radius);
			p.getVelocity().setY(p.getVelocity().getY() * -2*bounceConstant);
			p.applyGrav = false;

			return true;
		} else {
			p.applyGrav = true;

			return false;
		}
	}

	const bounceConstant = 0.15;

	const calcWallCollision = (p) => {
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

	const frictionCoefficient = 0.020;
	const calcFriction = (p) => {
		if (p.isOnFloor) {
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

	const drawParticle = (p) => {
		ctx.beginPath();
		ctx.arc(p.getX(), p.getY(), p.radius, 0, Math.PI*2, false);
		ctx.fill();
	}

	const particleCollision = (p1,p2) => {
		
	}

	const checkCollisions = (p) => {
		particles.forEach(function(p2) {
			// check collision
		});
	}

	const update = () => {
		ctx.clearRect(0, 0, width, floorHeight); // uses floorHeight rather than height to avoid redrawing the floor


		particles.forEach((e) => {
			e.isOnFloor = calcFloorCollision(e);
			calcWallCollision(e);

			calcFriction(e);

			drawParticle(e);
			e.update();
		});

		requestAnimationFrame(update);
	}


	drawBottom();
	ctx.fillStyle = "#1B998B";
	//document.onkeydown = keydown;
	//document.onkeyup = keyup;


	update();


};