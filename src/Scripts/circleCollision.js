window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	
	// two non-moving, static circles with overlapping radii
	let c1 = new Particle(400,200,0,0);
	let c2 = new Particle(350,250,0,0);
	c1.radius = 50;
	c1.color = `rgb(${Math.random()*200 + 10}, ${Math.random()*200 + 20}, ${Math.random() * 200 + 30})`;
	c2.radius = 50;
	c2.color = `rgb(${Math.random()*200 + 10}, ${Math.random()*200 + 20}, ${Math.random() * 200 + 30})`;

	let left = false,
		right = false;

	const keydown = (e) => {
		switch (e.key) {
			case "ArrowRight":
				right = true;
				break;
			case "ArrowLeft":
				left = true;
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
		}
	}

	let movement = new Vector(0,0);

	const applyMovement = (c) => {
		movement.setLength(0);
		if (left) {
			movement.setX(-0.15);
		}
		if (right) {
			movement.setX(0.15);
		}
		c.accelerate(movement);
	}


	document.onkeydown = keydown;
	document.onkeyup = keyup;

	const drawCircle = (c) => {
		ctx.beginPath();
		ctx.arc(c.getX(), c.getY(), c.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = c.color;
		ctx.fill();
	}

	// returns true if the two given circles have overlapping radii
	const checkStaticCollision = (c1,c2) => {
		let A = c1.getX() - c2.getX();
		let B = c1.getY() - c2.getY();

		let R = c1.radius + c2.radius;

		return Math.abs( ((A*A) + (B*B)) < (R*R));
	} 

	const adjustStaticCirclePosition = (c1,c2) => {
		let midpointx = (c1.getX() + c2.getX())/2;
		let midpointy = (c1.getY() + c2.getY())/2;
		let dist = c1.distanceTo(c2);
		let c1x = c1.getX();
		let c1y = c1.getY();
		let c2x = c2.getX();
		let c2y = c2.getY();

		c1.setX(midpointx + (c1.radius * (c1x - c2x)/dist));
		c1.setY(midpointy + (c1.radius * (c1y - c2y)/dist));
		c2.setX(midpointx + (c2.radius * (c2x - c1x)/dist));
		c2.setY(midpointy + (c2.radius * (c2y - c1y)/dist));
	}

	const update = () => {
		ctx.clearRect(0, 0, width, height);
		
		if (checkStaticCollision(c1,c2)) {
			adjustStaticCirclePosition(c1,c2);;
		}

		applyMovement(c1);
		c1.update();
		c2.update();

		drawCircle(c1);
		drawCircle(c2);

		requestAnimationFrame(update);
	}

	update();
};