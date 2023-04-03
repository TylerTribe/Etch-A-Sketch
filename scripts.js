const canvas = document.getElementById("etch-a-sketch");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("myRange");
let squaresPerSide = 16;
let squares = []; // array to hold information about each square in the grid
let isMouseDown = false;
const colorOptions = ['black', 'pencil', 'random'];
let currentColorOptionsIndex = 1;
let currentPencilIndex = 1;
let colorChoice = 'black'; // default to black
let gradient = ['#FFFFFF', '#888888', '#666666', '#444444', '#222222', '#000000'];
let lastColor = '#FFFFFF'; // initialize last color to white. If I remove this the pencil color option breaks for some reason.


canvas.addEventListener("mousemove", function(e) {
    if (isMouseDown) {
        const mousePos = getMousePos(canvas, e);
        const clickedSquare = getClickedSquare(mousePos.x, mousePos.y);
        if (clickedSquare) {
            if (colorChoice === 'random') {
                // Generate a random color using RGB values between 0 and 255
                const red = Math.floor(Math.random() * 256); 
                const green = Math.floor(Math.random() * 256);
                const blue = Math.floor(Math.random() * 256);
                clickedSquare.color = `rgb(${red}, ${green}, ${blue})`;
            } else if (colorChoice === 'pencil') {
                // Set the square's color to the current color in the pencil array
                clickedSquare.color = gradient[currentPencilIndex];
                // Increment the current pencil index, but only if the last color used wasn't black. This isn't really working and I'm not sure why.
                if (lastColor !== '#000000') {
                    currentPencilIndex = (currentPencilIndex + 1) % gradient.length;
                }
                lastColor = clickedSquare.color;
            } else {
                clickedSquare.color = colorChoice;
            }
            drawSquare(clickedSquare);
        }
    }
});
// Changes the size of the etch-a-sketch canvas 
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
                color: 'white'
            };
            squares.push(square); // add the square object to the squares array
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
        }
    }
}

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

    function getMousePos(canvas, e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
        };
    }

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
        colorChoice = 'pencil';
        colorButton.textContent = 'Pencil';
        break;
        case 'pencil':
        colorChoice = 'random';
        colorButton.textContent = 'Random';
        break;
        case 'random':
        colorChoice = 'black';
        colorButton.textContent = 'Black';
        break;
    }
    });