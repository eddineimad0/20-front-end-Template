const player = document.getElementById("player");
const playBtn = document.getElementById("play-btn");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const volumeIcon = document.getElementById("volume-icon");
const volumeBar = document.querySelector(".volume-bar");
const volumeRange = document.querySelector(".volume-range");
const videoCurrentTime = document.querySelector(".time-elapsed");
const videoDuration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //
function replayVideo() {
  showPlayBtn.apply(playBtn);
  video.currentTime = 0;
}
function showPlayBtn() {
  this.classList.replace("fa-pause", "fa-play");
  this.setAttribute("title", "Play");
}
function play() {
  if (video.paused) {
    this.classList.replace("fa-play", "fa-pause");
    this.setAttribute("title", "Pause");
    video.play();
  } else {
    video.pause();
    showPlayBtn.apply(playBtn);
    localStorage.setItem("currentTime", video.currentTime);
  }
}

// Progress Bar ---------------------------------- //
function stringfyTime(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return `${time}`;
}
function calcTime(duration) {
  const Minute = 60;
  const Hour = 60 * Minute;
  const hours = stringfyTime(Math.floor(duration / Hour));
  const minutes = stringfyTime(Math.floor((duration % Hour) / Minute));
  const seconds = stringfyTime(Math.floor(duration % Minute));

  if (hours !== "00") {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
function setProgress() {
  const paramObject = JSON.parse(localStorage.getItem("parameters"));
  let currentTime = paramObject.currentTime;
  if (!currentTime) currentTime = 0;
  video.currentTime = currentTime;
  currentTime = calcTime(currentTime);
  let duration = calcTime(this.duration);
  videoDuration.textContent = duration;
  videoCurrentTime.textContent = currentTime + " /";
  progressBar.style.width = `${(currentTime / video.duration) * 100}%`;
  video.playbackRate = paramObject.playBackRate;
  video.volume = paramObject.volume;
  updateVolumeIcon(paramObject.volume);
}
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  videoDuration.textContent = calcTime(video.duration);
  videoCurrentTime.textContent = calcTime(video.currentTime) + " /";
  const paramObject = {
    currentTime: video.currentTime,
    volume: video.volume,
    playBackRate: speed.value,
  };
  localStorage.setItem("parameters", JSON.stringify(paramObject));
}
function seekProgress(event) {
  const value = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${value * 100}%`;
  video.currentTime = video.duration * value;
}

// Volume Controls --------------------------- //
function updateVolumeIcon(volume) {
  volumeBar.style.width = `${volume * 100}%`;
  volumeIcon.className = "";
  if (volume >= 0.6) volumeIcon.classList.add("fas", "fa-volume-up");
  if (volume < 0.6 && volume > 0)
    volumeIcon.classList.add("fas", "fa-volume-down");
  if (volume === 0) volumeIcon.classList.add("fas", "fa-volume-off");
  lastVolume = volume;
}
let lastVolume = 1;
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume <= 0.1) {
    volume = 0;
  }
  if (volume >= 0.94) {
    volume = 1;
  }
  video.volume = volume;
  updateVolumeIcon(volume);
}
function muteHandler() {
  if (video.volume) {
    video.volume = 0;
    volumeIcon.className = "";
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.className = "";
    if (lastVolume >= 0.6) volumeIcon.classList.add("fas", "fa-volume-up");
    if (lastVolume < 0.6 && lastVolume > 0)
      volumeIcon.classList.add("fas", "fa-volume-down");
    volumeIcon.setAttribute("title", "Mute");
  }
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
let isFullScreen = false;
function toggleFullScreen() {
  if (!isFullScreen) {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      /* IE11 */
      player.msRequestFullscreen();
    }
    isFullScreen = !isFullScreen;
    video.classList.add("video-fullscreen");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    isFullScreen = !isFullScreen;
    video.classList.remove("video-fullscreen");
  }
}

// Events Listeners
setProgress();
playBtn.addEventListener("click", play);
video.addEventListener("click", play.bind(playBtn));
video.addEventListener("ended", replayVideo);
video.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("click", seekProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", muteHandler);
speed.addEventListener("click", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
