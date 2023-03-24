// Get the container element
const container = document.getElementById("container");

// Create the grid
for (let i = 0; i < 16; i++) {
	for (let j = 0; j < 16; j++) {
		// Create a new div element
		const div = document.createElement("div");
		div.classList.add("square");
		// Add event listeners to change color on hover
		div.addEventListener("mouseenter", function(event) {
			event.target.style.backgroundColor = "grey";
		});
			// Add the div to the container
		container.appendChild(div);
	}
	// Add a line break after each row of divs
	container.appendChild(document.createElement("br"));
}