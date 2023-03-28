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
    case "48":
      squaresPerSide = 48;
      break;
    case "64":
      squaresPerSide = 64;
      break;
  }
  drawGrid();
});

function drawGrid() {
  const squareSize = canvas.width / squaresPerSide;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < squaresPerSide; i++) {
    for (let j = 0; j < squaresPerSide; j++) {
      ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
  }
}



canvas.width = 1000;
canvas.height = 625;

drawGrid();

      // Add event listeners to change color on click and hold
      canvas.addEventListener("mousedown", function(e) {
        e.target.style.backgroundColor = "grey";
        isMouseDown = true;
      });
      canvas.addEventListener("mouseup", function(e) {
        e.target.style.backgroundColor = "white";
        isMouseDown = false;
      });
      canvas.addEventListener("mousemove", function(e) {
        // Check if mouse is down
        if (isMouseDown) {
          e.target.style.backgroundColor = "grey";
        }
      });

      // Add the div to the grid container
      gridContainer.appendChild();


