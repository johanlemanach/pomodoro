const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
let myInterval;
let totalSeconds;
let isRunning = false;
let isPaused = false;

const appTimer = () => {
  if (!isRunning) {
    isRunning = true;
    isPaused = false;
    const sessionAmount = Number.parseInt(session.textContent);
    totalSeconds = sessionAmount * 60;
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

const updateSeconds = () => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  if (!isPaused) {
    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    if (secondsLeft < 10) {
      secondDiv.textContent = '0' + secondsLeft;
    } else {
      secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
      bells.play();
      clearInterval(myInterval);
      isRunning = false;
    }
  }
};

const pauseTimer = () => {
  if (isRunning) {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'resume' : 'pause';
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  isRunning = false;
  isPaused = false;
  pauseBtn.textContent = 'pause';
  session.textContent = '15';
  document.querySelector('.seconds').textContent = '00';
};

// Event listeners for the buttons
startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
