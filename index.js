//Global Const calls
const baseUrl = "http://localhost:3000"
const quizUrl = baseUrl + "/quiz"
const memeUrl = baseUrl + "/memes"
const quoteUrl = baseUrl + "/quotes"
const quizBtn = document.getElementById("quizButton")
const memeBtn = document.getElementById("laughButton")
const quoteBtn = document.getElementById("quoteButton")

//Main code


//Attaching event listeners to the buttons and getting response when clicked 
quizBtn.addEventListener("click", ()=> {
    getQuiz()
})
memeBtn.addEventListener('click', ()=>{
    getMemes()
})
quoteBtn.addEventListener('click', ()=>{
    getQuotes()
})

// Fetch functions grabbing data from the arrays
function getQuiz() {
    fetch(quizUrl)
    .then(res => res.json())
    .then(quiz => {quiz.forEach(giveQuiz)
    })
}
function getMemes(){
    fetch(memeUrl)
    .then(res => res.json())
    .then(meme => {meme.forEach(giveMeme)
    })
}
function getQuotes(){
    fetch(quoteUrl)
    .then(res => res.json())
    .then(quote => {quote.forEach(giveQuote)
    })
}

//Function that asks a question in div and then the answer when the div is clicked
function giveQuiz(quiz){
    const question = document.createElement('question')
    question.innerText=quiz.question
    const answer = document.createElement('answer')
    let textAnswer = answer.innerText=quiz.answer
    console.log(textAnswer)

    const boxDiv = document.getElementById("card-display")
    boxDiv.appendChild(question)

    boxDiv.addEventListener('click', ()=>{
        alert(textAnswer)
    })
    
}

//Function that displays a meme in the div
function giveMeme(meme){
    const img = document.createElement('img')
    img.src = meme.imageUrl

    const boxDiv = document.getElementById("card-display")
    boxDiv.appendChild(img)
}

//Function that displays a quote and its author when clicked
function giveQuote(quote){
    const content = document.createElement('content')
    const writer = document.createElement('writer')
    
    let textContent = content.innerText=quote.quote
    let textWriter = writer.innerText=quote.author

    const format = document.createElement ('p')
    format.innerHTML = textContent + " by " + textWriter


    const boxDiv = document.getElementById("card-display")
    boxDiv.appendChild(format)
}


