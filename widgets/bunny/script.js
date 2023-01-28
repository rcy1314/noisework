const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
document.getElementById('image').addEventListener(touchEvent, function(e) {
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	console.log('animate');
	image = document.getElementById('image');
	image.src = 'bunny.gif';
});

var image = (new Image().src = 'bunny.gif');

/* FOR JS LOCAL STORAGE SETTINGS
window.addEventListener(touchEvent, mode);

function mode() {
	const currentTheme = localStorage.getItem('bunny-data-theme');
	console.log(currentTheme);
	if (currentTheme == 'dark') {
		light();
	} else {
		dark();
	}
}

function light() {
	localStorage.setItem('bunny-data-theme', 'light');
	document.documentElement.setAttribute('bunny-data-theme', 'light');
}

function dark() {
	localStorage.setItem('bunny-data-theme', 'dark');
	document.documentElement.setAttribute('bunny-data-theme', 'dark');
}

let currentTheme = localStorage.getItem('bunny-data-theme');

if (currentTheme == 'light') {
	light();
} else {
	dark();
}
*/

// DYNAMIC THEME SETTINGS BASED ON OS PREFERENCE

function light() {
	document.documentElement.setAttribute('bunny-data-theme', 'light');
}

function dark() {
	document.documentElement.setAttribute('bunny-data-theme', 'dark');
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	dark();
} else {
	light();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	if (event.matches) {
		dark();
	} else {
		light();
	}
});
