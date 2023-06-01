const playBtn = document.querySelector("#playBtn");
const preBtn = document.querySelector("#preBtn");
const nextBtn = document.querySelector("#nextBtn");
const songCover = document.querySelector(".imageCon img")
const songCurTime = document.querySelector(".right");
const songDura = document.querySelector(".left");
const songName = document.querySelector("#songName");
const seekBar = document.querySelector(".rangeCon input");
let index = 0;
let songDuration, songCurrentTime;
const songs = [
        { name: "Ajj Din Chadheya", singer: "Rahat Fateh Ali Khan", path: "songs/din chadeya.mp4", views: "5M", likes: "434", covers: "covers/aaj din chadeya.jpg" },
        { name: "Zaroori Tha", singer: "Rahat Fateh Ali Khan", path: "songs/zaroori tha.mp4", views: "1.4B", likes: "833", covers: "covers/zaroori tha.jpg" },
        { name: "Main Jahaan Rahoon", singer: "Rahat Fateh Ali Khan", path: "songs/main jahaan rahoon.mp4", views: "153", likes: "132", covers: "covers/main jahan rahoon.jpg" },
        { name: "Phir Bhi Tumko Chahunga", singer: "Arijit singh", path: "songs/phir bhi tumko.mp4", views: "54M", likes: "232", covers: "covers/phir bhi tumko.jpg" },
        { name: "O Re Piya", singer: "Rahat Fateh Ali Khan", path: "songs/o re piya.mp3", views: "10M", likes: "824", covers: "covers/o re piya.jpg" },
        { name: "O Bedardeya", singer: "Arjit Singh", path: "songs/O Bedardeya", views: "20M", likes: "2124", covers: "covers/O Bedardeya.jpg" },
        { name: "Pee Loon", singer: "Pritam", path: "songs/Pee Loon", views: "320M", likes: "142", covers: "covers/Pee Loon.jpg" },
        { name: "Apna Bana Le", singer: "Arjit Singh", path: "songs/apna Bana Le", views: "132M", likes: "8224", covers: "covers/Apna Bana Le.jpg" },
        { name: "Ishq Sufiyana", singer: "Vishal Shekhar", path: "songs/Ishq Sufiyana", views: "13M", likes: "321", covers: "covers/Ishq Sufiyana.jpg" },
        
];
let curSong = new Audio(songs[index].path);


const playSong = (index)=>{
    curSong = new Audio(songs[index].path);
    curSong.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    songCover.src = songs[index].covers;
    songName.innerText = songs[index].name;
    
    curSong.addEventListener("timeupdate", ()=>{
        seekBar.value = (curSong.currentTime/curSong.duration) * 100;
        songDuration = ((curSong.duration/60).toFixed(2)).toString();
        songDuration = songDuration.replace(".",":");
        songDura.innerText = songDuration;
        songCurrentTime = (curSong.currentTime/60).toFixed(2).toString();
        songCurrentTime = songCurrentTime.replace(".",":");
        songCurTime.innerText = songCurrentTime;
    })

    seekBar.addEventListener("change", ()=>{
        curSong.currentTime = (seekBar.value * curSong.duration) / 100;
        if (seekBar.value===100)
        {
            playSong(++index);
        }
    })
    
}





    playBtn.addEventListener("click", ()=>{
        if (curSong.paused||curSong.currentTime==0)
        {
            playSong(index);
        }
        else
        {
            curSong.pause();
            playBtn.classList.replace("fa-pause", "fa-play");
        }
    });

    nextBtn.addEventListener("click", ()=>{
        index++;
        curSong.pause();
        if (index>songs.length-1)
        {
            index=0;
        }
        playSong(index);
    })
    
    
    preBtn.addEventListener("click", ()=>{
        index--;
        curSong.pause();
        if (index<0)
        {
            index=songs.length-1;
        }
        playSong(index);
    })
    
window.addEventListener("keydown", (e)=>{
    if (e.code==="Space")
    {
        if(curSong.paused)
        {
            playSong(index);
        }
        else
        {
            curSong.pause();
            playBtn.classList.replace("fa-pause", "fa-play");
        }
    }
})