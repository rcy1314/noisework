"use strict";var

PI = Math.PI,cos = Math.cos,sin = Math.sin,abs = Math.abs,sqrt = Math.sqrt,pow = Math.pow,floor = Math.floor,round = Math.round,random = Math.random,atan2 = Math.atan2;
var HALF_PI = 0.5 * PI;
var TAU = 2 * PI;
var TO_RAD = PI / 180;
var rand = function rand(n) {return n * random();};
var randIn = function randIn(min, max) {return rand(max - min) + min;};
var randRange = function randRange(n) {return n - rand(2 * n);};
var fadeIn = function fadeIn(t, m) {return t / m;};
var fadeOut = function fadeOut(t, m) {return (m - t) / m;};
var fadeInOut = function fadeInOut(t, m) {
	var hm = 0.5 * m;
	return abs((t + hm) % m - hm) / hm;
};
var dist = function dist(x1, y1, x2, y2) {return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));};
var angle = function angle(x1, y1, x2, y2) {return atan2(y2 - y1, x2 - x1);};
var lerp = function lerp(n1, n2, speed) {return (1 - speed) * n1 + speed * n2;};

var particleCount = 1000;
var spawnRadius = 100;
var noiseSteps = 6;

var canvas = void 0;
var ctx = void 0;
var center = void 0;
var tick = void 0;
var simplex = void 0;
var positions = void 0;
var velocities = void 0;
var lifeSpans = void 0;
var sizes = void 0;
var hues = void 0;
var speeds = void 0;

function setup() {
	tick = 0;
	center = [];
	createCanvas();
	createParticles();
	draw();
}

function createParticles() {
	simplex = new SimplexNoise();
	positions = new Float32Array(particleCount * 2);
	velocities = new Float32Array(particleCount * 2);
	lifeSpans = new Float32Array(particleCount * 2);
	speeds = new Float32Array(particleCount);
	hues = new Float32Array(particleCount);
	sizes = new Float32Array(particleCount);

	var i = void 0;

	for (i = 0; i < particleCount * 2; i += 2) {
		initParticle(i);
	}
}

function initParticle(i) {
	var iy = void 0,ih = void 0,rd = void 0,rt = void 0,cx = void 0,sy = void 0,x = void 0,y = void 0,s = void 0,rv = void 0,vx = void 0,vy = void 0,t = void 0,h = void 0,si = void 0,l = void 0,ttl = void 0;

	iy = i + 1;
	ih = 0.5 * i | 0;
	rd = rand(spawnRadius);
	rt = rand(TAU);
	cx = cos(rt);
	sy = sin(rt);
	x = center[0] + cx * rd;
	y = center[1] + sy * rd;
	rv = randIn(0.1, 1);
	s = randIn(1, 8);
	vx = rv * cx * 0.1;
	vy = rv * sy * 0.1;
	si = randIn(0.1, 1);
	h = randIn(160, 260);
	l = 0;
	ttl = randIn(50, 200);

	positions[i] = x;
	positions[iy] = y;
	velocities[i] = vx;
	velocities[iy] = vy;
	hues[ih] = h;
	sizes[ih] = si;
	speeds[ih] = s;
	lifeSpans[i] = l;
	lifeSpans[iy] = ttl;
}

function drawParticle(i) {
	var iy = void 0,ih = void 0,x = void 0,y = void 0,n = void 0,tx = void 0,ty = void 0,s = void 0,vx = void 0,vy = void 0,h = void 0,si = void 0,l = void 0,dl = void 0,ttl = void 0,c = void 0;

	iy = i + 1;
	ih = 0.5 * i | 0;
	x = positions[i];
	y = positions[iy];
	n = simplex.noise3D(x * 0.0025, y * 0.0025, tick * 0.0005) * TAU;
	vx = lerp(velocities[i], cos(n * noiseSteps), 0.05);
	vy = lerp(velocities[iy], sin(n * noiseSteps), 0.05);
	s = speeds[ih];
	tx = x + vx * s;
	ty = y + vy * s;
	h = hues[ih];
	si = sizes[ih];
	l = lifeSpans[i];
	ttl = lifeSpans[iy];
	dl = fadeInOut(l, ttl);
	c = "hsla(" + h + ",50%,60%," + dl + ")";

	l++;

	ctx.a.save();
	ctx.a.lineWidth = dl * si + 1;
	ctx.a.strokeStyle = c;
	ctx.a.beginPath();
	ctx.a.moveTo(x, y);
	ctx.a.lineTo(tx, ty);
	ctx.a.stroke();
	ctx.a.closePath();
	ctx.a.restore();

	positions[i] = tx;
	positions[iy] = ty;
	velocities[i] = vx;
	velocities[iy] = vy;
	lifeSpans[i] = l;

	(checkBounds(x, y) || l > ttl) && initParticle(i);
}

function checkBounds(x, y) {
	return (
		x > canvas.a.width ||
		x < 0 ||
		y > canvas.a.height ||
		y < 0);

}

function createCanvas() {
	canvas = {
		a: document.createElement("canvas"),
		b: document.createElement("canvas") };

	canvas.b.style = "\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t";






	document.body.appendChild(canvas.b);
	ctx = {
		a: canvas.a.getContext("2d"),
		b: canvas.b.getContext("2d") };

	resize();
}

function resize() {var _window =
	window,innerWidth = _window.innerWidth,innerHeight = _window.innerHeight;

	canvas.a.width = canvas.b.width = innerWidth;
	canvas.a.height = canvas.b.height = innerHeight;
	center[0] = 0.5 * innerWidth;
	center[1] = 0.5 * innerHeight;
}

function draw() {
	tick++;
	ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

	ctx.b.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);

	var i = void 0;

	for (i = 0; i < particleCount * 2; i += 2) {
		drawParticle(i);
	}

	ctx.b.save();
	ctx.b.filter = 'blur(8px)';
	ctx.b.globalCompositeOperation = 'lighten';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	ctx.b.save();
	ctx.b.globalCompositeOperation = 'lighter';
	ctx.b.drawImage(canvas.a, 0, 0);
	ctx.b.restore();

	window.requestAnimationFrame(draw);
}

window.addEventListener("load", setup);
window.addEventListener("resize", resize);