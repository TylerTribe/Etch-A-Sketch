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
    for (let i = 0; i < squaresPerSide; i++) {
      for (let j = 0; j < squaresPerSide; j++) {
        const square = {
          x: i * squareSize,
          y: j * squareSize,
          size: squareSize,
          color: "white"
        };
        squares.push(square); // add the square object to the squares array
        ctx.strokeRect(square.x, square.y, square.size, square.size);
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

