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
  cell.addEventListener("input", () => {
    cell.value = cell.value.toUpperCase();
  });
  cell.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      validateWords();
    }
  });
});

function validateWords() {
  ["Horizontal1", "Horizontal2", "Vertical1", "Vertical2"].forEach(wordType => {
    if (attempts[wordType] > 0) {
      const cells = getCells(wordType);
      const inputWord = cells.map(cell => cell.value).join("");

      if (inputWord === correctWords[wordType]) {
        cells.forEach(cell => cell.classList.add("correct-position", "full-correct"));
      } else {
        attempts[wordType]--;
        document.getElementById(`attempts-${wordType}`).textContent = attempts[wordType];

        cells.forEach((cell, index) => {
          const correctLetter = correctWords[wordType][index];

          if (cell.value === correctLetter) {
            cell.classList.add("correct-position");
          } else if (correctWords[wordType].includes(cell.value)) {
            cell.classList.add("wrong-position");
          } else {
            cell.classList.add("incorrect");
          }
        });

        if (attempts[wordType] === 0) {
          cells.forEach(cell => cell.disabled = true);
          checkGameOver();
        }
      }
    }
  });
}

function getCells(wordType) {
  return Array.from(document.querySelectorAll(`.cell[data-pos*="${wordType}"]`));
}

function checkGameOver() {
  const isGameOver = Object.values(attempts).every(attempt => attempt === 0);
  if (isGameOver) {
    document.getElementById("solution").classList.remove("hidden");
    revealSolution();
  }
}

function revealSolution() {
  ["Horizontal1", "Horizontal2", "Vertical1", "Vertical2"].forEach(wordType => {
    const cells = getCells(wordType);
    cells.forEach((cell, index) => {
      cell.value = correctWords[wordType][index];
      cell.classList.add("full-correct");
    });
  });
}
