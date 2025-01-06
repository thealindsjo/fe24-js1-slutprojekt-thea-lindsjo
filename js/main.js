/**
 * Handles user interactions, initiates API calls, and updates the UI.
 * 
 * The functionality in this file includes fetching top-rated or popular movies,
 * handling the search form, and animating the display of content. Buttons for 
 * starting, restarting, or hiding the quiz are also managed here.
 */
import { fetchTopRatedMovies, fetchPopularMovies, search } from './api.js';
import { displayMovies, displaySearchResults, displayError, clearError } from './ui.js';
import anime from '../lib/anime.es.js';
import { startTriviaQuiz, restartQuiz, hideQuiz } from './quiz.js';

document.getElementById('top-rated-btn').addEventListener('click', async () => {
    clearError();
    try {
        const data = await fetchTopRatedMovies();
        displayMovies(data.results.slice(0, 10)); // Display the top 10 movies
        animateMovies(); // Use anime.js to animate the movies
    } catch (error) {
        displayError('Something went wrong while fetching top-rated movies.');
    }
});

document.getElementById('popular-btn').addEventListener('click', async () => {
    clearError();
    try {
        const data = await fetchPopularMovies();
        displayMovies(data.results.slice(0, 10));
        animateMovies();
    } catch (error) {
        displayError('Something went wrong while fetching popular movies.');
    }
});

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Search form submitted');

    // Get the search query and selected search type
    const query = document.getElementById('search-input').value.trim();
    const searchType = document.querySelector('input[name="search-type"]:checked')?.value;

    if (!query) {
        return displayError('Please enter a search term.');
    }

    clearError();
    try {
        // Perform the search using the API
        const data = await search(query);
        console.log('API response:', data);

        if (data.results.length === 0) { // If no results are found
            content.innerHTML = '';
            displayError('No results found.');
        } else {
            displaySearchResults(data.results);
            animateMovies();
        }
    } catch (error) {
        console.error('Error during search:', error);
        displayError('Something went wrong during the search.');
    }
});

// Animates the movies using anime.js
function animateMovies() {
    anime({
        targets: '#content div',
        opacity: [0, 1],
        translateY: [-50, 0],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutQuad'
    });
}

// Buttons to handle the trivia quiz
document.getElementById('quiz-button').addEventListener('click', startTriviaQuiz);
document.getElementById('restart-button').addEventListener('click', restartQuiz);
document.getElementById('hide-button').addEventListener('click', hideQuiz);
