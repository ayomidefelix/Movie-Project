'use strict';

const hamburger = document.querySelector('.bars');
const navList = document.querySelector('.navlist');

const allSlides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const categoryBtn = document.getElementById('categoryBtn');
const categoryMenu = document.getElementById('categoryMenu');

const moviesCont = document.querySelector('.movie-card-1');
const seriesCont = document.querySelector('#series-container');

console.log(hamburger, navList);

function handleNavDisplay() {
  hamburger.classList.toggle('hamburgerIsActive');
  navList.classList.toggle('active');
}

hamburger.addEventListener('click', handleNavDisplay);

// window.addEventListener("click", function () {
//   if (hamburger.classList.contains("show")) {
//     hamburger.classList.remove("show");
//   }
// });

// show first slide
let currentSlide = 0;
let autoSlide;
// allSlides[currentSlide].style.opacity = 1;
showSlide(currentSlide);

// function to display a slide
function showSlide(index) {
  for (let i = 0; i < allSlides.length; i++) {
    allSlides[i].style.opacity = 0;
  }

  allSlides[index].style.opacity = 1;
}

// next slide
function moveSlide() {
  currentSlide++;

  if (currentSlide >= allSlides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

// previous slide
function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = allSlides.length - 1;
  }

  showSlide(currentSlide);
}

// auto slide
function startAutoSlide() {
  autoSlide = setInterval(moveSlide, 2000);
}

//stop auto sliding
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// button events
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  moveSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

startAutoSlide();

// Toggle the dropdown
categoryBtn.addEventListener('click', function (e) {
  categoryMenu.classList.toggle('show');
  e.stopPropagation();
});

window.addEventListener('click', function () {
  if (categoryMenu.classList.contains('show')) {
    categoryMenu.classList.remove('show');
  }
});

//Api key=5678909876

//Tmdb api key = fghjkjddfghjkfdfdghj

//http://www.omdbapi.com/?apikey=[yourkey]&

// async function getAllMovies() {
//   const response = await fetch("http://www.omdbapi.com/?apikey=85609fb4&i");
//   const data = await response.json();
//   console.log(data);
// }
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.ertyuiuhgfhjkjhgfhjkjhghhdtrdrytgujjfog09ew0rijvif9wfjdkfj iwoeurijff989efnu9fnvjef9fneuidhf9hhnfug98whebnwieuhg9wehnwv9nv03r9ir0oqdm',
  },
};

function displayAllMovies(movies) {
  const mapped = movies.map((movie) => {
    const baseUrl = 'https://tmdb.org/t/p/';
    const size = 'w500';
    const posterUrl = baseUrl + size + movie.poster_path;
    return `
   <div class="card-box" data-id=${movie.id}>
          <img src="${posterUrl}" />
          <h3>${movie.original_title}</h3>
           <p class="release-date">${movie.release_date}</p>
          <div class="release-badge">
            <span class="star">&#9733</span>
            <span class="score">${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
  `;
  });

  moviesCont.innerHTML = mapped.join('');
}
function displayAllSeries(movies) {
  const mapped = movies.map((movie) => {
    const baseUrl = 'https://tmdb.org/t/p/';
    const size = 'w500';
    const posterUrl = baseUrl + size + movie.poster_path;
    return `
   <div class="card-box" data-id=${movie.id}>
          <img src="${posterUrl}" />
          <h3>${movie.original_name}</h3>
           <p class="release-date">${movie.first_air_date}</p>
          <div class="release-badge">
            <span class="star">&#9733</span>
            <span class="score">${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
  `;
  });

  seriesCont.innerHTML = mapped.join('');
}

async function getAllMovies() {
  const res = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    options,
  );

  const data = await res.json();
  console.log(data);
  displayAllMovies(data.results);
}

getAllMovies();

async function getAllSeries() {
  const res = await fetch(
    'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    options,
  );

  const data = await res.json();
  console.log(data);
  displayAllSeries(data.results);
}

getAllSeries();

async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options,
  );

  const dataDetails = await res.json();

  return dataDetails;
}

moviesCont.addEventListener('click', async function (e) {
  console.log(e.target.parentElement);
  if (
    !e.target.classList.contains('card-box') &&
    !e.target.parentElement.classList.contains('card-box')
  )
    return;

  const movieId = e.target.dataset.id || e.target.parentElement.dataset.id;
  console.log(movieId);

  const movieDetail = await getMovieDetails(movieId);
  console.log(movieDetail);
});
