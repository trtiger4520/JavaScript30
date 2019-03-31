// GET Ctrl Player Element

// --Scope
let Region = document;

// --video
const video = Region.querySelector('.player video.viewer');

// --control
const control = Region.querySelector('.player__controls');
const progress = Region.querySelector('.progress__filled');
const progressBar = Region.querySelector('.progress');
const playBtn = Region.querySelector('.player__button.toggle');
const skipBtns = Region.querySelectorAll('.player__button[data-skip]');
const volume = Region.querySelector('input[name="volume"]');
const playbackRate = Region.querySelector('input[name="playbackRate"]');

// console.log(control
//     , progress
//     , playBtn
//     , skipBtns
//     , volume
//     , playbackRate);


// Parameter Setting

const Parm = {
    currentTime: 0,
    progress: 0,
    volume: 1,
    PlaybackRate: 1,
}

// Handle Function
function initVideo() {
    console.dir('initVideo');
    progress.style.flexBasis = `${ Parm.progress }%`;
    video.volume = Parm.volume;
    volume.value = Parm.volume;
    playbackRate.value = Parm.PlaybackRate;
    video.currentTime = Parm.currentTime;
}


function StopOrPlay(e) {
    let status = video.paused ? 'play': 'pause';
    video[status]();
}

function UpdateBtn() {
    let playBtnString = this.paused ? '►' : '||';
    playBtn.innerText = playBtnString;
}

function Skip() {
    let skipTime = this.dataset.skip;
    video.currentTime += Number(skipTime);
}

function UpdateProgress(){
    Parm.progress = (this.currentTime / this.duration) * 100;
    progress.style.flexBasis = `${ Parm.progress }%`;
}

function SetVolume() {
    Parm.volume = this.value / this.max;
    video.volume = Parm.volume;
}

function PlaybackRate() {
    let val = this.value,
        min = this.min,
        max = this.max;
    Parm.playbackRate = ((val - min) / (max - min) * 1.5) + 0.5;
    video.playbackRate = Parm.playbackRate;
}

function SetPrpgress(e) {
    Parm.progress = (e.offsetX / this.clientWidth) * video.duration;
    console.dir(Parm.progress);
    video.currentTime = Parm.progress;
}

// SetUp Even

video.addEventListener('loadstart', initVideo);
video.addEventListener('click', StopOrPlay);
video.addEventListener('play', UpdateBtn);
video.addEventListener('pause', UpdateBtn);
video.addEventListener('timeupdate', UpdateProgress);
playBtn.addEventListener('click', StopOrPlay);
skipBtns.forEach(i => i.addEventListener('click', Skip));
volume.addEventListener('change', SetVolume);
volume.addEventListener('mousemove', SetVolume);
playbackRate.addEventListener('change', PlaybackRate);
playbackRate.addEventListener('mousemove', PlaybackRate);
progressBar.addEventListener('click', SetPrpgress);
//progress.addEventListener('');