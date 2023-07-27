//Global Const calls
const baseUrl = "http://localhost:3000";
const quizDbUrl = baseUrl + "/quiz";
const memeDbUrl = baseUrl + "/memes";
const quoteDbUrl = baseUrl + "/quotes";
const counterElement = document.getElementById("counter");
const pauseBtn = document.getElementById("pause");
const clearBtn = document.getElementById("clear");
const fullQuizBtn = document.getElementById("get-full-quiz");
const studySheet = document.getElementById('study-sheet')
const addMemeBtn = document.getElementById("addMemeButton");
const memeFormDiv = document.getElementById("meme-form-div");
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

addPauseBtnEventListener();
addClearBtnEventListener();
addNewMemeBtnEventListener()

incrementTimer();

// Fetch functions grabbing data from the arrays
function getQuiz() {
  fetch(quizDbUrl)
    .then((res) => res.json())
    .then((questionArr) => {
      let randomQuestionIndex = generateRandomIndex(questionArr.length);
      giveQuiz(questionArr, randomQuestionIndex);
    });
}
function getMemes() {
  fetch(memeDbUrl)
    .then((res) => res.json())
    .then((memeArr) => {
      let randomMemeIndex = generateRandomIndex(memeArr.length);
      giveMeme(memeArr, randomMemeIndex);
    });
}
function getQuotes() {
  fetch(quoteDbUrl)
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
    quizAnswerElement.addEventListener("copy", ()=>{
      alert("I hope you aren't cheating!")
    })
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
function addClearBtnEventListener(){
  clearBtn.addEventListener("click", ()=>{
    clearInterval(timerId);
    counterElement.innerText = 0;
    counterValue = 0;
  })
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

function addNewMemeBtnEventListener(){
  addMemeBtn.onclick = ()=>{
  
    let memeForm = document.createElement('form');
    let newMemeSubmitBtn = document.createElement('button')
    let memeUrlInput = document.createElement('input');
    newMemeSubmitBtn.innerText = "submit"
    memeUrlInput.setAttribute("type", "text")
    memeUrlInput.setAttribute("value", "")
    memeUrlInput.setAttribute("placeholder", "Enter meme URL...")
    memeUrlInput.setAttribute("id", "newMemeInput")
    memeForm.appendChild(memeUrlInput)
    memeForm.appendChild(newMemeSubmitBtn)
    memeFormDiv.appendChild(memeForm)
    
    memeForm.addEventListener("submit", handleMemeSubmit)
  }}
function handleMemeSubmit(e){
  e.preventDefault()
    fetch(memeDbUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl: e.target[0].value
      })
    })
    .then(res => res.json())
    .then(data => {
      displayImage.src = data.imageUrl
      logSucces()
    })
  
}

function logSucces(){
  console.log("i think we added something")
  let successMessage = document.createElement('h3')
  successMessage.innerText = "Thank you for the new addition!"
  let successElement = document.getElementById('success')
  successElement.appendChild(successMessage)
  setTimeout(()=>{
    successElement.remove()
  },4000)
  document.getElementById('newMemeInput').value = ""
}

fullQuizBtn.addEventListener("click", ()=>{
  fetch(quizDbUrl)
    .then(res => res.json())
    .then(fullQuiz => {
      studySheet.innerHTML = ""
      for(let quesAnsPair in fullQuiz){
        let qAorderListElem = document.createElement('ol') 
        let questionLi = document.createElement('li')
        questionLi.innerText = `Q: ${fullQuiz[quesAnsPair]["answer"]}`
        let answerLi = document.createElement('li')
        answerLi.innerText = `A: ${fullQuiz[quesAnsPair]["question"]}`
        let sectionLi = document.createElement('li')
        sectionLi.innerText = `Section: ${fullQuiz[quesAnsPair]["section"]}`
        let lineBreak = document.createElement('br')
        
        qAorderListElem.appendChild(questionLi)
        qAorderListElem.appendChild(answerLi)
        qAorderListElem.appendChild(sectionLi)
        qAorderListElem.appendChild(lineBreak)
        studySheet.appendChild(qAorderListElem)
      }
      
    })
})