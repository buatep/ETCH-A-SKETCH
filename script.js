const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_DENSITY = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentDensity = DEFAULT_DENSITY;

function setCurColor(newColor) {
  currentColor = newColor;
}

function setMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setDensity(newDensity) {
  currentDensity = newDensity;
}

const colorPicker = document.getElementById("colorPicker");
const colorMode = document.getElementById("colorMode");
const rainbowMode = document.getElementById("rainbowMode");
const densityValue = document.getElementById("densityValue");
const densitySlider = document.getElementById("densitySlider");
const canvas = document.getElementById("canvas");

colorPicker.oninput = (e) => setCurColor(e.target.value);
colorMode.onclick = (e) => setMode("color");
rainbowMode.onclick = (e) => setMode("rainbow");
densitySlider.onmousemove = (e) => updateDensityValue(e.target.value);
densitySlider.onchange = (e) => changeDensity(e.target.value);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function updateDensityValue(density) {
  densityValue.innerHTML = `${density} x ${density}`;
}

function changeDensity(density) {
  setDensity(density);
  updateDensityValue(density);
  renewCanvas();
}

function renewCanvas() {
  canvas.innerHTML = "";
  canvasSetup(currentDensity)
}

function canvasSetup(value) {
  canvas.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${value}, 1fr)`;

  for (let i = 0; i < value * value; i++) {
      const canvasElement = document.createElement("div")
      canvasElement.classList.add("pixel")
      canvasElement.addEventListener('mouseover', draw)
      canvasElement.addEventListener('mousedown', draw)
      canvas.appendChild(canvasElement)
  }
}

function draw(event) {
    if (event.type === "mouseover" && !mouseDown) return
    if (currentMode === "rainbow") {
        const red = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (currentMode === "color") {
        event.target.style.backgroundColor = currentColor
    }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowMode.classList.remove("active");
  } else if (currentMode === "color") {
    colorMode.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowMode.classList.add("active");
  } else if (newMode === "color") {
    colorMode.classList.add("active");
  }
}

window.onload = () => {
  canvasSetup(DEFAULT_DENSITY);
  activateButton(DEFAULT_MODE);
};
