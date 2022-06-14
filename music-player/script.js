const audioelement=document.querySelector("audio");
const prevBtn=document.getElementById("prev");
const nextBtn=document.getElementById("next");
const playBtn=document.getElementById("play");
const image=document.querySelector("img");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const progress=document.getElementById("progress");
const currentTimeEL=document.getElementById("current-time");
const durationele=document.getElementById("duration");
const progressContainer=document.getElementById("progress-container");
const songs=[
    {
        "Name":"jacinto-1",
        "displayName":"Electric Chill Machine",
        "artist":"Jacinto Design"
        
    },
    {
        "Name":"jacinto-2",
        "displayName":"Seven Nation Army (Remix)",
        "artist":"Jacinto Design"
        
    },
    {
        "Name":"jacinto-3",
        "displayName":"Goodnight,Disco Queen",
        "artist":"Jacinto Design"
        
    },
    {
        "Name":"metric-1",
        "displayName":"Front Row (Remix)",
        "artist":"Metric/Jacinto Design"
        
    }
]
let isPlaying=false;
let songIndex=0;
function playSong(){
    isPlaying=true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
    audioelement.play();
}
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
    audioelement.pause();
}
function updateProgressBar(e){
    if(isPlaying){
        const{duration,currentTime}=e.srcElement;
        const progressPercent=((currentTime/duration)*100);
        progress.style.width=`${progressPercent}%`;
        const durationmin=Math.floor(duration/60);
        let durationsec=Math.floor(duration%60);
        if(durationsec<10)durationsec=`0${durationsec}`;
        if(durationsec)durationele.textContent=`${durationmin}:${durationsec}`;
        //
        const currentTimemin=Math.floor(currentTime/60);
        let currentTimesec=Math.floor(currentTime%60);
        if(currentTimesec<10)currentTimesec=`0${currentTimesec}`;
        currentTimeEL.textContent=`${currentTimemin}:${currentTimesec}`;
    }
}
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    audioelement.src=`music/${song.Name}.mp3`;
    image.src=`img/${song.Name}.jpg`;
}
function nextSong(){
        songIndex++;
        if(songIndex>3){
            songIndex=songs.length-1;
        }
        loadSong(songs[songIndex]);
        audioelement.play();
        
    return;
}
function prevSong(){
        songIndex--;
        if(songIndex<0){
            songIndex=0;
        }
        loadSong(songs[songIndex]);
        audioelement.play();
        
    return;
}
function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX; 
    const{duration}=audioelement;
    const time=(clickX/width)*duration;
    audioelement.currentTime=time;
}
playBtn.addEventListener("click",()=>{
    isPlaying?pauseSong():playSong();

})
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
audioelement.addEventListener("timeupdate",updateProgressBar);
progressContainer.addEventListener("click",setProgressBar);
audioelement.addEventListener("ended",nextSong);