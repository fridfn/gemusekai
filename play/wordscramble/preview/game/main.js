
const words = [
 { word: "expansion", hint: "The process of increase or grow" },
 { word: "javascript", hint: "Programming language for the web" },
 { word: "computer", hint: "An electronic device for processing data" },
 { word: "internet", hint: "A global network of computers" },
 { word: "keyboard", hint: "Device used for typing" },
 { word: "laptop", hint: "A small electronic computer that can be carried around" },
 { word: "phone", hint: "A device used to make calls and send messages" },
 { word: "mouse", hint: "A device used to move the cursor on a screen" },
 { word: "television", hint: "A device that receives broadcast signals for TV" },
 { word: "printer", hint: "A device used to produce paper copies" },
 { word: "tablet", hint: "A flat touchscreen device" },
 { word: "camera", hint: "A device used to take pictures" },
 { word: "router", hint: "A device that connects devices to the internet" },
];

let correctWord, timer;
const scrambleWord = document.getElementById("scrambleWord");
const hintText = document.getElementById("hintText");
const timerText = document.getElementById("timer");
const userInput = document.getElementById("userInput");
const message = document.getElementById("message");

function initGame() {
 clearInterval(timer);
 startTimer(30);
 let randomObj = words[Math.floor(Math.random() * words.length)];
 let wordArray = randomObj.word.split("");
 for (let i = wordArray.length - 1; i > 0; i--) {
   let j = Math.floor(Math.random() * (i + 1));
   [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
 }
 
 scrambleWord.innerText = wordArray.join(" ");
 hintText.innerText = "Hint: " + randomObj.hint;
 correctWord = randomObj.word.toLowerCase();
 userInput.value = "";
 message.innerText = "";
}

function startTimer(maxTime) {
 timer = setInterval(() => {
   if (maxTime > 0) {
     maxTime--;
     timerText.innerText = `Time Left: ${maxTime}s`
   } else {
     clearInterval(timer);
     message.style.color = "red";
     message.innerText = `Time up! Correct word: ${correctWord}`;
   }
 }, 1000);
}

function checkWord() {
 let userWord = userInput.value.toLowerCase();
 if (!userWord) {
   message.style.color = "red";
   message.innerText = "Please enter a word!";
   return;
 }
 if (userWord === correctWord) {
   message.style.color = "green";
   message.innerText = "✓ Correct! Well done!";
 } else {
   message.style.color = "red";
   message.innerText = "❌ Incorrect! Try again.";
 }
}

window.onload = initGame();