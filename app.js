const API_KEY = "a7b907983145155ab6c110db5472a85b";
const API_URL = "https://api.themoviedb.org/3";

const requests = {
    fetchTrending: `${API_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${API_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    // more request URLs
};

async function getMovies(url, containerSelector) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movieContainer = document.querySelector(containerSelector);

        data.results.forEach(movie => {
            const poster = document.createElement("img");
            poster.classList.add("movie-poster");
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.src = imageUrl;
            poster.alt = movie.title || movie.name;
            movieContainer.appendChild(poster);
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getMovies(requests.fetchTrending, ".movie-row .movie-posters");
    // call other getMovies functions for other rows
});