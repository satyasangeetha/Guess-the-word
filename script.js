const words = [
  { word: "javascript", hint: "Programming language" },
  { word: "puzzle", hint: "Brain challenge" },
  { word: "hangman", hint: "This game itself" },
  { word: "student", hint: "You are one!" },
  { word: "frontend", hint: "HTML, CSS, JS" }
];

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 6;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const restartBtn = document.getElementById("restart");

// 🎵 Simple embedded sounds (Base64 tiny beeps)
const correctSound = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQgAAAAA");
const wrongSound   = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YZgAAAAA");
const victorySound = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YbQAAAAA");

function startGame() {
  const random = words[Math.floor(Math.random() * words.length)];
  chosenWord = random.word;
  hint.textContent = "💡 Hint: " + random.hint;

  guessedLetters = [];
  wrongGuesses = 0;
  message.textContent = "";

  displayWord();
  createKeyboard();
}

function displayWord() {
  wordDisplay.textContent = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function createKeyboard() {
  keyboard.innerHTML = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  letters.split("").forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.classList.add("letter");
    btn.addEventListener("click", () => guessLetter(letter, btn));
    keyboard.appendChild(btn);
  });
}

function guessLetter(letter, button) {
  button.disabled = true;

  if (chosenWord.includes(letter)) {
    guessedLetters.push(letter);
    correctSound.play(); // ✅ correct
    displayWord();
    checkWin();
  } else {
    wrongGuesses++;
    wrongSound.play(); // ❌ wrong
    if (wrongGuesses >= maxGuesses) {
      message.textContent = "😢 You lost! The word was: " + chosenWord;
      disableAllButtons();
    }
  }
}

function checkWin() {
  const currentWord = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join("");
  if (currentWord === chosenWord) {
    message.textContent = "🎉 You guessed it!";
    victorySound.play(); // 🏆 victory
    disableAllButtons();
  }
}

function disableAllButtons() {
  document.querySelectorAll(".letter").forEach(btn => btn.disabled = true);
}

restartBtn.addEventListener("click", startGame);

startGame();
