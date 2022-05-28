window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	let gravity = new Vector(0,0);
	gravity.setLength(0.24);
	gravity.setAngle(Math.PI/2);

	let p = new Particle(100,height-50, 20, -Math.PI/4, gravity);

	const update = () => {
		ctx.clearRect(0, 0, width, height);

		p.update();

		ctx.beginPath();
		ctx.arc(p.getPosition().getX(), p.getPosition().getY(), 20, 0, Math.PI * 2, false);
		ctx.fill();

		requestAnimationFrame(update);
	}

	update();
};