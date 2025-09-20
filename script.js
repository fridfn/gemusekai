function handleOpenGame (data) {
  const linkUrl = data.getAttribute("data-url")
  window.open(linkUrl, "_blank")
}

// Toggle search input on icon click
const searchIcon = document.querySelector(".icon");
const searchInput = document.querySelector("nav input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus();
  } else {
    searchInput.value = "";
    filterGames(""); // reset
  }
});

// Filter games on typing
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  filterGames(value);
});

function filterGames(value) {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach(card => {
    const title = card.querySelector("p").textContent.toLowerCase();
    if (title.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}