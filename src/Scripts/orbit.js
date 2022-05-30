window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;


	let p1 = new Particle(500, 500, 0, 0);
	p1.mass = 100;
	p1.radius = 100;

	let p2 = new Particle(250,250,2.5,-Math.PI/4);
	p2.mass = 10;
	p2.radius = 15;

	let angleBetween = p1.angleBetween(p2);

	let delta; // time elapsed since last frame in milliseconds, 16.3333 = 60fps
	let t1 = Date.now();


	let gravConst = 0.023;
	let grav = new Vector(0,0);

	// F = G*(m1m2/r1r2)
	let gravForce = (gravConst*(p1.mass*p2.mass))/(p1.radius*p2.radius);

	grav.setLength(gravForce);


	const update = () => {
		ctx.clearRect(0,0,width,height);
		angleBetween = p1.angleBetween(p2);
		grav.setAngle(angleBetween);

		ctx.beginPath();
		ctx.moveTo(p1.getPosition().getX(), p1.getPosition().getY());
		ctx.lineTo(p2.getPosition().getX(),p2.getPosition().getY());
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(p1.getPosition().getX(), p1.getPosition().getY(), p1.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(p2.getPosition().getX(), p2.getPosition().getY(), p2.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "blue";
		ctx.fill();

		p2.accelerate(grav);
		p2.update();

		delta = Date.now() - t1;
		t1 = Date.now();

		requestAnimationFrame(update);
	}

	update();
};