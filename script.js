let fistNum = document.getElementById("first");
let secNum = document.getElementById("sec");
let signOutput = document.getElementById("sign");
let submitBtn = document.getElementById("submit");
let scoreOutput = document.getElementById("score");
let answerInput = document.getElementById("answerInput");
let popup = document.querySelector("dialog");
let sign = "+";
let digit = 2;
let randomNumber1;
let randomNumber2;
let answer;
let score = 0;

let correctSound = new Audio("sounds/correct.mp3");
let incorrectSound = new Audio("sounds/wrong.mp3");
let newQueSound = new Audio("sounds/newq.mp3");

function ChangeMode(e) {
  sign = e.value;
  signOutput.innerHTML = sign;
}

function updateDigit(e) {
  digit = Number(e.value);
  renderRandomNumber(digit);
}

function getRandomNumber(digits) {
  if (digits === 2) {
    return Math.floor(Math.random() * 90) + 10;
  } else if (digits === 3) {
    return Math.floor(Math.random() * 900) + 100;
  }
}
function renderRandomNumber(digitChoice) {
  newQueSound.play()
  randomNumber1 = getRandomNumber(digitChoice);
  randomNumber2 = getRandomNumber(digitChoice);

  fistNum.innerHTML = randomNumber1;
  secNum.innerHTML = randomNumber2;
}

renderRandomNumber(digit);

function doCalculation() {
  if (sign === "+") {
    answer = Math.floor(randomNumber1 + randomNumber2);
  } else {
    answer = Math.abs(randomNumber1 - randomNumber2);
  }
  //   alert(answer);
}

function checkAnswer() {
  if (!answerInput.value) return;
  if (answer == answerInput.value.trim()) {
    correct();
  } else {
    incorrect();
  }
}

const jsConfetti = new JSConfetti();

function correct() {
  correctSound.play();
  jsConfetti
    .addConfetti({
      emojis: ["👍", "✅", "😊", "💯", "🌟"],
      emojiSize: 35,
      confettiNumber: 100,
    })
    .then(() => {
      scoreOutput.innerHTML = score;
      renderRandomNumber(digit);
      clearInputValue();
    });
  score++;
}

function incorrect() {
  incorrectSound.play();

  jsConfetti
    .addConfetti({
      emojis: ["❌", answer],
      emojiSize: 55,
      confettiNumber: 70,
    })
    .then(() => {
      confirm('Correct answer is: ' + answer);
      renderRandomNumber(digit);
      clearInputValue();
      scoreOutput.innerHTML = score;
    });
  if (score <= 0) {
    score = 0;
  }
}

function clearInputValue() {
  answerInput.value = null;
}

submitBtn.addEventListener("click", () => {
  doCalculation();
  checkAnswer();
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

function closeModal() {
  popup.close();
}
function openModal() {
  popup.showModal();
}

openModal()