const BASE_URL = "https://webdev.alphacamp.io";
const API_URL = `${BASE_URL}/api/movies`;
const POSTER_URL = `${BASE_URL}/posters`;
const MOVIES_PER_PAGE = 12;
const movies = [];
let currentMovies = [];
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#serach-input");
const paginator = document.querySelector("#paginator");

function getMoviesByPage(movies, page) {
  const start = MOVIES_PER_PAGE * (page - 1);
  return movies.slice(start, start + MOVIES_PER_PAGE);
}

function renderMovies(movies) {
  dataPanel.innerHTML = "";
  movies.forEach(renderMovie);
}

function renderMovie(data) {
  let src = `${POSTER_URL}/${data.image}`;
  let div = document.createElement("div");
  div.classList.add("col-sm-3");
  div.innerHTML = `<div class="mb-2">
      <div class="card">
        <img src="${src}" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${data.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${data.id}">+</button>
        </div>
      </div>
    </div>`;
  dataPanel.appendChild(div);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");
  axios.get(`${API_URL}/${id}`).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${POSTER_URL}/${data.image}" alt="movie-poster" class="img-fluid">`;
  });
}

function addToFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorite-movies")) ?? [];
  console.log(`favorites: ${favorites}`);
  const movie = movies.find((m) => m.id === id);
  if (!favorites.some((m) => m.id === id)) {
    favorites.push(movie);
    localStorage.setItem("favorite-movies", JSON.stringify(favorites));
  }
}

function setPaginator(amount) {
  let len = Math.ceil(amount / MOVIES_PER_PAGE);
  let pages = "";
  for (let i = 1; i <= len; i++) {
    pages += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  paginator.innerHTML = pages;
}

function init() {
  // 監聽 data panel
  dataPanel.addEventListener("click", function onPanelClicked(event) {
    if (event.target.matches(".btn-show-movie")) {
      showMovieModal((id = Number(event.target.dataset.id)));
    } else if (event.target.matches(".btn-add-favorite")) {
      addToFavorite(Number(event.target.dataset.id));
    }
  });

  searchForm.addEventListener("submit", function onSearch(event) {
    // 避免表單提交後的預設行為(重整頁面)
    event.preventDefault();
    let input = searchInput.value.trim().toLowerCase();
    currentMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(input);
    });

    currentMovies = currentMovies.length === 0 ? movies : currentMovies;
    setPaginator(currentMovies.length);
    renderMovies(getMoviesByPage(currentMovies, 1));
  });

  paginator.addEventListener("click", function onPageSelected(event) {
    event.preventDefault();
    let target = event.target;

    if (target.matches(".page-item")) {
      let a = target.children[0];
      let page = Number(a.innerHTML);
      renderMovies(getMoviesByPage(currentMovies, page));
    } else if (target.matches(".page-link")) {
      let page = Number(target.innerHTML);
      renderMovies(getMoviesByPage(currentMovies, page));
    }
  });

  axios
    .get(API_URL)
    .then((response) => {
      let results = response.data.results;
      movies.push(...results);
      currentMovies = movies;
      setPaginator(movies.length);
      renderMovies(getMoviesByPage(movies, 1));
    })
    .catch((error) => {
      console.log(error);
    });
}

init();
