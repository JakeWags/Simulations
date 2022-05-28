// define a new class: Vector
// a class is an object which much be instanced in order to be used
// ex: let v = new Vector(10,10);
class Vector {

	/* class variables
	 * these have public access by default
	 * a # in front of the variable name means it is private
	 * a private class variable cannot be accessed outside of the class itself
	 * 
	 * PUBLIC:
	 * 		x = 1;
	 *		y = 1;
	 *
	 * PRIVATE:
	 *		#x = 1;
	 *		#y = 1;
	 *
	 *    the main reason private variables are used is to disallow the modification of variables from OUTSIDE of the class
	 */
	#x = 1;
	#y = 1;


	/* CONSTRUCTOR:
	 * 	  a constructor is a method which is called when a class is instanced
	 *       - when the "new" keyword is used
	 *    the constructor is used to initialize the class variables
	 *    a constructor is also often used to call initilize functions in a class
	 */
	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}

	/* GET FUNCTIONS:
	 *   get functions are used to retrieve data from a class object
	 *   a get function should be made for any private class variables which may need to be used outside of the class
	 *	 a get function should typically NOT be used to compute values, unless that computation is simple.
	 */
	getX() { return this.#x; }
	getY() { return this.#y; }
	getAngle() {
		return Math.atan2(this.#y, this.#x);
	}
	getLength() {
		return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
	}

	/* SET FUNCTIONS:
	 *   set functions are used to set class variables.
	 *   these are most often called from outside of a class, to change a value
	 *	 these are important to use for a few reasons:
	 *     1. Reduce duplicate code
	 *	   2. Reduce possible bug locations
	 *        - if there is only ONE place where the angle is being set, this is the only place bugs can occur when setting the angle
	 *	   3. Assign or change values of private class variables
	 */
	setX(value) {this.#x = value; }
	setY(value) { this.#y = value; }

	setAngle(angle) {
		let length = this.getLength();
		this.#x = Math.cos(angle) * length;
		this.#y = Math.sin(angle) * length;
	}

	setLength(length) {
		let angle = this.getAngle();
		this.#x = Math.cos(angle) * length;
		this.#y = Math.sin(angle) * length;
	}

	
	/* GENERAL FUNCTIONS
	 *	 these are functions which perform various actions related to the class
	 *   general functions can be anything, but should pertain to the class they are contained in.
	 */ 

	/* add, subtract, multiply, and divide are synonymous with +,-,*,/ but for vectors
	 * they all return a new vector, rather than modifying the current vector
	 *
	 * ex: 
	 *		v3 = v1 + v2       does not modify v1
	 * similarly: 
	 *		v3 = v1.add(v2)    does not modify v1
	 */
	add(v2) {
		return new Vector(this.#x + v2.getX(), this.#y + v2.getY());
	}

	subtract(v2) {
		return new Vector(this.#x - v2.getX(), this.#y - v2.getY());
	}

	multiply(val) {
		return new Vector(this.#x * val, this.#y * val);
	}

	divide(val) {
		return new Vector(this.#x / val, this.#y / val);
	}


	/* addTo, subtractFrom, multiplyBy, and divideBy all modify the current vector
	 * ex: 
	 * 		v1 = v1 + v2		modifies v1    
	 * similarly:
	 *		v1.addTo(v2)		modifies v1
	 */
	addTo(v2) {
		this.#x += v2.getX();
		this.#y += v2.getY();
	}

	subtractFrom(v2) {
		this.#x -= v2.getX();
		this.#y -= v2.getY();
	}

	multiplyBy(val) {
		this.#x *= val;
		this.#y *= val;
	}

	divideBy(val) {
		this.#x /= val;
		this.#y /= val;
	}
}