async function getRandomWord() {
  const res = await fetch("words.json");
  const words = await res.json();
  const index = Math.floor(Math.random() * words.length);
  return words[index].toUpperCase();
}

function startGame(secretWord) {
  const maxGuesses = 6;
  let currentGuess = 0;

  const board = document.getElementById("board");
  const input = document.getElementById("guess-input");
  const button = document.getElementById("submit-btn");
  const message = document.getElementById("message");

  // Adjust input length dynamically
  input.setAttribute("maxlength", secretWord.length);
  input.setAttribute("placeholder", `Enter ${secretWord.length} letters`);

  // Build empty board
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${secretWord.length}, 50px)`;
  for (let i = 0; i < maxGuesses * secretWord.length; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    board.appendChild(tile);
  }

  button.addEventListener("click", () => {
    const guess = input.value.toUpperCase();
    if (guess.length !== secretWord.length) {
      message.textContent = `Must be ${secretWord.length} letters!`;
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
}

// Kick off the game
getRandomWord().then(secretWord => {
  startGame(secretWord);
});
