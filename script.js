let correctWords = {};
let validWords = [];

fetch("words.json")
  .then(response => response.json())
  .then(data => {
    correctWords = data;
  })
  .catch(error => console.error("Error al cargar las palabras correctas:", error));

fetch("dictionary.json")
  .then(response => response.json())
  .then(data => {
    validWords = data.words;
  })
  .catch(error => console.error("Error al cargar el diccionario:", error));

const attempts = {
  Horizontal1: 5,
  Horizontal2: 5,
  Vertical1: 5,
  Vertical2: 5
};

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("input", () => {
    cell.value = cell.value.toUpperCase();
    if (cell.nextElementSibling && cell.value) {
      cell.nextElementSibling.focus();
    }
  });
  cell.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      validateWords();
    }
  });
});

function validateWords() {
  ["Horizontal1", "Horizontal2", "Vertical1", "Vertical2"].forEach(wordType => {
    const cells = getCells(wordType);
    const inputWord = cells.map(cell => cell.value).join("");

    if (inputWord.length < 5) return;

    if (!validWords.includes(inputWord)) {
      document.getElementById("alert").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("alert").classList.add("hidden");
      }, 2000);
      return;
    }

    if (attempts[wordType] > 0) {
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
