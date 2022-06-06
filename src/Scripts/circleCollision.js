window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	
	// two non-moving, static circles with overlapping radii
	let c1 = new Particle(150,100,2,Math.PI/5);
	let c2 = new Particle(400,200,0,0);
	c1.radius = 50;
	c1.mass = 5;
	c1.color = `rgb(${Math.random()*200 + 10}, ${Math.random()*200 + 20}, ${Math.random() * 200 + 30})`;
	c2.radius = 50;
	c2.mass = 5;
	c2.color = `rgb(${Math.random()*200 + 10}, ${Math.random()*200 + 20}, ${Math.random() * 200 + 30})`;

	let left = false,
		right = false,
		up = false,
		down = false;

	const keydown = (e) => {
		switch (e.key) {
			case "ArrowRight":
				right = true;
				break;
			case "ArrowLeft":
				left = true;
				break;
			case "ArrowUp":
				up = true;
				break;
			case "ArrowDown":
				down = true;
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
			case "ArrowUp":
				up = false;
				break;
			case "ArrowDown":
				down = false;
				break;
		}
	}

	let movement = new Vector(0,0);

	const applyUserInput = (c) => {
		movement.setLength(0);
		if (left) {
			movement.setX(-0.15);
		}
		if (right) {
			movement.setX(0.15);
		}
		if (up) {
			movement.setY(-0.15);
		}
		if (down) {
			movement.setY(0.15);
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

		return Math.abs(((A*A) + (B*B)) < (R*R));
	} 

	const checkDynamicStaticCollision = (c1, c2) => {
		let c1vx = c1.getVelocity().getX();
		let c1vy = c1.getVelocity().getY();
		let v = Particle.distToClosestPointOnLine(c1.getX(), c1.getY(), c1.getX()+c1vx, c1.getY()+c1vy, c2.getX(), c2.getY());
		let closestdistsq = Math.pow(v, 2);
		
		//console.log(closestdistsq, Math.pow(c1.radius + c2.radius, 2));
		
		if (closestdistsq <= Math.pow(c1.radius + c2.radius,2)) {
			// collision
			//console.log("collision");
			let backdist = Math.sqrt(Math.pow(c1.radius + c2.radius, 2) - closestdistsq);
			let d = Particle.closestPointOnLine(c1.getX(), c1.getY(), c1.getX()+c1vx, c1.getY()+c1vy, c2.getX(), c2.getY());
			let c1VecLength = c1.getVelocity().getLength();
			let cx = d.getX() - backdist * (c1vx / c1VecLength);
			let cy = d.getY() - backdist * (c1vy / c1VecLength);
			handleDynamicStaticCollision(c1, c2, cx,cy);
		} else {
			return new Vector(0,0);
		}
	}

	const handleDynamicStaticCollision = (c1, c2, cx, cy) => {
		let collisiondist = Math.sqrt(Math.pow(c2.getX() - cx, 2) + Math.pow(c2.getY() - cy, 2));
		let nx = (c2.getX() - cx) / collisiondist;
		let ny = (c2.getY() - cy) / collisiondist;
		let p = 2 * (c1.getVelocity().getX() * nx + c1.getVelocity().getY() * ny) / (c1.mass + c2.mass);
		let wx = c1.getVelocity().getX() - p * c1.mass * nx - p * c2.mass * nx;
		let wy = c1.getVelocity().getY() - p * c1.mass * nx - p * c2.mass * ny;
		let w = new Vector(wx, wy);
		c1.setVelocity(w);

		// let w2 = new Vector(-wx, -wy);
		// c2.setVelocity(w2);
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
		
		/* if (checkStaticCollision(c1,c2)) {
			adjustStaticCirclePosition(c1,c2);;
		} */
		
		checkDynamicStaticCollision(c1,c2);

		console.log(c1.getVelocity().getLength());
		// ctx.beginPath();
		// ctx.arc(v2.getX(), v2.getY(), 2, 0, Math.PI * 2,false);
		// ctx.fill();


		drawCircle(c1);
		drawCircle(c2);

		applyUserInput(c1);
		c1.update();
		c2.update();


		requestAnimationFrame(update);
	}

	update();
};