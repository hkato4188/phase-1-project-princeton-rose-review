//Global Const calls
const baseUrl = "http://localhost:3000";
const quizUrl = baseUrl + "/quiz";
const memeUrl = baseUrl + "/memes";
const quoteUrl = baseUrl + "/quotes";
const counterElement = document.getElementById("counter");
const pauseButton = document.getElementById("pause");
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
let timerId;
let revealedAnswerTimerId;
let answerClearTimerId;
let quizQuestionTime = 5000;
//Main code

//Attaching event listeners to the buttons and getting response when clicked
quizBtn.addEventListener("click", () => {
  getQuiz();
});
memeBtn.addEventListener("click", () => {
  getMemes();
});
quoteBtn.addEventListener("click", () => {
  getQuotes();
});

addPauseButtonEventListener();

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

  setTimeout(() => {
    quizAnswerElement.innerText = `Answer: ${questionArr[index].answer}`;
  }, quizQuestionTime);

  setTimeout(() => {
    quizAnswerElement.innerText = "";
    quizAnswerElement.innerText = "";
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

function addPauseButtonEventListener() {
  pauseButton.addEventListener("click", () => {
    if (pauseButton.innerText === "pause") {
      clearInterval(timerId);
      pauseButton.innerText = "resume";
    } else {
      pauseButton.innerText = "pause";

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
