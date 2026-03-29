const API_KEY = "842fc92ce46a5310e3f63ddae0033fc6";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");

// Fetch movies
async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      moviesContainer.innerHTML = "<p>No results found</p>";
      return;
    }

    showMovies(data.results);
  } catch (err) {
    moviesContainer.innerHTML = "<p>Error loading movies</p>";
    console.error(err);
  }
}

// Display movies
function showMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>⭐ ${movie.vote_average}</span>
      </div>
    `;

    moviesContainer.appendChild(div);
  });
}

// Load trending
getMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

// Search
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();

    if (query) {
      getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    }
  }
});