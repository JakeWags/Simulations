define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');
    let Vector = require('Vector');
    let Particle = require('Particle');
    let canvas = require('./canvas');

    let v1 = new Vector(1,10);
    print(v1.getLength());

    let p1 = new Particle(100,100);

    let ctx = canvas.getContext('2d');
    let height = canvas.height = window.innerHeight;
    let width = canvas.width = window.innerWidth;

    ctx.beginPath();
    ctx.arc(100, 100, 10, 0, Math.PI*2, false);
    ctx.fill();
});