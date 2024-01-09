const options = key;

const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let moviesData = []; // 영화 정보를 저장할 변수 추가

const createMovieCard = (movie) => {
  const { id, title, overview, poster_path, vote_average } = movie;

  const card = document.createElement("div");
  const image = document.createElement("img");
  const titleElement = document.createElement("h2");
  const overviewElement = document.createElement("p");
  const voteAverageElement = document.createElement("p");

  card.setAttribute("id", id);
  card.className = "movie-card";
  image.className = "poster-image";
  titleElement.className = "title";
  overviewElement.className = "overview";
  voteAverageElement.className = "vote_average";

  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAverageElement.textContent = `Vote Average: ${vote_average}`;

  card.appendChild(image);
  card.appendChild(titleElement);
  card.appendChild(overviewElement);
  card.appendChild(voteAverageElement);

  return card;
};

const renderMovies = (movies) => {
  moviesContainer.innerHTML = ""; // 이전 영화 카드 삭제

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
    movieCard.addEventListener("click", () => {
      const movieId = movieCard.getAttribute("id");
      alert(`이 영화의 ID는 ${movieId}입니다`);
    });
  });
};

const searchMovies = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = moviesData.filter((search) =>
    search.title.toLowerCase().includes(searchTerm)
  );
  renderMovies(filteredMovies);
};

fetch(
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    moviesData = data.results; // 영화 정보를 변수에 저장
    renderMovies(moviesData); // 영화 정보를 받아와서 renderMovies 함수 호출
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

searchButton.addEventListener("click", searchMovies);

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
