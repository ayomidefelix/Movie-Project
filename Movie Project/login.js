const mainPage = document.getElementById("main-login-page");
const returningPage = document.getElementById("returning-user-page");
const mainForm = document.getElementById("main-form");
const resetLink = document.getElementById("reset-session");

// Function to handle showing the correct page
function init() {
  const isReturning = localStorage.getItem("isReturningUser");

  if (isReturning === "true") {
    mainPage.classList.add("hidden");
    returningPage.classList.remove("hidden");
  } else {
    mainPage.classList.remove("hidden");
    returningPage.classList.add("hidden");
  }
}

// Event: First time login form
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Save state and refresh
  localStorage.setItem("isReturningUser", "true");
  window.location.reload();
});

// Event: Reset (to go back to being a "new" user)
resetLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("isReturningUser");
  window.location.reload();
});

// Run on load
init();



//Event After login
