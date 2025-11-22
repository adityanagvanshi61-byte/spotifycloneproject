let audio = new Audio();

let songs = [
  {
    title: "Ishare Tere",
    artist: "Guru Randhawa",
    src: "songs/1.mp3",
    banner: "https://th.bing.com/th/id/OIP.dxb-aEppkQ2DamvnJakulgHaHa",
  },
  {
    title: "Main Khiladi",
    artist: "Tanishk Bagchi",
    src: "songs/2.mp3",
    banner: "https://th.bing.com/th/id/OIP.as9qlCk32IAyA6xr2jkSeAAAAA",
  },
  {
    title: "Dhundhala",
    artist: "Talwinder",
    src: "songs/3.mp3",
    banner: "https://th.bing.com/th/id/OIP.C_ELo7BBKhBul3Mb0KcG2gHaEK",
  },
  {
    title: "MASHA ULTRAFUNK",
    artist: "Spotify",
    src: "songs/4.mp3",
    banner: "https://th.bing.com/th/id/OIP.-zuXZ5mmrXeCfFXI_8j3HQHaEK",
  },
  {
    title: "Samjho Na",
    artist: "Aditya Rikhari",
    src: "songs/5.mp3",
    banner: "https://th.bing.com/th/id/OIP.Cl_H7N4PFwaYAFWlVoaR7QHaHa",
  },
  {
    title: "Jo Tere Sang",
    artist: "Kunal Khemu",
    src: "songs/6.mp3",
    banner: "https://th.bing.com/th/id/OIP.18R2CFyBj9lcr3b46w2_FwHaEK",
  },
  {
    title: "First Kiss",
    artist: "Honey Singh",
    src: "songs/7.mp3",
    banner: "https://th.bing.com/th/id/OIP.QirHSqH61zT0UNeF_1Y4-QHaEK",
  },
  {
    title: "Ishq Wala Love",
    artist: "Neeti Mohan",
    src: "songs/8.mp3",
    banner: "https://th.bing.com/th/id/OIP.Ke7CXJjy-KvFvaortQ2y9AHaEK",
  },
  {
    title: "One Love",
    artist: "Shubh",
    src: "songs/9.mp3",
    banner: "https://th.bing.com/th/id/OIP.Qi2Y71N7P0KZDHEpu_7UDwHaEK",
  },
];

let currentIndex = 0;


const masterPlay = document.getElementById("masterPlay");
const progressSlider = document.getElementById("myProgressBar");
const volumeSlider = document.getElementById("vol");

const banner = document.querySelector(".big-album");
const bannerTitle = document.getElementById("Song-banner");

const footerTitle = document.querySelector(".p-title");
const footerSub = document.querySelector(".p-sub");

const nextBtn = document.querySelector(".fa-forward-step").closest("button");
const prevBtn = document.querySelector(".fa-backward-step").closest("button");

const songItems = document.querySelectorAll(".Songsitems");



function loadSong(index) {
  const s = songs[index];

  audio.src = s.src;

  banner.src = s.banner;
  bannerTitle.innerText = s.title;

  footerTitle.innerText = s.title;
  footerSub.innerText = s.artist;

  progressSlider.value = 0;
}



function playSong() {
  audio.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
}


function pauseSong() {
  audio.pause();
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
}



masterPlay.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});



audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressSlider.value = (audio.currentTime / audio.duration) * 100;
  }
});


progressSlider.addEventListener("input", () => {
  audio.currentTime = (progressSlider.value / 100) * audio.duration;
});


volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});



function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

songItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    currentIndex = idx;
    loadSong(idx);
    playSong();
  });
});



document.getElementById("PLAYERTHUMB").addEventListener("click", nextSong);



loadSong(currentIndex);

document.body.onload = () => {
  songItems.forEach((item, idx) => {
    let s = songs[idx];
    item.querySelector(".song-title").innerText = s.title;
    item.querySelector(".song-artist").innerText = s.artist;
    item.querySelector("img").src = s.banner;
  });
};

audio.volume = 0.5;
volumeSlider.value = 50;
