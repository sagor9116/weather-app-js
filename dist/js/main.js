/* DOM ELEMENTS */
// get nav buttons
const geoButton = document.querySelector("#get-location")
const homeButton = document.querySelector("#home")
const saveButton = document.querySelector("#save-location")
const unitButton = document.querySelector("#units")
const refreshButton = document.querySelector("#refresh")

// submit form
const locationEntry = document.querySelector("#search-bar__form")

// get icons
const locationIcon = document.querySelector(".fa-map-marker-alt")

// import functions from domFunctions
import { addSpiner, displayError } from "./domFunctions.js"

// import functions from dataFunctions
import { setLocationObj } from "./dataFunctions.js"

// import current location class
import CurrentLocation from "./CurrentLocation.js"

// creating new current location based on users
const currentLoc = new CurrentLocation()

// initialize app when dom loaded
const initApp = () => {
  // add event listerner
  geoButton.addEventListener("click", getGeoWeather)
  // homeButton.addEventListener("click", loadWeather)
  // saveButton.addEventListener("click", saveLocation)
  // unitButton.addEventListener("click", setUnitPref)
  // refreshButton.addEventListener("click", refreshWeather)
}
document.addEventListener("DOMContentLoaded", initApp)

const getGeoWeather = (event) => {
  console.log("get geo wether")

  if (event && event.type === "click") {
    addSpiner(locationIcon)
    console.log("clicked")
  }

  if (!navigator.geolocation) return geoError()
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

const geoError = (err) => {
  const errMessage = err ? err.message : "Geolocation not supported"
  displayError(errMessage, errMessage)
}

const geoSuccess = (position) => {
  const myCoordsObj = {
    lat: position.coords.lat,
    lon: position.coords.lon,
    name: `Lat: ${position.coords.lat} Lon: ${position.coords.lon}`,
  }

  setLocationObj(currentLoc, myCoordsObj)
}
