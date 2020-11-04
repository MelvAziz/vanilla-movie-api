const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const DOMSelectors = {
  grid: document.querySelector(".movie-grid"),
  searchForm: document.getElementById("search-form"),
  searchArea: document.getElementById("search-area"),
  btnNext: document.getElementById(".next-button"),
  btnPrevious: document.getElementById(".previous-button"),
};
 
const key = `35e313646de3f701b1a4722c35ccf9eb`;


//variable for page?
let pageNumber = 1;
//function for changing page?
const nextPage = function () {
  DOMSelectors.btnNext.addEventListener("click", function(e) {
    pageNumber++;
    init(pageNumber);
  });
};
const previousPage = function () {
  DOMSelectors.btnPrevious.addEventListener("click", function(e) {
    pageNumber--;
    init(pageNumber);
  });
};
//next.addEventListener
//update page variable
//rerun query()

const init = async function (pageNumber) {
  try {
    const query = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${pageNumber}&vote_count.gte=10000&vote_average.gte=8`;

    const response = await fetch(query);
    const data = await response.json();

    data.results.forEach((movie) => {
      let genreArr = [];
      const addGenre = function () {
        genres.forEach((element) => {
          if (movie.genre_ids.includes(element.id)) {
            genreArr.push(element.name);
            return genreArr;
          }
        });
      };
      addGenre();
      DOMSelectors.grid.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-card">
      <div class="movie-card-front">
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          alt=""
          class="poster"
        />
      </div>
      <div class="movie-card-back">
        <h3 class="movie-card-header">${movie.original_title}</h3>
        <div class="score-box">
          <p class="user-score">Community Score</p>
          <p class="user-score">${movie.vote_average}</p>
        </div>
        <div class="release-box">
          <p class="release-date">Released</p>
          <p class="release-date">${movie.release_date}</p>
        </div>
        <div class="movie-genres">
          <div>${genreArr}</div>
        </div>
      </div>
    </div>`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
init();