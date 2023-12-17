const BASE_URL = "https://webdev.alphacamp.io";
const API_URL = `${BASE_URL}/api/movies`;
const POSTER_URL = `${BASE_URL}/posters`;
const movies = [];

const dataPanel = document.querySelector("#data-panel");

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
          <button class="btn btn-info btn-add-favorite">+</button>
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

// 監聽 data panel
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal((id = event.target.dataset.id));
  }
});

axios
  .get(API_URL)
  .then((response) => {
    let results = response.data.results;
    movies.push(...results);
    movies.forEach((movie) => {
      renderMovie(movie);
    });
  })
  .catch((error) => {
    console.log(error);
  });
