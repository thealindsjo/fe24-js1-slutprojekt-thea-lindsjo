/**
 * Responsible for updating and manipulating the user interface.
 * 
 * Functions in this file are used to display movies, search results, and error messages 
 * on the page. Additionally, animations and clearing previously displayed content are handled here.
 */
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export function displayMovies(movies) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear content before adding new movies

    movies.forEach(movie => {
        content.innerHTML += `
            <div class="movie-card">
                <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : ''}" alt="${movie.title}" class="${movie.poster_path ? '' : 'no-image'}">
                ${!movie.poster_path ? '<i class="fas fa-image placeholder-icon"></i>' : ''}
                <h3>${movie.title}</h3>
                <p>Release: ${movie.release_date}</p>
            </div>
        `;
    });
}

export function displaySearchResults(results) {
    console.log('Displaying search results:', results);
    const content = document.getElementById('content');
    content.innerHTML = '';

    if (results.length === 0) { // If no results are found
        content.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        console.log('Item data:', item);

        const card = document.createElement('div');
        card.classList.add('movie-card');

        // Display movie information
        if (item.media_type === 'movie') {
            if (!item.poster_path && !item.title) { // If movie data is empty
                console.log('Empty movie data:', item);
                return;
            }

            const img = document.createElement('img');
            img.src = item.poster_path ? IMAGE_URL + item.poster_path : '';
            img.alt = item.title || 'Unknown film';
            if (!item.poster_path) {
                img.classList.add('no-image');
            }

            const icon = !item.poster_path ? document.createElement('i') : null;
            if (icon) {
                icon.classList.add('fas', 'fa-image', 'placeholder-icon');
            }

            const title = document.createElement('h3');
            title.textContent = item.title || 'Unknown title';

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release date: ${item.release_date || 'Unknown date'}`;

            const overview = document.createElement('p');
            overview.textContent = item.overview || 'No description available';

            card.appendChild(img);
            if (icon) card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(releaseDate);
            card.appendChild(overview);

        // Display person information
        } else if (item.media_type === 'person') {
            if (!item.profile_path && !item.name) { // If person data is empty
                console.log('Empty person data:', item);
                return;
            }

            const img = document.createElement('img');
            img.src = item.profile_path ? IMAGE_URL + item.profile_path : '';
            img.alt = item.name || 'Unknown person';
            if (!item.profile_path) {
                img.classList.add('no-image');
            }

            const icon = !item.profile_path ? document.createElement('i') : null;
            if (icon) {
                icon.classList.add('fas', 'fa-user', 'placeholder-icon');
            }

            const name = document.createElement('h3');
            name.textContent = item.name || 'Unknown name';

            const knownFor = document.createElement('p');
            knownFor.textContent = `Known for: ${item.known_for_department || 'Unknown department'}`;

            const ul = document.createElement('ul');
            if (item.known_for && item.known_for.length > 0) {
                item.known_for.forEach(media => {
                    const li = document.createElement('li');
                    li.textContent = `${media.media_type === 'movie' ? 'Movie' : 'TV'}: ${media.title || media.name}`;
                    ul.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'No movies or TV shows available';
                ul.appendChild(li);
            }

            card.appendChild(img);
            if (icon) card.appendChild(icon);
            card.appendChild(name);
            card.appendChild(knownFor);
            card.appendChild(ul);
        }

        if (card.children.length > 0) {
            content.appendChild(card);
        }
    });
}

export function displayError(message) {
    const errorSection = document.getElementById('error-message');
    errorSection.textContent = message;
    errorSection.classList.remove('hidden');
}

export function clearError() {
    const errorSection = document.getElementById('error-message');
    errorSection.classList.add('hidden');
}
