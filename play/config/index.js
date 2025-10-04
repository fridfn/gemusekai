const templateGames = document.querySelector("#games-items")
const gamesContainer = document.querySelector("#games-container")

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
  {
   name: "Brick Breaker",
   link: "play/brickbreaker/preview/index.html",
   image: "assets/brickbreaker.png"
  },
  {
   name: "Word Scramble",
   link: "play/wordscramble/preview/index.html",
   image: "assets/wordscramble.png"
  },
  // tambahin data game seperti penulisan diatas
]

function toggleSearch() {
  const searchBar = document.querySelector('.search-bar');
  searchBar.classList.toggle('hidden');
}

function filterGames() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.game').forEach(game => {
    const name = game.getAttribute('data-name');
    game.style.display = name.includes(query) ? 'block' : 'none';
  });
}

function handleListGames() {
  listGames.forEach((items, index) => {
    const cloneGames = templateGames.content.cloneNode(true)
    const img = cloneGames.querySelector(".game-img")
    const name = cloneGames.querySelector(".game-name")
    const gameItems = cloneGames.querySelector(".items-games")
     
     img.alt = items.name
     name.textContent = items.name
     img.src = "../../../" + items.image
     gameItems.setAttribute("data-aos-delay", index * 200)
     gameItems.addEventListener("click", () => {
       window.location.href = "../../../" + items.link
     })

     
     gamesContainer.appendChild(cloneGames)
  })
}

function toggleSearch() {
  document.querySelector(".search-bar").classList.toggle("hidden");
}

function filterGames() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const games = document.querySelectorAll(".items-games");

  games.forEach(game => {
    const name = game.querySelector(".game-name").textContent.toLowerCase();
    if (name.includes(input)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  });
}

handleListGames()
handleListGames()
handleListGames()
handleListGames()
handleListGames()
handleListGames()