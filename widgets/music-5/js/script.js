// Select elements from the DOM
const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const musicList = wrapper.querySelector(".music-list");
const moreMusicBtn = wrapper.querySelector("#more-music");
const closemoreMusic = wrapper.querySelector("#close");

// Random index of music in every reload window
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

// Fetch the metadata of the music from the js array
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
// When the play music is clicked, the icon innerText is change to show a pause icon
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music function
// When the pause music is clicked, the icon innerText is change to show a play icon
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//prev music function
function prevMusic() {
    musicIndex--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

//next music function
function nextMusic() {
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// play or pause button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

// Call the prevMusic function when the prevButton is clicked
prevBtn.addEventListener('click', () => {
    prevMusic();
})

// Call the nextMusic function when the nextButton is clicked
nextBtn.addEventListener("click", () => {
    nextMusic();
})

// The timeupdate event has a currentTime and duration propierties, that
// returns the actual time of the audio and the duration of the song
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Set the porcentage of the played song and incrust it in the progressBar style
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;


    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");

    // The loadeddata event indicates that the song is ready to play
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }

        // Shows the duration of the song
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });

    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }
    // Shows the current time
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;


});


progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
    playingSong();
});


//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");


repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped"); // Change the icon on the application
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffled"); // Change the icon on the application
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped"); // Change the icon on the application
            break;
    }
});

// The ended event is fired when playback has stopped because the end of the media was reached
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic(); //calling nextMusic function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; // Starts from the opening of the song
            loadMusic(musicIndex); // Repeat the music actually plays
            playMusic();
            break;

        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1); // Avoid to plays the same song that now plays
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

// Select ul tag to incrust inside the data of the list of songs
const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    // Obtains the index of the song and with it, fetch the name and the artist
    let liTag = `
        <li li-index="${i + 1}">
            <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        </li>
    `;

    // Insert the liTag between the ulTag using the inserAdjacent function
    ulTag.insertAdjacentHTML("beforeend", liTag);

    // Obtains the data of all the songs
    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        // Calculate the duration of each song in minutes and seconds
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) { // If seconds is smaller than 10, add a 0 digit to the total of seconds
            totalSec = `0${totalSec}`;
        }
        // Put in the DOM the audio duration
        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })

}

function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");
    // Check across the list of songs
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");
        // Check if any song of the list contains the playing class (That means this song is not actually playing)
        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            // Fetch the duration of the song and put it in the list of songs
            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
        }
        // If li-index is equals to the musict index, means that this song is actually playing, so add instead the duration, the text "Playing"
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        // Call this function when is clicked on any song of the list
        // Function is defined below
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

// When is clicked any song from the lis, call this funtion
function clicked(element) {
    // Get the index of the song tha was clicked in the list
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; // Current music playing index is replaced for the clicked index
    loadMusic(musicIndex); // Load the music with the clicked index to prepare for song
    playMusic();
    playingSong();
}