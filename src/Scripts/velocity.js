window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	const p = new Particle(100, 100, 3, Math.PI / 6);

	const particles = [];
	const numParticles = 100;

	for (let i = 0; i < numParticles; i++) {
		particles.push(new Particle(width/2, height/2, Math.random() * 4 + 1, Math.random() * Math.PI * 2));
	}

	const drawParticle = (p) => {
		p.update();
		ctx.beginPath();
		ctx.arc(p.getPosition().getX(), p.getPosition().getY(), 10, 0, 2*Math.PI, false);
		ctx.fill();
	}

	const update = () => {
		ctx.clearRect(0, 0, width, height);

		particles.forEach(drawParticle);

		requestAnimationFrame(update);
	}

	update();
};