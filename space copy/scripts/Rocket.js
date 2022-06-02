class Rocket extends Particle{
	static rocketSpeed = 7
	static rocketLegnth = 20
	#shipAngle
	#rocketTip

constructor(x, y, speed = Rocket.rocketSpeed, angle, shipAngle) {
		super(x, y, speed, angle);
		this.#shipAngle = shipAngle;
	}

static findCursor(e) {
	console.log(e);
}

}
