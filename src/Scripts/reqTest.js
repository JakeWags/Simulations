requirejs.config({
	baseUrl: 'js/util'
});


requirejs(["Particle, Vector"], function(p, v) {
	console.log("test");
});