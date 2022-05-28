window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

	ctx.translate(width/2,height/2);
	ctx.scale(1,-1); // since y-axis is flipped

	let drawScale = 50;

	let drawAxes = () => {
		ctx.moveTo(0,0);
		ctx.lineTo(-width/2, 0);
		ctx.moveTo(0,0);
		ctx.lineTo(width/2,0);
		ctx.moveTo(0,0);
		ctx.lineTo(0, -height/2);
		ctx.moveTo(0,0);
		ctx.lineTo(0,height/2);
		ctx.stroke();
	}

	drawAxes();

	for (let angle = -Math.PI*8; angle < Math.PI * 8; angle += 0.01) {
		let x = angle * drawScale;
		let y = Math.cos(angle) * drawScale;

		ctx.fillRect(x,y, 2, 2);
	}
	
};