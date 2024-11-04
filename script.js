const maxAttempts = 5;
let attempts = {
  Horizontal1: maxAttempts,
  Vertical1: maxAttempts,
  Vertical2: maxAttempts,
  Horizontal2: maxAttempts,
};

// Define las palabras correctas
const correctWords = {
  Horizontal1: "FELIZ",
  Vertical1: "FORTE",
  Vertical2: "LESTE",
  Horizontal2: "ZONAL"
};

document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("input", (e) => {
    const nextCell = document.getElementById(`cell-${index + 1}`);
    if (e.target.value && nextCell) nextCell.focus();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") validateWords();
});

function validateWords() {
  ["Horizontal1", "Horizontal2", "Vertical1", "Vertical2"].forEach(validateWord);
}

function validateWord(word) {
  const cells = Array.from(document.querySelectorAll(`.cell[data-pos^="${word.charAt(0)}"]`));
  const guess = cells.map(cell => cell.value).join("");

  if (guess.length !== 5 || attempts[word] <= 0) return;

  if (guess === correctWords[word]) {
    cells.forEach(cell => {
      cell.style.backgroundColor = "lightorange";
      cell.style.color = "skyblue";
    });
  } else {
    attempts[word]--;
    updateAttemptsDisplay(word);
    cells.forEach((cell, i) => {
      if (correctWords[word][i] === guess[i]) {
        cell.style.backgroundColor = "skyblue";
      } else if (correctWords[word].includes(guess[i])) {
        cell.style.backgroundColor = "yellow";
      } else {
        cell.style.backgroundColor = "white";
      }
    });
  }

  if (attempts[word] <= 0) endGame();
}

function updateAttemptsDisplay(word) {
  document.getElementById(`attempts-${word}`).textContent = attempts[word];
}

function endGame() {
  document.querySelectorAll(".cell").forEach(cell => (cell.disabled = true));
  revealWords();
}

function revealWords() {
  Object.keys(correctWords).forEach(word => {
    const cells = Array.from(document.querySelectorAll(`.cell[data-pos^="${word.charAt(0)}"]`));
    cells.forEach((cell, i) => {
      cell.value = correctWords[word][i];
      cell.style.backgroundColor = "white";
      cell.style.color = "black";
    });
  });
}
