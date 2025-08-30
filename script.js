const secretWord = "APPLE"; // You can swap this daily or randomize from a list
const maxGuesses = 6;
let currentGuess = 0;

const board = document.getElementById("board");
const input = document.getElementById("guess-input");
const button = document.getElementById("submit-btn");
const message = document.getElementById("message");

// Build empty board
for (let i = 0; i < maxGuesses * secretWord.length; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  board.appendChild(tile);
}

button.addEventListener("click", () => {
  const guess = input.value.toUpperCase();
  if (guess.length !== secretWord.length) {
    message.textContent = "Must be 5 letters!";
    return;
  }

  const rowStart = currentGuess * secretWord.length;
  for (let i = 0; i < secretWord.length; i++) {
    const tile = board.children[rowStart + i];
    tile.textContent = guess[i];

    if (guess[i] === secretWord[i]) {
      tile.classList.add("correct");
    } else if (secretWord.includes(guess[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }

  if (guess === secretWord) {
    message.textContent = "🎉 You got it!";
    button.disabled = true;
    input.disabled = true;
    return;
  }

  currentGuess++;
  input.value = "";

  if (currentGuess === maxGuesses) {
    message.textContent = `Out of guesses! The word was ${secretWord}.`;
    button.disabled = true;
    input.disabled = true;
  }
});
