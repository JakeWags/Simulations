window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;


	let arrowX = width/2;
	let arrowY = height/2;
	let dx, dy;
	let angle = 0;

	let mouse = {
		x: 0,
		y: 0
	}

	document.onmousemove = getMouseLocation;

	function getMouseLocation(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function updateAngle() {
		dx = mouse.x - arrowX;
		dy = mouse.y - arrowY;
		angle = Math.atan2(dy,dx);
	}

	function drawArrow() {
		ctx.save();
		ctx.translate(arrowX, arrowY);
		ctx.rotate(angle);

		ctx.beginPath();
		ctx.moveTo(20, 0);
		ctx.lineTo(-20, 0);
		ctx.moveTo(20, 0);
		ctx.lineTo(10, -10);
		ctx.moveTo(20, 0);
		ctx.lineTo(10, 10);
		ctx.stroke();

		ctx.restore();
	}

	render();

	function render() {
		ctx.clearRect(0, 0, width, height);

		updateAngle();
		drawArrow();

		requestAnimationFrame(render);
	}

};