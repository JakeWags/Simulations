window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	let centerY = height * 0.5,
	    centerX = width * 0.5,
	    baseRadius = 5,
	    xRadius = 200,
	    yRadius = 200,
	    xAngle = 0.01,
	    yAngle = 0.01,
	    xSpeed = 0.02,
	    ySpeed = 0.02,
	    r = 0,
	    g = 0,
	    b = 0;

	let counter = 0;

	render();

	document.onkeydown = getKey;

	function getKey(e) {
		switch (e.code) {
			case "ArrowUp":
				ySpeed += 0.01;
				break;
			case "ArrowDown":
				ySpeed += -0.01;		
				break; 
			case "ArrowRight":
				xSpeed += 0.01;
				break;
			case "ArrowLeft":
				xSpeed += -0.01;
				break;
			default:
				return;
		}

		yAngle = 0;
		xAngle = 0;
		ctx.clearRect(0,0,width,height);
	}

	function render() {
		counter++;
		let x = centerX + Math.cos(xAngle) * xRadius;
		let y = centerY + Math.sin(yAngle) * yRadius;
		
		ctx.fillStyle = `rgb(${r},${g},${b})`;

		ctx.beginPath();
		ctx.arc(x, y, baseRadius, 0, Math.PI*2, false);
		ctx.fill();

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "40px Arial";
		ctx.fillText("" + Math.round(xSpeed*100) + ":" + Math.round(ySpeed*100), 200, 100);

		xAngle += xSpeed;
		yAngle += ySpeed;

		requestAnimationFrame(render);
	}

};