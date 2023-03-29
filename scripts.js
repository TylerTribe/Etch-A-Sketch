// Select the elements on the page - canvas, shake erase button, color button, slider
// set up our canvas for drawing
// write a draw function
// write a handler for the keys
// clear or shake function
// listen for mousedown

const canvas = document.getElementById("etch-a-sketch");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("myRange");
let squaresPerSide = 16;
let squares = []; // array to hold information about each square in the grid
let isMouseDown = false;

slider.addEventListener("input", () => {
  switch (slider.value) {
    case "8":
      squaresPerSide = 8;
      break;
    case "16":
      squaresPerSide = 16;
      break;
    case "32":
      squaresPerSide = 32;
      break;

    case "64":
      squaresPerSide = 64;
      break;
  }
  drawGrid();
});

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    squares = []; // clear the squares array
    const squareSize = Math.floor(canvas.width / squaresPerSide);
    for (let column = 0; column < squaresPerSide; column++) {
      for (let row = 0; row < squaresPerSide; row++) {
        const square = {
          x: column * squareSize,
          y: row * squareSize,
          size: squareSize,
          color: "white"
        };
        squares.push(square); // add the square object to the squares array
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.size, square.size);
      }
    }
  }

// Add event listeners to change color on click and hold
canvas.addEventListener("mousedown", function(e) {
  isMouseDown = true;
  const mousePos = getMousePos(canvas, e);
  const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
  if (clickedSquare) {
    clickedSquare.color = "grey";
    drawSquare(clickedSquare);
  }
});
canvas.addEventListener("mouseup", function(e) {
  isMouseDown = false;
});
canvas.addEventListener("mousemove", function(e) {
  if (isMouseDown) {
    const mousePos = getMousePos(canvas, e);
    const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
    if (clickedSquare) {
      clickedSquare.color = "grey";
      drawSquare(clickedSquare);
    }
  }
});

// Helper function to get the mouse position relative to the canvas
function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

// Helper function to get the square object that was clicked on
function getClickedSquare(x, y) {
    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      if (x >= square.x && x <= square.x + square.size &&
          y >= square.y && y <= square.y + square.size) {
        return square;
      }
    }
    return null;
  }
        
        // Helper function to draw a square with a specified color
        function drawSquare(square) {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.size, square.size);
        }
        
        drawGrid();

        function shake() {
            for (let i = 0; i < squares.length; i++) {
              squares[i].color = "white";
              drawSquare(squares[i]);
            }
          }
          
          const clearButton = document.getElementById("shake");
          clearButton.addEventListener("click", shake);


          /* OK SO EVERYTHING UNDERNEATH HERE IS SUS. NEEDS FIXING
          
          let colorOptions = ['black', 'random'];
          let currentColorIndex = 0;
          let currentBlackness = 0;
          
          function colorOption() {
            currentColorIndex++;
            if (currentColorIndex >= colorOptions.length) {
              currentColorIndex = 0;
              currentBlackness = 0;
            }
          
            if (colorOptions[currentColorIndex] === 'random') {
              currentBlackness = 0;
            }
          
            colorButton.textContent = colorOptions[currentColorIndex];
          }
          
          function getNewColor() {
            if (colorOptions[currentColorIndex] === 'random') {
              return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            } else {
              currentBlackness += 20;
              if (currentBlackness > 100) {
                currentBlackness = 100;
              }
              return `hsl(0, 0%, ${100 - currentBlackness}%)`;
            }
          }
          let colorButton = document.querySelector('#color-button');
          colorButton.addEventListener('click', colorOption);
          
          function draw(e) {
            // ...
            ctx.fillStyle = getNewColor();
            // ...
          }

          */

