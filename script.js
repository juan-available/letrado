// Cargar palabras correctas
let correctWords = {};
fetch("words.json")
  .then(response => response.json())
  .then(data => {
    correctWords = data;
  })
  .catch(error => console.error("Error al cargar las palabras correctas:", error));

const attempts = {
  Horizontal1: 5,
  Horizontal2: 5,
  Vertical1: 5,
  Vertical2: 5
};

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      validateWords();
    }
  });
});

function validateWords() {
  let gameOver = false;

  document.querySelectorAll(".cell").forEach(cell => {
    const [row, col] = cell.dataset.pos.split('-').map(Number);
    let correctLetter, wordType;

    if (row === 0) {
      correctLetter = correctWords.Horizontal1[col];
      wordType = "Horizontal1";
    } else if (row === 4) {
      correctLetter = correctWords.Horizontal2[col];
      wordType = "Horizontal2";
    } else if (col === 0) {
      correctLetter = correctWords.Vertical1[row];
      wordType = "Vertical1";
    } else if (col === 4) {
      correctLetter = correctWords.Vertical2[row];
      wordType = "Vertical2";
    }

    if (cell.value.toUpperCase() !== correctLetter) {
      attempts[wordType] -= 1;
      document.getElementById(`attempts-${wordType}`).textContent = attempts[wordType];

      if (attempts[wordType] <= 0) {
        gameOver = true;
        cell.classList.add("incorrect");
        cell.disabled = true;
      }
    } else {
      cell.classList.add("correct");
    }
  });

  if (gameOver) {
    document.getElementById("solution").classList.remove("hidden");
    document.querySelectorAll(".cell").forEach(cell => cell.disabled = true);
  }
}
