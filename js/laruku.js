// SELECTOR
// MAIN AUDIO
const audioContainer = document.querySelector("#audio-container");
const audio = document.querySelector("#main-audio");
// SHOW THUMBNAIL, TITLE AND ARTIST SONGS
const thumbnailSongs = document.querySelector("#thumbnail");
const titleSongs = document.querySelector("#titleSongs");
const artistSongs = document.querySelector("#artist");
// BUTTONS
const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
// PROGRESS
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
// TIME SONGS
const currTime = document.querySelector(".time-left-songs");
const durTime = document.querySelector(".time-right-songs");
// VOLUME SONGS
const volumeSongs = document.querySelector(".volume-songs");
const volumeIcon = document.querySelector("#volume-icon");
const progressVolumeContainer = document.querySelector(".progress-volume-container");
const progressVolume = document.querySelector(".progress-volume");
// LIST SONGS
const listSongs = document.querySelectorAll(".title-list-laruku p");

let songIndex = 0;
// CREATE CONTENT LOAD
window.addEventListener("DOMContentLoaded", () => {
  const item = musicLaruku[songIndex];

  thumbnailSongs.src = item.image;
  titleSongs.textContent = item.title;
  artistSongs.textContent = item.name;
  audio.src = item.music;
});

// SHOW CONTENT BASED ON ITEM
let show = (showMusic) => {
  const item = musicLaruku[showMusic];

  thumbnailSongs.src = item.image;
  titleSongs.textContent = item.title;
  artistSongs.textContent = item.name;
  audio.src = item.music;
};

// PLAY SONGS
let playSong = () => {
  audioContainer.classList.add("play");

  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
};

// PAUSE SONGS
let pauseSong = () => {
  audioContainer.classList.remove("play");

  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");

  audio.pause();
};

playBtn.addEventListener("click", () => {
  //   CONDITIONAL PLAY SONGS AND PAUSE SONGS
  const isPlaying = audioContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// NEXT SONGS
nextBtn.addEventListener("click", () => {
  songIndex++;

  if (songIndex > musicLaruku.length - 1) {
    songIndex = 0;
  }

  show(songIndex);
  playSong();
});

audio.addEventListener("ended", () => {
  songIndex++;

  if (songIndex > musicLaruku.length - 1) {
    songIndex = 0;
  }

  show(songIndex);
  playSong();
});

// PREVIOUS SONGS
prevBtn.addEventListener("click", () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = musicLaruku.length - 1;
  }

  show(songIndex);
  playSong();
});

// UPDATE PROGRESS BAR
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
});

// SET PROGRESS BAR
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// GET CURRENT AND DURATION SONGS
// GET CURRENT TIME
audio.addEventListener("timeupdate", () => {
  const mainCurrentTime = audio.currentTime;
  let currentMin = Math.floor(mainCurrentTime / 60);
  let currentSec = Math.floor(mainCurrentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  currTime.innerText = `${currentMin}:${currentSec}`;
});
// GET DURATION TIME
audio.addEventListener("loadeddata", () => {
  const mainDuration = audio.duration;
  let totalMin = Math.floor(mainDuration / 60);
  let totalSec = Math.floor(mainDuration % 60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }

  durTime.innerText = `${totalMin}:${totalSec}`;
});

// CLICK LIST SONGS
for (let i = 0; i < listSongs.length; i++) {
  listSongs[i].addEventListener("click", () => {
    const item = musicLaruku[i];
    thumbnailSongs.src = item.image;
    titleSongs.textContent = item.title;
    artistSongs.textContent = item.name;
    audio.src = item.music;
    playSong();
  });
}

// SET VOLUME MUTE AND UNMUTE
let fullVolumeSongs = () => {
  volumeSongs.classList.remove("mute");

  volumeIcon.querySelector("i.fa-solid").classList.remove("fa-volume-xmark");
  volumeIcon.querySelector("i.fa-solid").classList.add("fa-volume-high");

  audio.volume = 1.0;
  progressVolume.style.width = "100%";
};

let muteSongs = () => {
  volumeSongs.classList.add("mute");

  volumeIcon.querySelector("i.fa-solid").classList.add("fa-volume-xmark");
  volumeIcon.querySelector("i.fa-solid").classList.remove("fa-volume-high");

  audio.volume = 0;
  progressVolume.style.width = "0%";
};

volumeIcon.addEventListener("click", () => {
  const isVolume = volumeSongs.classList.contains("mute");

  if (isVolume) {
    fullVolumeSongs();
  } else {
    muteSongs();
  }
});

// progressVolumeContainer.addEventListener('click', function (e) {
//   const widthVolume = this.clientWidth;
//   const clickVolumeX = e.offsetX;
//   let volume = audio.volume;
//   audio.volume = (clickVolumeX / widthVolume) * volume;
//   console.log(audio.volume);
// });
