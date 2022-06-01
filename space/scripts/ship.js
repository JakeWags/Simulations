class Ship extends Particle {
	#angle = 0;
	shooting = false;
	shipLength = 50;

	constructor(x = 50, y = 50, angle = 0, speed = 0) {
		super(x,y,speed,angle);
		this.#angle = angle;

	}

	getAngle() { return this.#angle; }

	// rotate the ship using radians
	rotateRad(radians) {
		this.#angle += radians;
	}

	// rotate the ship using degrees
	rotateDeg(degrees) {
		this.rotateRad(degrees*(Math.PI/180));
	}
		
	draw(ctx) {
		//ctx.save();
		//ctx.translate(this.getX(), this.getY());
		//ctx.rotate(this.#angle);

		// ctx.beginPath();
		// ctx.moveTo(super.getX()+10, super.getY());
		// ctx.lineTo(super.getX()-10, super.getY()-7);
		// ctx.lineTo(super.getX()-10, super.getY()+7);
		// ctx.lineTo(super.getX()+10, super.getY());
		// ctx.fill();
		// ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.shipLength*Math.cos(this.#angle)+(super.getX()), this.shipLength*Math.sin(this.#angle)+(super.getY()));
		ctx.lineTo(this.shipLength*Math.cos(this.#angle)+(super.getX()), this.shipLength*Math.sin(this.#angle)+(super.getY()));
		ctx.lineTo(this.shipLength/3*Math.cos(this.#angle+Math.PI/2)+super.getX(),this.shipLength/3*Math.sin(this.#angle+Math.PI/2)+(super.getY()));
		ctx.lineTo(this.shipLength/3*Math.cos(this.#angle-Math.PI/2)+super.getX(),this.shipLength/3*Math.sin(this.#angle-Math.PI/2)+super.getY());
		ctx.lineTo(this.shipLength*Math.cos(this.#angle)+(super.getX()), this.shipLength*Math.sin(this.#angle)+(super.getY()));
		//ctx.fill();
		ctx.stroke();

		//ctx.restore();
	}
}