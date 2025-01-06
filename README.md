# **Film & TV Trivia App**
## **Description**
This project is the final assignment for the JavaScript 1 course. The app is a web-based application that combines search functionality for movies, TV shows, and people with a fun trivia quiz. It utilizes [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to fetch data about movies and shows, and [Anime.js](https://animejs.com/) to create dynamic animations that enhance the user experience.


### **Features**
- **Search Functionality**: Search for movies, TV shows, or people in real time.
- **Top-Rated Movies**: View a list of the highest-rated movies.
- **Popular Movies**: Display the most popular movies currently trending.
- **Trivia Quiz**: Participate in a trivia game that tests your knowledge of popular TV shows.
- **Animations**: Smooth and elegant transitions powered by Anime.js.

---

## **Technologies**
- **JavaScript**: All logic and functionality are implemented using JavaScript.
- **TMDb API**: A powerful API used to fetch data about movies, TV shows, and people.
- **Anime.js**: Used to implement animations in the user interface.

---

## **TMDb API**
To run the application, you will need a valid API key from TMDb.

---

## **Project Structure**
### **Files and Their Purpose**
- **`index.html`**: The main file for the web application.
- **`css/style.css`**: Contains all the styling.
- **`js/main.js`**: The main file that manages user interactions and logic for various features.
- **`js/api.js`**: Handles all requests to the TMDb API.
- **`js/ui.js`**: Responsible for rendering UI components and managing error messages.
- **`js/quiz.js`**: Contains all the logic for the trivia quiz, including question generation and answer handling.
- **`lib/anime.es.js`**: Sourced from Anime.js to create dynamic animations.

---

## **How to Use the Project**
- **Top-Rated and Popular Movies**: Click the "Top-Rated Movies" or "Popular Movies" button to display a list of the top 10 movies from each category. The movies are displayed with their title, release date, and poster (if available).
  
- **Search Functionality**: Enter a keyword in the search field. Click "Search" to display the results. If no results are found, an error message will be displayed.
  
- **Trivia Quiz**: Click the "Start Quiz" button to start the trivia game. Guess the year a specific TV show was released by selecting from multiple choice options. The score is updated based on correct answers.