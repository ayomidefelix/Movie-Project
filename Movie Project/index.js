"use strict";

const hamburger = document.querySelector(".bars");
const navList = document.querySelector(".navlist");


const allSlides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");


const categoryBtn = document.getElementById("categoryBtn");
const categoryMenu = document.getElementById("categoryMenu");




console.log(hamburger, navList);

function handleNavDisplay() {
  hamburger.classList.toggle("hamburgerIsActive");
  navList.classList.toggle("active");
}

hamburger.addEventListener("click", handleNavDisplay);

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
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  moveSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

startAutoSlide();


// Toggle the dropdown
categoryBtn.addEventListener("click", function (e) {
  categoryMenu.classList.toggle("show");
  e.stopPropagation();
});

window.addEventListener("click", function () {
  if (categoryMenu.classList.contains("show")) {
    categoryMenu.classList.remove("show");
  }
});
