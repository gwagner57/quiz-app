var timeLimitInMinutes = 0.3;
var timeLimitInSeconds = timeLimitInMinutes * 60;
const timerElement = document.getElementById('timer');

function startTimer() {
  timeLimitInSeconds--;
  var minutes = Math.floor(timeLimitInSeconds / 60);
  var seconds = timeLimitInSeconds % 60;

  if (timeLimitInSeconds < 0) {
    timerElement.textContent = '00:00';
    clearInterval(timerInterval);
    // Trigger the button click event when time is over
    const finishButton = document.querySelector('.btn'); // Get the "Finish the Quizz" button
    finishButton.click();
    return;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timerElement.textContent = 'Time left ' + minutes + ':' + seconds;
}

var timerInterval = setInterval(startTimer, 1000);