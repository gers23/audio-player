console.log('Hello');


const playBtn = document.querySelector('.play-btn');
const playBtnPrev = document.querySelector('.play-prev');
const playBtnNext = document.querySelector('.play-next');
const timeline = document.querySelector(".timeline");
const audio = new Audio();
const image = new Image();
const volumeBtn = document.querySelector('.volume-button');
const sliderVolume = document.querySelector('.volume-slider');
const volumeContainer = document.querySelector('.volume-container');
const sliderContainer = document.querySelector('.slider-container');
let isPlay = false;
playNum = 0;
const songs = [
    './assets/audio/01.one_cat_day.mp3',
    './assets/audio/02.deathStranding.mp3',
    './assets/audio/03.TheEndOfTheWorld.mp3'
];
const covers = [
    './assets/img/cover1.jpg',
    './assets/img/cover2.jpg',
    './assets/img/cover3.jpg'
];

const artists = [
    'Leaking Of Mind',
    'CHVRCHES',
    'Skeeter Davis'
]
const titles = [
    'One Day Cat',
    'Death Stranding',
    'The End Of The World'
]


// functions
function switchSong() {
    audio.src = songs[playNum];
}

function playAudio() {
  
//   audio.currentTime = 0;
  if(!isPlay) {
      audio.play();
      document.querySelector('img').classList.add('increase');
      isPlay = true;
  } else {
      audio.pause();
      document.querySelector('img').classList.remove('increase');
      isPlay = false;
  }
  playBtn.classList.toggle('pause'); 
  
}

function previousSong() {
    playNum -= 1;
    console.log(playNum);
    if (playNum < 0) playNum = songs.length - 1;
    console.log(songs.length);
    if(isPlay) {
        playBtn.classList.remove('pause');
        isPlay = false;
    }
    switchSong()
    playAudio()
    changeTitleSong() 
    changeImage()
}

function nextSong () {
    playNum += 1;
    if (playNum >= songs.length) playNum = 0;
    if(isPlay) {
        playBtn.classList.remove('pause');
        isPlay = false;
    } 
    switchSong()
    playAudio()
    changeTitleSong() 
    changeImage()
    
}

function changeImage() {
    image.src = covers[playNum];
    document.getElementsByClassName('cover')[0].append(image);
}

function changeBackgroundImage() {
    image.src = covers[playNum];
    document.getElementsByClassName('main')[0].style.background = image;
}

function changeTitleSong() {
    const songName = document.querySelector('.song-title');
    const artistName = document.querySelector('.song-artist');
    artistName.textContent = artists[playNum];
    songName.textContent = titles[playNum];

}

function seekDurationSong(elem) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = elem.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

function showDuration() {
   let timeLength =  document.querySelector('.time .length');
   console.log(audio.duration);
   timeLength.textContent = getTimeCodeFromNum(audio.duration);
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours)}.padStart(2, 0):${minutes}.padStart(2, 0):${String(seconds % 60).padStart(2, 0)}`;
}

function changeVolume(amount) {
    audio.volume = parseFloat(amount.target.value);
    changeIconVolume()
}


function changeVolumeScroll(elem) {
    if (elem.deltaY < 0) {
        console.log('+');   
        sliderVolume.valueAsNumber += 0.05;
        audio.volume = parseFloat(elem.target.value);
    } else {
        console.log('-');
        audio.volume = parseFloat(elem.target.value);
        sliderVolume.value -= 0.05;
    }
    changeIconVolume()
}

// timeline 
setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  document.querySelector(".time .current").textContent = getTimeCodeFromNum(audio.currentTime);
});

// download song and cover
switchSong()
changeImage()
changeBackgroundImage()
changeTitleSong() 

// press play-buttons
playBtn.addEventListener('click', playAudio);
playBtnPrev.addEventListener('click', previousSong);
playBtnNext.addEventListener('click', nextSong);

// events
// timeline
audio.addEventListener('loadeddata', showDuration)
timeline.addEventListener("click", seekDurationSong);

// volume
volumeBtn.addEventListener('mouseenter', function () {
    sliderVolume.classList.add('appear');
    sliderContainer.classList.add('appear');
})
document.querySelector('.volume-container').addEventListener('mouseleave', function () {
    sliderVolume.classList.remove('appear');
    sliderContainer.classList.remove('appear');

})

sliderVolume.addEventListener('input', changeVolume);
sliderVolume.addEventListener('wheel', changeVolumeScroll);

volumeBtn.addEventListener('click', muteAudio)


function muteAudio() {
    let abc = 0.5;
    if(audio.volume !== 0) {
        abc = audio.volume;
        audio.volume = 0;
        sliderVolume.value = 0;
    } else {
        audio.volume = abc;
        sliderVolume.value = abc;
    }
    changeIconVolume();
}

function changeIconVolume() {
    if(audio.volume > 0.5) {
        volumeBtn.classList.add('high-volume');
    } else if(audio.volume === 0) {
        volumeBtn.classList.remove('high-volume');
        volumeBtn.classList.add('mute');
    } else {
        volumeBtn.classList.remove('high-volume');
        volumeBtn.classList.remove('mute')
    }
}