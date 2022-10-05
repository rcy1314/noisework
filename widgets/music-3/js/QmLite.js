var music = document.getElementById("music");
var pre = document.getElementById("pre");
var playon = document.getElementById("playon");
var playoff = document.getElementById("playoff");
var next = document.getElementById("next");
var song_img = document.getElementById("song_img");
var song_name = document.getElementById("song_name");
var singer = document.getElementById("singer");
var progress_update = document.getElementById("progress_update");
var bg_img = document.getElementById("bg_img");
playoff.onclick = function(){
	playoff.style.display="none";
	playon.style.display="inline-block";
	playsong();
}
playon.onclick = function(){
	playon.style.display="none";
	playoff.style.display="inline-block";
	pausesong();
}
pre.onclick = function(){
	presong();
}
next.onclick = function(){
	nextsong();
}
const songs= ["等风雪","长江绝恋","小说家","先生的酒","Pianoboy高至豪 - The truth that you leave"];
const singers= ["姜姜","Efficiency","Efficiency"];

let songIndex = 0;
let singernameIndex = 0;

loadsong(songs[songIndex],singers[singernameIndex]);
function loadsong(song,singername){
	song_name.innerHTML = song;
	singer.innerHTML = singername;
	song_img.src=`pic/${song}.jpg`;
	music.src=`music/${song}.mp3`;
	bg_img.src=`pic/${song}.jpg`;

}
function playsong(){
	music.play();
}
function pausesong(){
	music.pause();
}
function nextsong(){
	songIndex++;
	singernameIndex++;
	if(songIndex>songs.length-1){
		songIndex=0;
		singernameIndex=0;
	}
	
	loadsong(songs[songIndex],singers[singernameIndex]);
	music.play();
	playoff.style.display="none";
	playon.style.display="inline-block";
}
function presong(){
	songIndex--;
	if(songIndex<0){
		songIndex=songs.length-1;
	}
	loadsong(songs[songIndex],singers[singernameIndex]);
	music.play();
	playoff.style.display="none";
	playon.style.display="inline-block";
}
music.onended = function(){
	nextsong();
}

function updateprogress(e){
	const{duration,currentTime}=e.target;
	const updatetime=(currentTime/duration)*100;
	progress_update.style.width=`${updatetime}%`
}
music.ontimeupdate = updateprogress;

