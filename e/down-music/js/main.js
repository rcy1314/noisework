document.querySelector(".down").addEventListener("click", function () {
    let url = document.querySelector("input").value;
    let id = url.split("id=")[1].split("&")[0];
    let musicUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
    window.open(musicUrl);
})