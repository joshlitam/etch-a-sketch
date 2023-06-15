//Window load
window.addEventListener("load", e => {
    createDivs(16)
    createColors([["black", "green", "yellow", "red", "blue", "indigo", "purple", "violet"]])
})

//Rainbow Mode
let rainbowmode = false
document.querySelector("#rainbowmodeButton").addEventListener("click", rainbowModeOn)

//Reset button
document.querySelector("#reset").addEventListener("click", gridReset)

//Slider
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = `Number of boxes: ${slider.value} x ${slider.value}` // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `Number of boxes: ${this.value} x ${this.value}`
  reset()
  createDivs(this.value)
  
}

//Create divs
function createDivs(value) {
    // mouse events
    let mouseDown = false
    document.body.onmousedown = () => {
        mouseDown = true
        console.log("Mouse down!")
    }
    document.body.onmouseup = () => {
        mouseDown = false
        console.log("Mouse up!")
    }
    for (i = 0; i < value; i++) {
        for (k = 0; k < value; k++) {
            const div = document.createElement("div")
            div.classList.add("sketch-div")
            let height = 500 / value
            let width = 500 / value
            div.style.height = `${height}px`
            div.style.width = `${width}px`
            div.style.backgroundColor = "black"
            div.style.opacity = 0
            div.addEventListener("mouseover", (e) => {
                if (!rainbowmode) {
                    div.style.backgroundColor = e.target.style.backgroundColor
                } else {
                    div.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
                }
                if (mouseDown) {
                    div.style.opacity = +div.style.opacity + 0.1
                }
            })
    
            document.querySelector("#sketch").appendChild(div)
        }
    }
}

//Reset Divs
function reset() {
    let parent = document.querySelector("#sketch")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

//Grid Reset
function gridReset() {
    if (rainbowmode) {
        rainbowmode = false
    }
    reset()
    slider.value = 16
    output.innerHTML = `Number of boxes: ${slider.value} x ${slider.value}`
    let colors = [...document.querySelectorAll(".colors")]
            for (k = 0; k < colors.length; k++) {
                colors[k].classList.remove("isSelected")
            }
    let span = document.querySelector("#selected-color")
    span.style.color = "black"
    span.innerHTML = "BLACK"
    createDivs(16)
}

//Create colors
function createColors([colors]) {
    let color = ""
    for (k = 0; k < colors.length; k++) {
        const div = document.createElement("div")
        div.classList.add("colors")
        div.style.height = "30px"
        div.style.width = "30px"
        div.style.backgroundColor = `${colors[k]}`
        div.addEventListener("click", (e) => {
            let colors = [...document.querySelectorAll(".colors")]
            for (k = 0; k < colors.length; k++) {
                colors[k].classList.remove("isSelected")
                color = e.target.style.backgroundColor
            }
            e.target.classList.toggle("isSelected")
            let colorName = e.target.style.backgroundColor
            let span = document.querySelector("#selected-color")
            span.innerHTML = `${colorName.toUpperCase()}`
            span.style.color = e.target.style.backgroundColor
            selectColor(color)
        })
        document.querySelector("#colorPicker").appendChild(div)
    }
}

function selectColor(color) {
    let divs = [...document.querySelectorAll(".sketch-div")]
    for (i = 0; i < divs.length; i++) {
        divs[i].style.opacity = 0
            if (!rainbowmode) {
                divs[i].style.backgroundColor = color
            } else {
                divs[i].style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
            }
    }
}

function rainbowModeOn() {
    if (!rainbowmode) {
        gridReset()
        rainbowmode = true
        let span = document.querySelector("#selected-color")
        span.style.color = "black"
        span.innerHTML = "RAINBOW MODE!!!"
    } else {
        gridReset()
    }
    console.log(rainbowmode)
}