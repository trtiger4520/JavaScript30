const timeCtrls = document.querySelectorAll('button[data-time]');
const displayTime = document.querySelector('.display__time-left');
const displayEnd = document.querySelector('.display__end-time');

// setInterval
let countdown;

function startTimer() {
    let time = Number(this.dataset.time);
    CountDownFn(time);
}

function CountDownFn(sec) {
    clearInterval(countdown);
    const now = Date.now();
    let time = now + sec * 1000;
    DisplayTimeFn(sec);
    DisplayEndTimeFn(sec);
    countdown = setInterval(function(){
        let secondsLeft = Math.round((time - Date.now()) / 1000);
        DisplayTimeFn(secondsLeft);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000)
}

function DisplayTimeFn(seconds) {
    let sec = seconds % 60,
        min = Math.floor(seconds / 60);
    let fillinSec = MakeUpZero(sec, 2);
    displayTime.innerText = `${min}:${fillinSec}`;
    document.title = `${min}:${fillinSec}`;
}

function DisplayEndTimeFn(seconds) {
    let time = new Date(Date.now() - seconds * 1000);
    let hour = time.getHours(),
        min = time.getMinutes(),
        sec = time.getSeconds();
    let fillinHour = TwelveHour(hour);
    let fillinSec = MakeUpZero(sec, 2);
    displayEnd.innerText = `Be Back At ${fillinHour}:${min}:${fillinSec}`;
}

function TwelveHour(hour) {
    return hour % 12 === 0 ? 12 : hour % 12; 
}

function MakeUpZero(num, digit) {
    let digits = digit - String(num).length;
    return digits < 0 ? num : new Array(digits).fill().map(() => '0').join('') + num;
}

timeCtrls.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    let min = Number(this.minutes.value);
    CountDownFn(min * 60);
});