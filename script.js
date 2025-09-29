const templateGames = document.querySelector(".template-cards-game")
const gamesContainer = document.querySelector(".game-grid")

const listGames = [
  {
   name: "Snake",
   link: "play/snake/preview/index.html",
   image: "assets/snake.png"
  },
  {
   name: "Tic Tac Toe",
   link: "play/tictactoe/preview/index.html",
   image: "assets/tictactoe.png"
  },
  {
   name: "Paper Rock Scissors",
   link: "play/roshambo/preview/index.html",
   image: "assets/paperrockscissors.png"
  },
  {
   name: "Ping Pong",
   link: "play/pingpong/preview/index.html",
   image: "assets/pingpong.png"
  },
  // tambahin data game seperti penulisan diatas
]

function handleListGames() {
  listGames.forEach((items, index) => {
    const cloneGames = templateGames.content.cloneNode(true)
    const img = cloneGames.querySelector(".game-img")
    const name = cloneGames.querySelector(".game-name")
    const gameItems = cloneGames.querySelector(".game-card")
    
     img.alt = items.name
     name.textContent = items.name
     img.src = items.image
     gameItems.setAttribute("data-aos-delay", index * 200)
     gameItems.addEventListener("click", () => {
       window.location.href = items.link
     })

     
     gamesContainer.appendChild(cloneGames)
  })
}

// PANGGIL FUNGSI INI BUAT BIKIN LIST GAME YANG BANYAK
handleListGames()
handleListGames()

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
