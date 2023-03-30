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

canvas.addEventListener("mousemove", function(e) {
    if (isMouseDown) {
      const mousePos = getMousePos(canvas, e);
      const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
      if (clickedSquare) {
        if (colorChoice === "random") {
          // Generate a random color using RGB values between 0 and 255
          const red = Math.floor(Math.random() * 256); 
          const green = Math.floor(Math.random() * 256);
          const blue = Math.floor(Math.random() * 256);
          clickedSquare.color = `rgb(${red}, ${green}, ${blue})`;
        } else {
          clickedSquare.color = colorChoice;
        }
        drawSquare(clickedSquare);
      }
    }
  });

  // Set initial light grey color
let currentGrey = 34;

canvas.addEventListener("mousemove", function(e) {
  if (isMouseDown) {
    const mousePos = getMousePos(canvas, e);
    const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
    if (clickedSquare) {
      if (colorChoice === "Grey") {
        // Check if the square is already grey
        if (clickedSquare.color === "#222222") {
          // Darken the grey color by 20%
          currentGrey += 34;
          clickedSquare.color = `#${currentGrey.toString(16).padStart(2, '0').repeat(3)}`;
          if (currentGrey === 0) {
            // Reset the color to black if it has darkened to black
            clickedSquare.color = "#000000";
          }
        } else {
          // Reset the grey color if a different color is selected
          currentGrey = 34;
          clickedSquare.color = "#222222";
        }
      } else {
        clickedSquare.color = colorChoice;
      }
      drawSquare(clickedSquare);
    }
  }
});



  canvas.addEventListener("mousemove", function(e) {
    if (isMouseDown) {
      const mousePos = getMousePos(canvas, e);
      const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
      if (clickedSquare) {
        if (colorChoice === "grey") {
          // Generate a random color using RGB values between 0 and 255
          const red = Math.floor(Math.random() * 256);
          const green = Math.floor(Math.random() * 256);
          const blue = Math.floor(Math.random() * 256);
          clickedSquare.color = `rgb(${red}, ${green}, ${blue})`;
        } else {
          clickedSquare.color = colorChoice;
        }
        drawSquare(clickedSquare);
      }
    }
  });


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

  let colorChoice = 'black'; // default to black

  canvas.addEventListener("mousedown", function(e) {
    isMouseDown = true;
    const mousePos = getMousePos(canvas, e);
    const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
    if (clickedSquare) {
      clickedSquare.color = colorChoice;
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
        clickedSquare.color = colorChoice;
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

          const colorButton = document.getElementById('color-button');

colorButton.addEventListener('click', function() {
  switch (colorChoice) {
    case 'black':
      colorChoice = 'grey';
      colorButton.textContent = 'Grey';
      break;
    case 'grey':
      colorChoice = 'random';
      colorButton.textContent = 'Random';
      break;
    case 'random':
      colorChoice = 'black';
      colorButton.textContent = 'Black';
      break;
  }
});
