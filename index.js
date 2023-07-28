const baseUrl = "http://localhost:3000";
const fullQuizBtn = document.getElementById("get-full-quiz");
const quizBtn = document.getElementById("quizButton");
const quizAnswerElement = document.getElementById("quiz-answer");
const quizQuestionElement = document.getElementById("quiz-question");
const studySheet = document.getElementById("study-sheet");
//directly determines the time for answer to be displayed
//answer is removed from screen after 2x quizQuestionTime duration
let quizQuestionTime = 3000;

//renders a study question and answer when clicked
//renders an alert when answer is copied
addQuizButtonEventListener();
//iterates through quiz data to render every question/answer/section when clicked
addGetFullQuizButtonEventListener();


const displayImage = document.getElementById("display-image");
const addMemeBtn = document.getElementById("addMemeButton");
const memeFormDiv = document.getElementById("meme-form-div");
const memeBtn = document.getElementById("laughButton");

//accepts a new meme url and persists to db.json
addNewMemeBtnEventListener();
//renders a random meme when clicked
addLaughButtonEventListener();


const quoteBtn = document.getElementById("quoteButton");
const quoteTextElement = document.getElementById("quote-text");
const quoteAuthorElement = document.getElementById("quote-author");
//renders a random quote when clicked
addQuoteButtonEventListener();


const counterElement = document.getElementById("counter");
const pauseBtn = document.getElementById("pause");
const clearBtn = document.getElementById("clear");
let counterValue = counterElement.innerText * 1;
let counterIntervalId = 0;
let revealedAnswerTimerId;
let timerId;
let answerClearTimerId;
incrementTimer();
addPauseBtnEventListener();
addClearBtnEventListener();



function fetchData(db, cbFunc) {
  fetch(`${baseUrl}/${db}`)
  .then((res) => res.json())
  .then((data) => {
    cbFunc(data);
  });
}
function generateRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function addQuizButtonEventListener() {
  quizBtn.addEventListener("click", () => {
    fetchData("quiz", renderRandomQuizQuestion);
  });
}

function renderRandomQuizQuestion(questionArr) {
  let randomIndex = generateRandomIndex(questionArr.length);
  renderQuizQuestion(questionArr, randomIndex);
}

function renderQuizQuestion(questionArr, index) {
  quizQuestionElement.innerText = questionArr[index].question;
  quizBtn.disabled = true;
  quizBtn.innerText = "Think!";
  setTimeout(() => {
    quizAnswerElement.innerText = `Answer: ${questionArr[index].answer}`;
    quizAnswerElement.addEventListener("copy", () => {
      alert("I hope you aren't cheating!");
    });
  }, quizQuestionTime);
  setTimeout(() => {
    quizQuestionElement.innerText = "";
    quizAnswerElement.remove()
    quizBtn.disabled = false;
    quizBtn.innerText = "Quiz";
  }, quizQuestionTime * 3);
}

function addGetFullQuizButtonEventListener() {
  fullQuizBtn.addEventListener("click", () => {
    fetchData("quiz", renderFullQuiz)
  });
}

function renderFullQuiz(fullQuiz) {
  studySheet.innerHTML = "";
  for (let quesAnsPair in fullQuiz) {
    let questionAnswerOrderListElem = document.createElement("ol");
    let questionLi = document.createElement("li");
    questionLi.innerText = `Q: ${fullQuiz[quesAnsPair]["answer"]}`;
    let answerLi = document.createElement("li");
    answerLi.innerText = `A: ${fullQuiz[quesAnsPair]["question"]}`;
    let sectionLi = document.createElement("li");
    sectionLi.innerText = `Section: ${fullQuiz[quesAnsPair]["section"]}`;
    let lineBreak = document.createElement("br");

    questionAnswerOrderListElem.appendChild(questionLi);
    questionAnswerOrderListElem.appendChild(answerLi);
    questionAnswerOrderListElem.appendChild(sectionLi);
    questionAnswerOrderListElem.appendChild(lineBreak);
    studySheet.appendChild(questionAnswerOrderListElem);
  }
}

function addLaughButtonEventListener() {
  memeBtn.addEventListener("click", () => {
    fetchData("memes", renderRandomMeme);
  });
}
function renderRandomMeme(memeArr) {
  let randomIndex = generateRandomIndex(memeArr.length);
  displayImage.src = memeArr[randomIndex].imageUrl;
}

function addNewMemeBtnEventListener() {
  addMemeBtn.onclick = () => {
    let memeForm = document.createElement("form");
    let newMemeSubmitBtn = document.createElement("button");
    let memeUrlInputElement = document.createElement("input");
    memeUrlInputElement.setAttribute("type", "text");
    memeUrlInputElement.setAttribute("value", "");
    memeUrlInputElement.setAttribute("placeholder", "Enter meme URL...");
    memeUrlInputElement.setAttribute("id", "newMemeInput");
    newMemeSubmitBtn.innerText = "submit";
    memeForm.appendChild(memeUrlInputElement);
    memeForm.appendChild(newMemeSubmitBtn);
    memeFormDiv.appendChild(memeForm);
    memeForm.addEventListener("submit", handleMemeSubmit);
  };
}
function handleMemeSubmit(e) {
  e.preventDefault();
  fetch(`${baseUrl}/meme`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl: e.target[0].value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      displayImage.src = data.imageUrl;
      logSuccess();
      document.getElementById("newMemeInput").value = "";
    });
}

function logSuccess() {
  let successMessage = document.createElement("h3");
  successMessage.innerText = "Thank you for the new addition!";
  let successElement = document.getElementById("success");
  successElement.appendChild(successMessage);
  setTimeout(() => {
    successElement.remove();
  }, 4000);
}

function addQuoteButtonEventListener() {
  quoteBtn.addEventListener("click", () => {
    fetchData("quotes", renderRandomQuote);
  });
}

function renderRandomQuote(quoteArr) {
  let randomIndex = generateRandomIndex(quoteArr.length);
  let quoteContent = quoteArr[randomIndex].quote;
  let author = quoteArr[randomIndex].author;
  quoteTextElement.innerText = quoteContent;
  quoteAuthorElement.innerText = author;
}


function addClearBtnEventListener() {
  clearBtn.addEventListener("click", () => {
    clearInterval(timerId);
    counterElement.innerText = 0;
    counterValue = 0;
    pauseBtn.innerText = "Resume";
  });
}

function addPauseBtnEventListener() {
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
