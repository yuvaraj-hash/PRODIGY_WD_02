let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.querySelector('.timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    pauseTimer();
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('lap-times-container').innerHTML = '';
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    updateDisplay();
}

function updateDisplay() {
    const milliseconds = Math.floor(elapsedTime % 1000);
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    timerDisplay.textContent = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)} : ${pad(milliseconds, 3)}`;
}

function pad(number, width = 2) {
    return number.toString().padStart(width, '0');
}


lapButton.addEventListener('click', function() {
    const lapTime = elapsedTime;
    const lapDisplay = document.createElement('div');
    lapDisplay.textContent = `Lap: ${timerDisplay.textContent}`;
    const lapTimesContainer = document.getElementById('lap-times-container');
    if (lapTimesContainer.children.length >= 5) {
        lapTimesContainer.firstChild.remove();
    }

    lapTimesContainer.appendChild(lapDisplay);
});
    
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);