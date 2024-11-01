// Configuración de palabras correctas en el formato de cuadrado
const correctWords = {
  row1: "PARED",
  row5: "RAMOS",
  col1: "PLUMA",
  col5: "DORAL"
};

function checkWords() {
  // Recorre cada posición en el cuadrado
  document.querySelectorAll(".cell").forEach(cell => {
    const [row, col] = cell.dataset.pos.split('-').map(Number);
    let correctLetter;

    // Determina si es una celda de palabra horizontal o vertical
    if (row === 0) correctLetter = correctWords.row1[col];
    else if (row === 4) correctLetter = correctWords.row5[col];
    else if (col === 0) correctLetter = correctWords.col1[row];
    else if (col === 4) correctLetter = correctWords.col5[row];

    // Compara la letra introducida
    if (cell.value.toUpperCase() === correctLetter) {
      cell.classList.add("correct");
    } else if (correctWords.row1.includes(cell.value.toUpperCase()) || 
               correctWords.row5.includes(cell.value.toUpperCase()) || 
               correctWords.col1.includes(cell.value.toUpperCase()) || 
               correctWords.col5.includes(cell.value.toUpperCase())) {
      cell.classList.add("partial");
    } else {
      cell.classList.add("incorrect");
    }
  });
}
