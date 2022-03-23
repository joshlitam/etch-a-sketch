// global variables
let containerWidth = 400;
let containerHeight = 400;
let currentRow = 16;
let currentColumn = 16;

// primary container
let divContainer = document.createElement('div');
divContainer.className = "div-container";

// labels wrapper
let labelWrapper = document.createElement('div');
labelWrapper.className = "label-wrapper";

let titleParagraph = document.createElement('p');
titleParagraph.innerHTML = "Etch a Sketch";
titleParagraph.className = "title-paragraph";

let authorParagraph = document.createElement('p');
authorParagraph.innerHTML = "By: Josh";
authorParagraph.className = "author-paragraph";

labelWrapper.appendChild(titleParagraph);
labelWrapper.appendChild(authorParagraph);

// sketch wrapper
let sketchWrapper = document.createElement('div');
sketchWrapper.className = "sketch-wrapper";

let pixelCount = document.createElement('div');
pixelCount.innerHTML = "Current pixel size is: " + currentRow + "x" + currentColumn;
pixelCount.className = "pixel-count"

let sketchContainer = document.createElement('div');
sketchContainer.style.border = "thick solid black";
sketchContainer.className = "sketch-container"

let resetButton = document.createElement('button');
resetButton.innerHTML = "Reset";
resetButton.className = "reset-button";
resetButton.addEventListener("click", () => {
    askNumber()
})

sketchWrapper.appendChild(pixelCount);
sketchWrapper.appendChild(sketchContainer);
sketchWrapper.appendChild(resetButton);

// appending on documents
divContainer.appendChild(labelWrapper);
divContainer.appendChild(sketchWrapper)
document.body.appendChild(divContainer);

function askNumber() {
    let row = prompt("Please enter the number of rows", "Maximum of 100")
    let column = prompt("Please enter the number of columns", "Maximum of 100")
    if (row <= 100 && column <= 100) {
        createGrid(row, column)
        currentRow = row;
        currentColumn = column;
        pixelCount.innerHTML = "Current pixel size is: " + currentRow + "x" + currentColumn;
    } else {
        errorMessage()
    }
}

function errorMessage() {
    alert("Too many squares")
    askNumber()
}

function createGrid(row, column) {
    deleteChildren(sketchContainer)
    let numberOfSquares = row * column
    for (let i = 0; i < numberOfSquares; i++) {
        let div = document.createElement('div');
        let divWidth = (containerWidth/column);
        let divHeight = (containerHeight/row);
        let opacity = .1
        div.className = "div-grid"
        div.style.width = `${divWidth}px`;
        div.style.height = `${divHeight}px`;
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = "black"
            div.style.opacity = `${opacity}`
            opacity += .1
        })
        sketchContainer.appendChild(div);
    }
}

function deleteChildren(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

window.addEventListener('load', (event) => {
    createGrid(16, 16);
})