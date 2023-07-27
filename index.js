//Global Const calls
const baseUrl = "http://localhost:3000";
const quizUrl = baseUrl + "/quiz";
const memeUrl = baseUrl + "/memes";
const quoteUrl = baseUrl + "/quotes";
const counterElement = document.getElementById("counter");
const pauseBtn = document.getElementById("pause");
const quizBtn = document.getElementById("quizButton");
const memeBtn = document.getElementById("laughButton");
const quoteBtn = document.getElementById("quoteButton");
const displayImage = document.getElementById("display-image");
const quoteTextElement = document.getElementById("quote-text");
const quoteAuthorElement = document.getElementById("quote-author");
const quizQuestionElement = document.getElementById("quiz-question");
const quizAnswerElement = document.getElementById("quiz-answer");
let counterValue = counterElement.innerText * 1;
let counterIntervalId = 0;
let revealedAnswerTimerId;
let timerId;
let answerClearTimerId;
let quizQuestionTime = 3000;


quizBtn.addEventListener("click", () => {
  getQuiz();
});
memeBtn.addEventListener("click", () => {
  getMemes();
});
quoteBtn.addEventListener("click", () => {
  getQuotes();
});

addpauseBtnEventListener();
incrementTimer();

// Fetch functions grabbing data from the arrays
function getQuiz() {
  fetch(quizUrl)
    .then((res) => res.json())
    .then((questionArr) => {
      let randomQuestionIndex = generateRandomIndex(questionArr.length);
      giveQuiz(questionArr, randomQuestionIndex);
    });
}
function getMemes() {
  fetch(memeUrl)
    .then((res) => res.json())
    .then((memeArr) => {
      let randomMemeIndex = generateRandomIndex(memeArr.length);
      giveMeme(memeArr, randomMemeIndex);
    });
}
function getQuotes() {
  fetch(quoteUrl)
    .then((res) => res.json())
    .then((quoteArr) => {
      let randomQuoteIndex = generateRandomIndex(quoteArr.length);
      giveQuote(quoteArr, randomQuoteIndex);
    });
}

//Function that asks a question in div and then the answer when the div is clicked
function giveQuiz(questionArr, index) {
  quizQuestionElement.innerText = questionArr[index].question;
  quizBtn.disabled = true
  quizBtn.innerText = "Think!"
  setTimeout(() => {
    quizAnswerElement.innerText = `Answer: ${questionArr[index].answer}`;
  }, quizQuestionTime);

  setTimeout(() => {
    quizQuestionElement.innerText = "";
    quizAnswerElement.innerText = "";
    quizBtn.disabled = false
    quizBtn.innerText = "Quiz"
  }, quizQuestionTime * 3);
}

//Function that displays a meme in the div
function giveMeme(memeArr, index) {
  displayImage.src = memeArr[index].imageUrl;
}

//Function that displays a quote and its author when clicked
function giveQuote(quoteArr, index) {
  let quoteContent = quoteArr[index].quote;
  let author = quoteArr[index].author;
  quoteTextElement.innerText = quoteContent;
  quoteAuthorElement.innerText = author;
}

function generateRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function addpauseBtnEventListener() {
  pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerText === "Pause") {
      clearInterval(timerId);
      pauseBtn.innerText = "Resume";
    } else {
      pauseBtn.innerText = "Pause";

      incrementTimer();
    }
  });
}

function incrementTimer() {
  timerId = setInterval(incrementCounter, 1000);
}

function incrementCounter() {
  counterValue += 1;
  counterElement.innerText = counterValue;
}
