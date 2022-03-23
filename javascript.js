
let containerWidth = 1000;
let containerHeight = 1000;

let divContainer = document.createElement('div');
divContainer.style.border = "thick solid red";
divContainer.style.width = containerWidth;
divContainer.style.height = containerHeight;
divContainer.className = "div-container"

let resetButton = document.createElement('button');
resetButton.innerHTML = "Reset";
resetButton.className = "reset-button";
resetButton.addEventListener("click", () => {
    askNumber()
})

document.body.appendChild(resetButton);
document.body.appendChild(divContainer);

function askNumber() {
    let row = prompt("Please enter the number of rows", "Maximum of 100")
    let column = prompt("Please enter the number of columns", "Maximum of 100")
    if (row <= 100 && column <= 100) {
        createGrid(row, column)
    } else {
        errorMessage()
    }
}

function errorMessage() {
    alert("Too many squares")
    askNumber()
}

function createGrid(row, column) {
    deleteChildren(divContainer)
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
        divContainer.appendChild(div);
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