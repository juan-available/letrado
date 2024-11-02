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
  cell.addEventListener("input", event => {
    cell.value = cell.value.toUpperCase();
    moveToNext(cell);
  });
  cell.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      validateWords();
    }
  });
});

function moveToNext(cell) {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const index = cells.indexOf(cell);
  if (index < cells.length - 1) {
    cells[index + 1].focus();
  }
}

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

    if (cell.value === correctLetter) {
      cell.classList.add("correct-position");
      cell.classList.remove("wrong-position", "incorrect");
    } else if (correctWords[wordType].includes(cell.value)) {
      cell.classList.add("wrong-position");
      cell.classList.remove("correct-position", "incorrect");
    } else {
      cell.classList.add("incorrect");
      cell.classList.remove("correct-position", "wrong-position");
    }
  });

  // Verificar palabras completas
  Object.keys(attempts).forEach(wordType => {
    const word = document.querySelectorAll(`[data-pos*="${wordType}"]`);
    if (Array.from(word).every(cell => cell.classList.contains("correct-position"))) {
      word.forEach(cell => cell.classList.add("full-correct"));
    }
  });
}

