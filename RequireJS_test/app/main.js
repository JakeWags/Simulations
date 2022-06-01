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


    print(messages.getHello());

    let v1 = new Vector(1,10);
    print(v1.getLength());

    let p1 = new Particle(100,100);
    print(p1.angleBetweenPoint(100,400));

    //let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let height = canvas.height = window.height;
    let width = canvas.width = window.width;

    console.log(canvas.width);
    console.log(canvas.height);
});

// canvas not working