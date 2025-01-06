/**
 * Handles the logic for the trivia quiz, including scoring, questions, and answers.
 * 
 * Contains functions to start the quiz, display questions, handle answers, and 
 * restart the quiz. Question data is fetched from the TMDb API and presented 
 * as multiple-choice questions.
 */
import { fetchPopularTVShows } from './api.js';
import { displayError } from './ui.js';

let currentQuestionIndex = 0;
let score = 0;
let triviaData = [];

export async function startTriviaQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.classList.remove('hidden');
    
    try {
        const data = await fetchPopularTVShows();
        triviaData = data.results.slice(0, 10); // Limit to the first 10 TV shows
        displayNextQuestion();
    } catch (error) {
        displayError('Something went wrong while fetching TV shows.');
    }
}

function displayNextQuestion() {
    if (currentQuestionIndex >= triviaData.length) { // If all questions have been answered
        document.getElementById('question').textContent = "The quiz is over!";
        document.getElementById('answer-buttons').innerHTML = ''; // Clear the buttons
        return;
    }

    const series = triviaData[currentQuestionIndex];
    const firstAirDate = new Date(series.first_air_date); // Get the year of the first episode
    const correctAnswer = firstAirDate.getFullYear();

    document.getElementById('question').textContent = `When was the first episode of ${series.name} released?`;

    const answers = generateAnswerOptions(correctAnswer);

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    // Create buttons for the answers
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => handleAnswerClick(answer, correctAnswer));
        answerButtons.appendChild(button);
    });
}

function generateAnswerOptions(correctAnswer) {
    const answers = [correctAnswer];
    
    while (answers.length < 4) { // Ensure 4 options
        const randomYear = Math.floor(Math.random() * (2020 - 1950 + 1)) + 1950;
        if (!answers.includes(randomYear)) {
            answers.push(randomYear);
        }
    }

    return answers.sort(() => Math.random() - 0.5); // Randomize the order of answers
}

function handleAnswerClick(selectedAnswer, correctAnswer) {
    if (parseInt(selectedAnswer) === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    displayNextQuestion();
    document.getElementById('score').textContent = score;
}

export function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    displayNextQuestion();
}

export function hideQuiz() {
    document.getElementById('quiz-container').classList.add('hidden');
}
