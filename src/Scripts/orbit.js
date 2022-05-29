window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;


	let p1 = new Particle(500, 500, 0, 0);

	let p2 = new Particle(250,250,1.24,-Math.PI/4);
	
	let angleBetween = p1.angleBetweenPoint(p2.getPosition().getX(), p2.getPosition().getY());

	let delta; // time elapsed since last frame in milliseconds, 16.3333 = 60fps
	let t1 = Date.now();


	let gravForce = 0.02;
	let grav = new Vector(0,0);
	grav.setLength(0.01);

	console.log(angleBetween);
	console.log(p1.angleBetween(p2));

	const update = () => {
		ctx.clearRect(0,0,width,height);
		angleBetween = p1.angleBetweenPoint(p2.getPosition().getX(), p2.getPosition().getY());
		grav.setAngle(angleBetween);

		ctx.beginPath();
		ctx.arc(p1.getPosition().getX(), p1.getPosition().getY(), 100, 0, Math.PI * 2, false);
		ctx.fillStyle = "green";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(p2.getPosition().getX(), p2.getPosition().getY(), 15, 0, Math.PI * 2, false);
		ctx.fillStyle = "blue";
		ctx.fill();

		// ctx.beginPath();
		// ctx.moveTo(p1.getPosition().getX(), p1.getPosition().getY());
		// ctx.lineTo(p2.getPosition().getX(),p2.getPosition().getY());
		// ctx.stroke();


		p2.accelerate(grav);
		p2.update();

		delta = Date.now() - t1;
		t1 = Date.now();

		requestAnimationFrame(update);
	}

	update();
};