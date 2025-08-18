const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");
const searchBox = document.getElementById("searchBox");

// Load recipes from localStorage
document.addEventListener("DOMContentLoaded", displayRecipes);

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("recipeName").value;
  const details = document.getElementById("recipeDetails").value;

  const recipe = { id: Date.now(), name, details };

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));

  recipeForm.reset();
  displayRecipes();
});

function displayRecipes() {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipeList.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.details}</p>
      <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">❌ Delete</button>
    `;

    recipeList.appendChild(card);
  });
}

function deleteRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes = recipes.filter((r) => r.id !== id);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  displayRecipes();
}

// Search functionality
searchBox.addEventListener("keyup", () => {
  const query = searchBox.value.toLowerCase();
  document.querySelectorAll(".recipe-card").forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});
