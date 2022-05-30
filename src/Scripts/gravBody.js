window.onload = function() {
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const width = canvas.width = window.innerWidth;
	const height = canvas.height = window.innerHeight;

console.log("SIR! We have life...");
let locA = {
	x: 500,
	y: 500,
	m: 1000,
	r: 100
}

let vA = new Vector(0, 0.5);

let locB = {
	x: 120,
	y: 300,
	m: 150,
	r: 12
}


const update = () => {
	ctx.clearRect(0,0,width,height);

	ctx.beginPath();
	ctx.arc(locA.x,locA.y, locA.r, 0, Math.PI*2, false);
	ctx.fillStyle = "red";
	ctx.fill()
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(locB.x,locB.y, locB.r, 0, Math.PI*2, false);
	ctx.fillStyle = "black";
	ctx.fill()
	ctx.stroke()

newLoc = {
	x: locA.x + vA.x,
	y: locA.y + vA.y
}
requestAnimationFrame(update);

}	

 update();
};
