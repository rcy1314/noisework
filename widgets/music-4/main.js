const songs = [
    {artist: 'New West', name:'those eyes' ,music:'songs/eyes.mp3', duration:'03:40', img:'img/newWest.jfif'}
    , {artist: 'd4vd', name:'hear with me' ,music:'songs/hear.mp3', duration:'04:02', img:'img/d4vd.jfif'}
    , {artist: 'borns', name:'past lives' ,music:'songs/past.mp3', duration:'02:33', img:'img/borns.jfif'}
    , {artist: 'stephen sanchez', name:'until i found you' ,music:'songs/until.mp3', duration:'02:58', img:'img/stephenSanchez.jfif'}
];
let songIndex = 0;
const player = document.querySelector('.player')
const loader = document.querySelector('.loading');
const songImg = document.querySelector('.art');
const playButton = document.getElementById('play');
const audio = document.querySelector('audio');
const buttons = document.querySelectorAll('.b');
const playI = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songDuration = document.querySelector('.right');
const songName = document.getElementById('song');
const artist = document.getElementById('artist');
const time = document.querySelector('.left');
buttons.forEach(item =>{
    item.addEventListener('click', function (e){
        e.preventDefault();
    })
})
let isPlaying = false;
playButton.addEventListener('click', musicPlayer);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
function musicPlayer() {
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
}
function loadSong(index) {
    let $this = songs[index];
    audio.setAttribute('src', $this.music);
    artist.innerText = $this.artist;
    songName.innerText = $this.name;
    songDuration.innerHTML = $this.duration;
    songImg.setAttribute('src', $this.img);
}
function playSong(){
    audio.play();
    let myInterval = setInterval(function (){
        if(audio.currentTime >= 59){
            let txt = String((audio.currentTime / 60).toFixed(2));
            let txt2 = `${txt[0]}:${txt.substring(2, txt.length)}`;
            time.innerHTML = txt2
        }
        else{
            let str = String(audio.currentTime.toFixed(0));
            time.innerHTML = `00:${str}`;
        }
    }, 1000)
    playI.classList.replace('fa-play', 'fa-pause');
    isPlaying = true;
}
function pauseSong(){
    audio.pause();
    playI.classList.replace('fa-pause', 'fa-play');
    isPlaying = false;
}
function prevSong() {
    if(songIndex === 0){
        songIndex = songs.length-1;
        loadSong(songIndex);
        playSong();
    }else{
        songIndex--;
        loadSong(songIndex);
        playSong();
    }
}
function nextSong() {
    if(songIndex === songs.length-1){
        songIndex = 0;
        loadSong(songIndex);
        playSong();
    }else{
        songIndex++;
        loadSong(songIndex);
        playSong();
    }
}
function endedSong() {
    nextSong();
}