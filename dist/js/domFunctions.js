const addSpiner = (icon) => {
  animateButton(icon)
  setTimeout(animateButton, 1000, icon)
}

// animate button
const animateButton = (icon) => {
  icon.classList.toggle("none")
  icon.nextElementSibling.classList.toggle("block")
  icon.nextElementSibling.classList.toggle("none")
}

// display error message
const displayError = (headerMsg, scrMsg) => {
  updateWeatherLocationHeader(headerMsg)
  updateScreenReaderConfirmation(scrMsg)
}

const updateWeatherLocationHeader = (msg) => {
  const h1 = document.querySelector("#current-forecast__locations")
  h1.textContent = msg
}

const updateScreenReaderConfirmation = (msg) => {
  document.querySelector("#confirmation").textContent = msg
}

export { addSpiner, displayError, updateScreenReaderConfirmation }
