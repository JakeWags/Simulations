window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;


	let p1 = new Particle(width/2, height/2, 0, 0);
	p1.mass = 5000;
	p1.radius = 70;

	let p2 = new Particle(width/2,height/2 - 200,14,0);
	p2.mass = 10;
	p2.radius = 10;

	let p3 = new Particle(width/2, height/2 - 400, 20,0);
	p3.mass = 20;
	p3.radius = 20;


	let angleBetween = p1.angleBetween(p2);

	let delta; // time elapsed since last frame in milliseconds, 16.3333 = 60fps
	let t1 = Date.now();

	let tracePoints = [];


	let gravConst = 0.035;
	let grav = new Vector(0,0);
	let grav2 = new Vector(0,0);

	// F = G*(m1m2/r1r2)
	let gravForce = (gravConst*(p1.mass*p2.mass))/(p1.radius*p1.radius);
	let gravForce2 = (gravConst*(p1.mass*p3.mass))/(p1.radius*p1.radius);

	let grav3 = new Vector(0,0);
	let gravForce3 = (gravConst*(p2.mass*p3.mass))/(p2.radius*p2.radius);

	grav.setLength(gravForce);
	grav2.setLength(gravForce2);
	grav3.setLength(gravForce3);


	const update = () => {
		ctx.clearRect(0,0,width,height);
		angleBetween = p1.angleBetween(p2);
		grav.setAngle(angleBetween);
		grav2.setAngle(p1.angleBetween(p3));
		grav3.setAngle(p2.angleBetween(p3));


		// ctx.beginPath();
		// ctx.moveTo(p1.getPosition().getX(), p1.getPosition().getY());
		// ctx.lineTo(p2.getPosition().getX(),p2.getPosition().getY());
		// ctx.stroke();

		ctx.beginPath();
		ctx.arc(p1.getPosition().getX(), p1.getPosition().getY(), p1.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "yellow";
		ctx.fill();


		ctx.beginPath();
		ctx.arc(p2.getPosition().getX(), p2.getPosition().getY(), p2.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "blue";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(p3.getPosition().getX(), p3.getPosition().getY(), p3.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";
		ctx.fill();
		

		tracePoints.push([p2.getPosition().getX(), p2.getPosition().getY()]);
		tracePoints.push([p3.getPosition().getX(), p3.getPosition().getY()]);

		if (tracePoints.length > 200) {
			tracePoints.shift();
			tracePoints.shift();
		}

		tracePoints.forEach(function(point) {
			ctx.beginPath();
			ctx.arc(point[0], point[1], 2, 0, Math.PI*2, false);
			ctx.fillStyle = "black";
			ctx.fill();
		});

		p2.accelerate(grav);
		

		p3.accelerate(grav2);
		p3.accelerate(grav3);

		grav3.setAngle(p3.angleBetween(p2));
		p2.accelerate(grav3);

		p2.update();
		p3.update();

		delta = Date.now() - t1;
		t1 = Date.now();

		requestAnimationFrame(update);
	}

	update();
};