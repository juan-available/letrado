let correctWords = {};
const validatedWords = { Horizontal1: false, Horizontal2: false, Vertical1: false, Vertical2: false };

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
    const pos = cell.getAttribute("data-pos").split(" ")[0]; // Primera palabra en caso de intersección
    if (!isLastCell(pos)) {
      const nextCell = getNextCell(pos);
      if (nextCell) nextCell.focus();
    }
  });
  cell.addEventListener("keyup", event => {
    if (event.key === "Enter") validateWords();
  });
});

document.getElementById("validateButton").addEventListener("click", validateWords);

function getNextCell(pos) {
  const [wordType, index] = pos.split("-");
  const nextIndex = parseInt(index) + 1;
  return document.querySelector(`.cell[data-pos*="${wordType}-${nextIndex}"]`);
}

function isLastCell(pos) {
  return pos.endsWith("4");
}

function validateWords() {
  ["Horizontal1", "Horizontal2", "Vertical1", "Vertical2"].forEach(wordType => {
    const cells = getCells(wordType);
    const inputWord = cells.map(cell => cell.value).join("");

    if (inputWord.length === 5 && !validatedWords[wordType]) {
      if (inputWord === correctWords[wordType]) {
        cells.forEach(cell => cell.classList.add("correct-position", "full-correct"));
        validatedWords[wordType] = true;
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

        if (attempts[wordType] === 0) showSolution();
      }
    }
  });
}

function getCells(wordType) {
  return Array.from(document.querySelectorAll(`.cell[data-pos*="${wordType}"]`));
}

function showSolution() {
  const solutionGrid = document.getElementById("solution-grid");
  solutionGrid.innerHTML = "";  // Código para mostrar las respuestas correctas.
}
