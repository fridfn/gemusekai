let boxes = document.querySelectorAll(".box")

/// selecting restart button
const restart = document.getElementById("restart")

let turn = true /// for player x and PlayerO

/// array for the possibility of the winner
const winnerpattern = [
  // (Baris)
  [0, 1, 2], [1, 2, 3],
  [4, 5, 6], [5, 6, 7],
  [8, 9, 10], [9, 10, 11],

  // kebawah (Kolom)
  [0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11],

  // (Miring ke kanan)
  [0, 5, 10], [1, 6, 11],

  // (Miring ke kiri)
  [2, 5, 8], [3, 6, 9]
];

  
  boxes.forEach((box)=> {
    box.addEventListener("click", ()=>{
  if (turn) {
      box.innerText = "X"
      box.style.backgroundColor= "#9333ea"
      turn = false
  }else {
      box.innerText = "O"
      box.style.backgroundColor= "#f472b6"
      turn = true
  }
   box.disabled = true;
   checkWinner();
    });
    
  });
  const checkWinner = () => {
   for (let pattern of winnerpattern) {
       let posval1 = boxes[pattern[0]].innerText;
       let posval2 = boxes[pattern[1]].innerText;
       let posval3 = boxes[pattern[2]].innerText;
  
   if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
      if (posval1 === posval2 && posval2 === posval3 ){
      document.getElementById("msg").innerHTML = `congratulation <span style="color;red;">${posval1}</span> Player Wins`;
  // Disable all boxes
  boxes.forEach((box) => {
    box.disabled = true;
    if (box.innerHTML === ""){
        box.style.backgroundColor = "#0f1724"
    }
 });
  
   return
 }
}
  }
}

// resting game
restart.addEventListener("click", () => {
  // Clear the inner text of all boxes
  boxes.forEach((box) => {
    box.innerText = ""; // Clear box content
    box.disabled = false; // Enable the box
    box.style.backgroundColor = "#3b82f6"
  });
  
  // Restart turn to Player X 
  turn = true;
  
  // Clear the winner message
  document.getElementById("msg").innerHTML = "Let's Play the Game"
});