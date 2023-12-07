// import { chosenCategory } from './Index.js'

const api_url = {
    general: 'https://opentdb.com/api.php?amount=1&category=9&type=multiple&encode=url3986',
    film: 'https://opentdb.com/api.php?amount=1&category=11&difficulty=medium&type=multiple&encode=url3986', 
    music: 'https://opentdb.com/api.php?amount=1&category=12&difficulty=medium&type=multiple&encode=url3986',
    sport: 'https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple&encode=url3986',
    geography: 'https://opentdb.com/api.php?amount=1&category=22&difficulty=medium&type=multiple&encode=url3986',
    history: 'https://opentdb.com/api.php?amount=1&category=23&difficulty=medium&type=multiple&encode=url3986',
    books: 'https://opentdb.com/api.php?amount=1&category=10&difficulty=medium&type=multiple&encode=url3986',
    science: 'https://opentdb.com/api.php?amount=1&category=17&difficulty=medium&type=multiple&encode=url3986',
    video: 'https://opentdb.com/api.php?amount=1&category=15&difficulty=medium&type=multiple&encode=url3986',
    random: 'https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple&encode=url3986',
};

let chosenCategory = "general";
let randomArray = [];
let score = 0;
let questionNumber = 1;
let buttonClicked = false; // Variable to track button click state
const delay = 2000; // Delay in milliseconds

// Get questions and answers from API
async function getQuestion() {
    try {
        // Fetch questions from the API
        const response = await fetch(api_url[chosenCategory]);
        const data = await response.json();
        const { results } = data;
        generateRandomArray(); // Generate random array before displaying the question
        displayQuestion(results);

    } catch (error) {
        console.log(error);
    }
}

// Generate random number without duplicates to shuffle position of answer button
function generateRandomArray () {
    let n = [1, 2, 3, 4];
    let i = n.length;
    let j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        randomArray.push(n[j]);
        n.splice(j, 1);
    }
}

function displayQuestion (results) {
    const question = decodeURIComponent(results[0].question);
    const answer = decodeURIComponent(results[0].correct_answer);
    const incorrect1 = decodeURIComponent(results[0].incorrect_answers[0]);
    const incorrect2 = decodeURIComponent(results[0].incorrect_answers[1]);
    const incorrect3 = decodeURIComponent(results[0].incorrect_answers[2]);

    // Display question and answers on separate buttons for user input
    document.getElementById('question').textContent = question;
    document.getElementById(`answer${randomArray[0]}`).textContent = answer;
    document.getElementById(`answer${randomArray[1]}`).textContent = incorrect1;
    document.getElementById(`answer${randomArray[2]}`).textContent = incorrect2;
    document.getElementById(`answer${randomArray[3]}`).textContent = incorrect3;

    // User input for button click
    document.getElementById(`answer${randomArray[0]}`).addEventListener("click", correctAnswer);
    document.getElementById(`answer${randomArray[1]}`).addEventListener("click", () => incorrectAnswer(1));
    document.getElementById(`answer${randomArray[2]}`).addEventListener("click", () => incorrectAnswer(2));
    document.getElementById(`answer${randomArray[3]}`).addEventListener("click", () => incorrectAnswer(3));
}

function correctAnswer() {
    if (buttonClicked) return; // Prevent multiple clicks within the delay period
    buttonClicked = true; // Set button click state to true
    document.getElementById(`answer${randomArray[0]}`).innerHTML = "Correct";
    document.getElementById(`answer${randomArray[0]}`).className = 'btn btn-success btn-sm';
    // Increment the score
    score++;
    // Update the score display
    updateScore();
    setTimeout(() => {
        nextQuestion();
        buttonClicked = false; // Reset button click state after the delay
      }, delay);
}

function incorrectAnswer(index) {
    if (buttonClicked) return; // Prevent multiple clicks within the delay period
    buttonClicked = true; // Set button click state to true
    document.getElementById(`answer${randomArray[index]}`).innerHTML = "Incorrect";
    document.getElementById(`answer${randomArray[index]}`).className = 'btn btn-danger btn-sm';
    document.getElementById(`answer${randomArray[0]}`).className = 'btn btn-success btn-sm';
    setTimeout(() => {
        nextQuestion();
        buttonClicked = false; // Reset button click state after the delay
    }, delay);
}

// Function to update the score
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion() {
    // Clear the previous question and answer buttons
    document.getElementById('question').textContent = '';

    // Clear answer buttons' styles and text content
    for (let i = 0; i < randomArray.length; i++) {
      const answerButton = document.getElementById(`answer${randomArray[i]}`);
      answerButton.classList.remove('btn-success', 'btn-danger');
      answerButton.classList.add('btn-primary');
      answerButton.textContent = '';
    }
    questionNumber ++;
    const element = document.getElementById('questionNumber');
    element.textContent = `Question: ${questionNumber}`;

    if (questionNumber == 5) {
        const element = document.getElementById('answerButtons');
        element.remove();
        endOfGame();
        }
    else {
    getQuestion();
    }
}

function endOfGame() {
    const yesButton = document.createElement("button");
    const noButton = document.createElement("button");
    document.getElementById('question').innerHTML = "Game Over" + "!<br>You scored: " + score + " points.<br> Would you like to play again?";
    yesButton.classList.add("btn", "btn-success", "btn-sm");
    yesButton.textContent = "Yes";
    document.getElementById("container").appendChild(yesButton);
    noButton.classList.add("btn", "btn-danger", "btn-sm", "text-center");
    noButton.textContent = "No";
    document.getElementById("container").appendChild(noButton);
}

getQuestion();
