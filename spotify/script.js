const songs = [
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

const audio = new Audio();
let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;

const libraryList = document.getElementById("libraryList");
const cards = document.getElementById("cards");
const radios = document.getElementById("radios");
const songBanner = document.getElementById("songBanner");
const bannerTitle = document.getElementById("Song-banner");
const bannerArtist = document.getElementById("Song-artist");
const playerThumb = document.getElementById("PLAYERTHUMB");
const pTitle = document.getElementById("pTitle");
const pSub = document.getElementById("pSub");
const masterPlay = document.getElementById("masterPlay");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const myProgressBar = document.getElementById("myProgressBar");
const progressWrap = document.getElementById("progressWrap");
const vol = document.getElementById("vol");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const globalSearch = document.getElementById("globalSearch");
const libSearch = document.getElementById("libSearch");
const toggleSidebar = document.getElementById("toggleSidebar");
const leftSidebar = document.getElementById("leftSidebar");

function createLibraryAndCards() {
  libraryList.innerHTML = "";
  cards.innerHTML = "";
  radios.innerHTML = "";

  songs.forEach((s, idx) => {
    const lib = document.createElement("a");
    lib.className = "lib-item";
    lib.href = "#";
    lib.dataset.index = idx;
    lib.innerHTML = `<img src="${s.banner}" alt="">
      <div class="meta"><div class="title">${s.title}</div><div class="subtitle">${s.artist}</div></div>`;
    libraryList.appendChild(lib);

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.index = idx;
    card.innerHTML = `<img src="${s.banner}" alt="">
      <div class="card-title">${s.title}</div>
      <div class="card-sub">${s.artist}</div>`;
    cards.appendChild(card);

    const radio = document.createElement("article");
    radio.className = "radio-card";
    radio.dataset.index = idx;
    radio.innerHTML = `<img src="${s.banner}" alt="">
      <div class="card-title">${s.artist}</div>`;
    radios.appendChild(radio);
  });

  document.querySelectorAll(".lib-item, .card").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const i = Number(el.dataset.index);
      selectSong(i);
      playSong();
    });
  });

  document.querySelectorAll(".radio-card").forEach((el) => {
    el.addEventListener("click", () => {
      const i = Number(el.dataset.index);
      selectSong(i);
      playSong();
    });
  });
}

function selectSong(i) {
  currentIndex = i;
  const s = songs[currentIndex];
  audio.src = s.src;
  songBanner.src = s.banner;
  bannerTitle.innerText = s.title;
  bannerArtist.innerText = s.artist;
  playerThumb.src = s.banner;
  pTitle.innerText = s.title;
  pSub.innerText = s.artist;
  highlightActive();
}

function highlightActive() {
  document.querySelectorAll(".lib-item, .card, .radio-card").forEach((el) => {
    el.classList.toggle(
      "active-item",
      Number(el.dataset.index) === currentIndex
    );
  });
}

function playSong() {
  audio.play().catch((err) => {
    console.warn(
      "Playback failed (likely autoplay policy). Click play to start.",
      err
    );
  });
  masterPlay.firstElementChild?.classList?.remove?.("fa-circle-play");
  masterPlay.firstElementChild?.classList?.add?.("fa-circle-pause");
}

function pauseSong() {
  audio.pause();
  masterPlay.firstElementChild?.classList?.remove?.("fa-circle-pause");
  masterPlay.firstElementChild?.classList?.add?.("fa-circle-play");
}

masterPlay.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener("click", () => {
  if (isShuffle) {
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  selectSong(currentIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    selectSong(currentIndex);
    playSong();
  }
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  shuffleBtn.style.color = isShuffle ? "#1db954" : "";
});
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  repeatBtn.style.color = isRepeat ? "#1db954" : "";
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  myProgressBar.style.width = pct + "%";
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playSong();
    return;
  }
  nextBtn.click();
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progressWrap.addEventListener("click", (e) => {
  const rect = progressWrap.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const pct = x / rect.width;
  if (audio.duration) audio.currentTime = pct * audio.duration;
});

vol.addEventListener("input", () => {
  audio.volume = vol.value / 100;
});

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

document.addEventListener("keydown", (e) => {
  const targetTag = document.activeElement?.tagName;
  if (e.code === "Space" && targetTag !== "INPUT" && targetTag !== "TEXTAREA") {
    e.preventDefault();
    masterPlay.click();
  }
});

globalSearch.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach((card) => {
    const txt = card.innerText.toLowerCase();
    card.style.display = txt.includes(q) ? "" : "none";
  });
});
libSearch.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".lib-item").forEach((item) => {
    const txt = item.innerText.toLowerCase();
    item.style.display = txt.includes(q) ? "" : "none";
  });
});

toggleSidebar.addEventListener("click", () => {
  if (
    leftSidebar.style.display === "none" ||
    getComputedStyle(leftSidebar).display === "none"
  ) {
    leftSidebar.style.display = "block";
  } else {
    leftSidebar.style.display = "none";
  }
});

function init() {
  createLibraryAndCards();
  selectSong(currentIndex);
  audio.volume = vol.value / 100;

  audio.preload = "metadata";
}

window.selectSong = selectSong;

init();
