const DOMSelectors = {
    grid: document.querySelector(".movie-grid"),
};

const genreId = [
  {
      genreID: 28,
      genreName: "Action",
  },
  {
      genreID: 16,
      genreName: "Animated",
  },
  {
      genreID: 99,
      genreName: "Documentary",
  },
  {
      genreID: 18,
      genreName: "Drama",
  },
  {
      genreID: 10751,
      genreName: "Family",
  },
  {
      genreID: 14,
      genreName: "Fantasy",
  },
  {
      genreID: 36,
      genreName: "History",
  },
  {
      genreID: 35,
      genreName: "Comedy",
  },
  {
      genreID: 10752,
      genreName: "War",
  },
  {
      genreID: 80,
      genreName: "Crime",
  },
  {
      genreID: 10402,
      genreName: "Music",
  },
  {
      genreID: 9648,
      genreName: "Mystery",
  },
  {
      genreID: 878,
      genreName: "Sci-fi",
  },
  {
      genreID: 27,
      genreName: "Horror",
  },
  {
      genreID: 10770,
      genreName: "TV Movie",
  },
  {
      genreID: 53,
      genreName: "Thriller",
  },
  {
      genreID: 37,
      genreName: "Western",
  },
  {
      genreID: 12,
      genreName: "Adventure",
  }
];

const key = "35e313646de3f701b1a4722c35ccf9eb";
const call = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=vote_average.asc&vote_count.gte=10000&vote_average.gte=8.1&include_adult=false&include_video=false&page=1`;



const query = async function () {
    try {
        const response = await fetch(call);
        const data = await response.json();
        var genre = [];
        data.results.forEach((movie) => {
            DOMSelectors.grid.insertAdjacentHTML("beforeend", `  <div class="movie-card">
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
                <div>${genre}</div>
              </div>
            </div>
          </div> `)
        })
    } catch (error) {
        console.log(error);
    }
}
const genre = async function () {
var Genre = [];
var movie;
const response = await fetch(call);
const Data = await response.json();
Data.results.forEach((movie) => {
  genreId.forEach((data) => {
    if (movie.genre_ids == data.genreId[0]) {
      genre.push(data.genreId[1]);
      console.log(genre);
    } 
  })
})

}
genre();
query();