import { createPokemonCard } from "./components/pokemon-card.js";
import { checkLoggedIn } from "./components/check-login.js";

// Fetch the Pokemon data from API endpoint to display on frontend
document.addEventListener("DOMContentLoaded", function () {
  
    axios
    .get("http://localhost/api/all-pokemon")
    .then(function (response) {
      const data = response.data;
      const pokemonList = document.querySelector(".row");

      console.log(response.data);
      data.forEach((pokemon) => {
        // Use import function from pokemon-card
        let card = createPokemonCard(pokemon);

        pokemonList.appendChild(card);

        checkLoggedIn();

      });
    })
    .catch(function (error) {
      console.log(error);
    });

    // User is not logged in, do something else
    const modal = document.getElementById("login-modal");
    modal.classList.add("show");
    modal.style.display = "block";
});

// Show login modal on page load
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("login-modal");
  modal.classList.add("show");
  modal.style.display = "block";
});

// =================================== Collect and send user data to API endpoint for backend consumption =================================== //

const form = document.querySelector("#login-register-form");
const loginButton = document.querySelector(".btn-login");
const registerButton = document.querySelector(".btn-register");
const overlay = document.querySelector("#overlay");

loginButton.addEventListener("click", function () {

  const emailRegex = /\S+@\S+\.\S+/;
  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");

  if (!emailRegex.test(emailInput.value)) {
    // Display an error message
    alert("Please enter a valid email address.");
    return;
  }

  if (passwordInput.value.length < 8) {
    // Display an error message
    alert("Password must be at least 8 characters long.");
    return;
  }

  const formData = new FormData(form);
  const data = JSON.stringify(Object.fromEntries(formData)); // convert FormData object to JSON string

  axios
    .post("http://localhost/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {

      // Remove overlay
      overlay.style.display = "none";

      // Close the modal
      const modal = document.querySelector('#login-modal');
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('style', 'display: none');

      // Save user's logged-in state to LocalStorage
      localStorage.setItem("isLoggedIn", true);

      console.log(response + "AWEEEEEEEEEEEEEEEE!");
    })
    .catch(function (error) {
      console.log(error + "Agh naai, no work");
    });
});

registerButton.addEventListener("click", function () {
  const emailInput = document.querySelector("#email");
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordInput = document.querySelector("#password");

  if (!emailRegex.test(emailInput.value)) {
    // Display an error message
    alert("Please enter a valid email address.");
    return;
  }

  if (passwordInput.value.length < 8) {
    // Display an error message
    alert("Password must be at least 8 characters long.");
    return;
  }
  const formData = new FormData(form);
  const data = JSON.stringify(Object.fromEntries(formData)); // convert FormData object to JSON string

  axios
    .post("http://localhost/api/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      // Remove overlay
      overlay.style.display = "none";

      // Close the modal
      const modal = document.querySelector('#login-modal');
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('style', 'display: none');

      // Save user's logged-in state to LocalStorage
      localStorage.setItem("isLoggedIn", true);

      console.log(response + "AWEEEEEEEEEEEEEEEE!");
    })
    .catch(function (error) {
      console.log(error + "Agh naai, no work");
    });
});
