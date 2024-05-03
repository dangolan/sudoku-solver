// Sudoku puzzle
var puzzle = [];
var PossibleNumbersSets = [];
var dontSolve = true;
var firstTime = true; 

function generateRandomPuzzle() {
  var puzzle = [];
  var random1 = Math.floor(Math.random() * 9);
  var random2 = Math.floor(Math.random() * 9) + 9;
  var random3 = Math.floor(Math.random() * 9) + 18;
  var random4 = Math.floor(Math.random() * 9) + 27;
  var random5 = Math.floor(Math.random() * 9) + 36;
  var random6 = Math.floor(Math.random() * 9) + 45;
  var random7 = Math.floor(Math.random() * 9) + 54;
  var random8 = Math.floor(Math.random() * 9) + 63;
  var random9 = Math.floor(Math.random() * 9) + 72;
  var counter = 0;
  for (var i = 0; i < 3; i++) {
    puzzle[i] = [];
    for (var j = 0; j < 3; j++) {
      puzzle[i][j] = [];
      for (var k = 0; k < 3; k++) {
        puzzle[i][j][k] = [];
        for (var l = 0; l < 3; l++) {
          if(counter == random1 )
            puzzle[i][j][k][l] = 1;
          else if(counter == random2)
            puzzle[i][j][k][l] = 2;
          else if(counter == random3)
            puzzle[i][j][k][l] = 3;
          else if(counter == random4)
            puzzle[i][j][k][l] = 4;
          else if(counter == random5)
            puzzle[i][j][k][l] = 5;
          else if(counter == random6)
            puzzle[i][j][k][l] = 6;
          else if(counter == random7)
            puzzle[i][j][k][l] = 7;
          else if(counter == random8)
            puzzle[i][j][k][l] = 8;
          else if(counter == random9)
            puzzle[i][j][k][l] = 9;
          else
            puzzle[i][j][k][l] = null;
          counter++;
        }
      }
    }
  }
  return puzzle;
}

function generatePuzzle() {
  for (var i = 0; i < 3; i++) {
    puzzle[i] = [];
    for (var j = 0; j < 3; j++) {
      puzzle[i][j] = [];
      for (var k = 0; k < 3; k++) {
        puzzle[i][j][k] = [];
        for (var l = 0; l < 3; l++) {
          puzzle[i][j][k][l] = null;
        }
      }
    }
  }
}
function generetRandom(){
  puzzle = generateRandomPuzzle();
  generatePossibleNumbersSets();
  puzzle = solveSudoku(puzzle, PossibleNumbersSets);
  const level = document.getElementById('level').value;
  if(level == "1"){
    removeRandom(50);
  }
  else if(level == "2"){
    removeRandom(70);
  }
  else if(level == "3"){
    removeRandom(85);
  }
  else if(level == "4"){
    removeRandom(100);
  }
  generateSudoku(puzzle);
}

function removeRandom(num){
  randomNumbersBetween0To80 = new Set();
  for (var i = 0; i < num; i++) {
    randomNumbersBetween0To80.add(Math.floor(Math.random() * 81));
  }
  var counter = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
          if(randomNumbersBetween0To80.has(counter)){
            puzzle[i][j][k][l] = null;
          }
          counter++;
        }
      }
    }
  }
}


function generatePossibleNumbersSets() {
  for (var i = 0; i < 3; i++) {
    PossibleNumbersSets[i] = [];
    for (var j = 0; j < 3; j++) {
      PossibleNumbersSets[i][j] = [];
      for (var k = 0; k < 3; k++) {
        PossibleNumbersSets[i][j][k] = [];
        for (var l = 0; l < 3; l++) {
          if (puzzle[i][j][k][l] !== null) {
            PossibleNumbersSets[i][j][k][l] = new Set([puzzle[i][j][k][l]]);
          } else {
            PossibleNumbersSets[i][j][k][l] = new Set([
              1, 2, 3, 4, 5, 6, 7, 8, 9,
            ]);
          }
        }
      }
    }
  }
}

function copyArray(arr) {
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      copy[i] = copyArray(arr[i]);
    } else if (arr[i] instanceof Set) {
      copy[i] = new Set(arr[i]);
    } else {
      copy[i] = arr[i];
    }
  }
  return copy;
}



// Function to generate Sudoku grid
function generateSudoku(puzzle) {
  var table = document.getElementById("sudoku");
  table.innerHTML = "";
  for (var i = 0; i < 3; i++) {
    var rowGroup = puzzle[i];
    var cubeElement = document.createElement("div");
    cubeElement.classList.add("cube");
    for (var j = 0; j < 3; j++) {
      var row = rowGroup[j];
      var rowElement = document.createElement("table");
      for (var k = 0; k < 3; k++) {
        var cellGroup = row[k];
        var rowInner = rowElement.insertRow();
        for (var l = 0; l < 3; l++) {
          var cell = cellGroup[l];
          var cellElement = rowInner.insertCell();
          var input = document.createElement("input");
          input.type = "text";
          input.maxLength = 1;
          input.value = cell ? cell : "";
          input.readOnly = cell !== null;
          input.setAttribute("data-row", i * 3 + j);
          input.setAttribute("data-col", k * 3 + l);
          input.addEventListener("input", updatePuzzle);
          cellElement.appendChild(input);
        }
      }
      cubeElement.appendChild(rowElement);
    }
    table.appendChild(cubeElement);
  }
}

// Function to update the puzzle based on user input
function updatePuzzle(event) {
  var input = event.target;
  var row = parseInt(input.getAttribute("data-row"));
  var col = parseInt(input.getAttribute("data-col"));
  var value = null;

  // Check if input is a number between 1 and 9
  if (/^[1-9]$/.test(input.value.trim())) {
    value = parseInt(input.value.trim());
  } else if (input.value.trim() !== "") {
    alert("Please enter a number between 1 and 9!");
    input.value = "";
    return;
  }

  puzzle[Math.floor(row / 3)][row % 3][Math.floor(col / 3)][col % 3] = value;
}

function errorSolving(output) {
  alert(output || "Error in the Sudoku, please check the numbers");
  return;
}

function solve() {
  dontSolve = true;
  generatePossibleNumbersSets();
  puzzle = solveSudoku(puzzle, PossibleNumbersSets);
  if (!puzzle) {
    errorSolving();
  }else{
  generateSudoku(puzzle);
  errorSolving("Sudoku Solved!");
  }
}

// Function to solve Sudoku
function solveSudoku(puzzle, PossibleNumbersSets) {
  let newPuzzle = copyArray(puzzle);
  let newPossibleNumbersSets = copyArray(PossibleNumbersSets);
  var therIsEmpty = false;
  var findCell = false;
  var noPlace = { value: false };  
  while (dontSolve) {
    findCell = false;
    for (var i = 0; i < 3 && dontSolve; i++) {
      for (var j = 0; j < 3 && dontSolve; j++) {
        for (var k = 0; k < 3 && dontSolve; k++) {
          for (var l = 0; l < 3 && dontSolve; l++) {
            if (newPuzzle[i][j][k][l] !== null) {
              continue;
            }
            if (
              checkRow(i, j, k, l,newPuzzle,newPossibleNumbersSets,noPlace) ||
              checkColumn(i, j, k, l,newPuzzle,newPossibleNumbersSets,noPlace) ||
              checkCube(i, j, k, l,newPuzzle,newPossibleNumbersSets,noPlace)
            ) {
              findCell = true;
        
            }
          }
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
          for (var l = 0; l < 3; l++) {
            if (
              mustToBe(i, j, k, l,newPuzzle,newPossibleNumbersSets,noPlace) ||
              mustToBe2(i, j, k, l,newPuzzle,newPossibleNumbersSets) ||
              mustToBe3(i, j, k, l,newPuzzle,newPossibleNumbersSets)
            ) {
              findCell = true;
            
            }
          }
        }
      }
    }

    therIsEmpty = false;
    if(noPlace.value && firstTime){
      dontSolve = false;
      return null;
    }
    firstTime = false;
    
    if (!findCell) {
      var minPossibleNumbersSets = 9;
      var iX;
      var jX;
      var kX;
      var lX;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 3; k++) {
            for (var l = 0; l < 3; l++) {
              if (
                minPossibleNumbersSets > newPossibleNumbersSets[i][j][k][l].size &&
                newPossibleNumbersSets[i][j][k][l].size !== 1
              ) {
                iX = i;
                jX = j;
                kX = k;
                lX = l;
                minPossibleNumbersSets = newPossibleNumbersSets[i][j][k][l].size;
                therIsEmpty = true;
              }
            }
          }
        }
      }
      if (minPossibleNumbersSets === 0) {
        return null;
      }
      if (!therIsEmpty) {
        return newPuzzle;
      }

      for (let value of newPossibleNumbersSets[iX][jX][kX][lX]) {
        let puzzleForRecursive = copyArray(newPuzzle);
        let possibleNumbersSetsRecursive = copyArray(newPossibleNumbersSets);
        puzzleForRecursive[iX][jX][kX][lX] = value;
        possibleNumbersSetsRecursive[iX][jX][kX][lX] = new Set([value]);
        let result = solveSudoku(puzzleForRecursive, possibleNumbersSetsRecursive);
        if (result) {
          return result;
        }
      }
      return null;
    }

  }
}

function checkRow(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets,noPlace) {
  var possibleNumbersSet = newPossibleNumbersSets[iP][jP][kP][lP];
  var row = new Set();
  for (var j = 0; j < 3; j++) {
    for (var l = 0; l < 3; l++) {
      if (j === jP && l === lP) {
        continue;
      }
      if (newPuzzle[iP][j][kP][l] !== null) {
        let num = newPuzzle[iP][j][kP][l];
        if(row.has(num)){
          noPlace.value = true;
          return false;
        }
        row.add(num);
        possibleNumbersSet.delete(num);
      }
    }
  }
  if (possibleNumbersSet.size === 0) {
    return false
  }
  if (possibleNumbersSet.size === 1) {
    // Get the only element in the set
    let value = possibleNumbersSet.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    return true;
  }
  return false;
}

function checkColumn(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets,noPlace) {
  var possibleNumbersSet = newPossibleNumbersSets[iP][jP][kP][lP];
  var column = new Set();
  
  for (var i = 0; i < 3; i++) {
    for (var k = 0; k < 3; k++) {
      if (i == iP && k == kP) {
        continue;
      }
      if (newPuzzle[i][jP][k][lP] !== null) {
        let num = newPuzzle[i][jP][k][lP];
        possibleNumbersSet.delete(num);
        if(column.has(num)){
          noPlace.value = true;
          return false;
        }
        column.add(num);
      }
    }
  }
  if (possibleNumbersSet.size == 0) {
    return false;
  }
  if (possibleNumbersSet.size == 1) {
    // Get the only element in the set
    let value = possibleNumbersSet.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    return true;
  }
  return false;
}

function checkCube(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets,noPlace) {
  var possibleNumbersSet = newPossibleNumbersSets[iP][jP][kP][lP];
  var cube = new Set();  
  for (var k = 0; k < 3; k++) {
    for (var l = 0; l < 3; l++) {
      if (k == kP && l == lP) {
        continue;
      }
      if (newPuzzle[iP][jP][k][l] !== null) {
        let num = newPuzzle[iP][jP][k][l];
        possibleNumbersSet.delete(num);
        if(cube.has(num)){
          noPlace.value = true;
          return false;
        }
        cube.add(num);
      }
    }
  }
  if (possibleNumbersSet.size == 0) {
    return false;
  }
  if (possibleNumbersSet.size == 1) {
    // Get the only element in the set
    let value = possibleNumbersSet.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    return true;
  }
  return false;
}

function mustToBe(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets,noPlace) {
  
  let setOfIndex = newPossibleNumbersSets[iP][jP][kP][lP]; 
  let fullSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (var j = 0; j < 3; j++) {
    for (var l = 0; l < 3; l++) {
      if (j == jP && l == lP) {
        continue;
      }

      setOfIndex = setDifference(setOfIndex, PossibleNumbersSets[iP][j][kP][l]);
      fullSet = setDifference(fullSet, PossibleNumbersSets[iP][j][kP][l]);

    }
  }
  if(fullSet.size > 1){
    noPlace.value = true;
    return false;
  }

  if (setOfIndex.size == 1 && newPuzzle[iP][jP][kP][lP] === null) {
    let value = setOfIndex.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    var num = newPuzzle[iP][jP][kP][lP];
    newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
    return true;
  }

  setOfIndex = newPossibleNumbersSets[iP][jP][kP][lP];
  fullSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);


  for (var i = 0; i < 3; i++) {
    for (var k = 0; k < 3; k++) {
      if (i == iP && k == kP) {
        continue;
      }

      setOfIndex = setDifference(setOfIndex, newPossibleNumbersSets[i][jP][k][lP]);
      fullSet = setDifference(fullSet,newPossibleNumbersSets[i][jP][k][lP]);

    }
  }
  if(fullSet.size > 1){
    noPlace.value = true;
    return false;
  }

  if (setOfIndex.size == 1 && newPuzzle[iP][jP][kP][lP] === null) { 
    let value = setOfIndex.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    var num = newPuzzle[iP][jP][kP][lP];
    newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
    return true;
  }

  setOfIndex = newPossibleNumbersSets[iP][jP][kP][lP];
  fullSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (var k = 0; k < 3; k++) {
    for (var l = 0; l < 3; l++) {
      if (k == kP && l == lP) {
        continue;
      }
      setOfIndex = setDifference(setOfIndex, newPossibleNumbersSets[iP][jP][k][l]);
      fullSet = setDifference(fullSet,newPossibleNumbersSets[iP][jP][k][l]);
    }
  }
  if(fullSet.size > 1){
    noPlace.value = true;
    return false;
  }

  if (setOfIndex.size == 1 && newPuzzle[iP][jP][kP][lP] === null) {
    let value = setOfIndex.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    var num = newPuzzle[iP][jP][kP][lP];
    newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
    return true;
  }
  return false;
}

function mustToBe2(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets) {
  if(newPuzzle[iP][jP][kP][lP] !== null){
    return false;
  }
  let setOfIndex = newPossibleNumbersSets[iP][jP][kP][lP];
  
  row = [];
  column = [];
  cube = [];
  for (var j = 0; j < 3; j++) {
    for (var l = 0; l < 3; l++) {
      if (j == jP && l == lP) {
        continue;
      }
      row.push(newPossibleNumbersSets[iP][j][kP][l]);
    }
  }
  for (var i = 0; i < 3; i++) {
    for (var k = 0; k < 3; k++) {
      if (i == iP && k == kP) {
        continue;
      }
      column.push(newPossibleNumbersSets[i][jP][k][lP]);
    }
  }
  for (var k = 0; k < 3; k++) {
    for (var l = 0; l < 3; l++) {
      if (k == kP && l == lP) {
        continue;
      }
      cube.push(newPossibleNumbersSets[iP][jP][k][l]);
    }
  }
  for (var i = 0; i < row.length; i++) {
    for (var j = 0; j < row.length; j++) {
      if (setEqual(row[i], row[j]) && row[i].size == 2 && i != j) {
        setOfIndex = setDifference(setOfIndex, row[i]);
      }
    }
  }

  for (var i = 0; i < column.length; i++) {
    for (var j = 0; j < column.length; j++) {
      if (setEqual(column[i], column[j]) && column[i].size == 2 && i != j) {
        setOfIndex = setDifference(setOfIndex, column[i]);
      }
    }
  }
  for (var i = 0; i < cube.length; i++) {
    for (var j = 0; j < cube.length; j++) {
      if (setEqual(cube[i], cube[j]) && cube[i].size == 2 && i != j) {
        setOfIndex = setDifference(setOfIndex, cube[i]);
      }
    }
  }

  if (setOfIndex.size == 1) {
    
    let value = setOfIndex.values().next().value;
    // Set the value of the puzzle cell to the only possible number
    newPuzzle[iP][jP][kP][lP] = value;
    var num = newPuzzle[iP][jP][kP][lP];
    newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
    return true;
  }
  return false;
}

function mustToBe3(iP, jP, kP, lP,newPuzzle,newPossibleNumbersSets) {
  if(newPuzzle[iP][jP][kP][lP] !== null){
    return false;
  }
  let setOfIndex = newPossibleNumbersSets[iP][jP][kP][lP];
  
  var isFound = true;
  for (let item of setOfIndex) {
    for (var j = 0; j < 3 && isFound; j++) {
      for (var l = 0; l < 3 && isFound; l++) {
        if (j == jP && l == lP) {
          continue;
        }
        if (newPossibleNumbersSets[iP][j][kP][l].has(item)) {
          isFound = false;
        }
      }
    }
    if (isFound) {
      let value = item;
      // Set the value of the puzzle cell to the only possible number
      newPuzzle[iP][jP][kP][lP] = value;
      var num = newPuzzle[iP][jP][kP][lP];
      newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
      return true;
    }
    isFound = true;

    for (var i = 0; i < 3; i++) {
      for (var k = 0; k < 3; k++) {
        if (i == iP && k == kP) {
          continue;
        }

        if (newPossibleNumbersSets[i][jP][k][lP].has(item)) {
          isFound = false;
        }
      }
    }
    if (isFound) {
      let value = item;
      // Set the value of the puzzle cell to the only possible number
      newPuzzle[iP][jP][kP][lP] = value;
      var num = newPuzzle[iP][jP][kP][lP];
      newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
      return true;
    }
    isFound = true;

    for (var k = 0; k < 3; k++) {
      for (var l = 0; l < 3; l++) {
        if (k == kP && l == lP) {
          continue;
        }
        if (newPossibleNumbersSets[iP][jP][k][l].has(item)) {
          isFound = false;
        }
      }
    }
    if (isFound) {
      let value = item;
      // Set the value of the puzzle cell to the only possible number
      newPuzzle[iP][jP][kP][lP] = value;
      var num = newPuzzle[iP][jP][kP][lP];
      newPossibleNumbersSets[iP][jP][kP][lP] = new Set([num]);
      return true;
    }
  }
  return false;
}
function setDifference(setA, setB) {
  let difference = new Set(setA);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
}
function setEqual(set1, set2) {
  if (set1.size !== set2.size) {
    return false;
  }
  for (var item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

// Generate Sudoku grid when the page loads
window.onload = function () {
  generatePuzzle();
  generateSudoku(puzzle);
};