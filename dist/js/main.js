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
const homeIcon = document.querySelector(".fa-home")
const saveIcon = document.querySelector(".fa-save")
const unitIcon = document.querySelector(".fa-chart-bar")
const refreshIcon = document.querySelector(".fa-sync-alt")
// import functions from domFunctions
import {
  addSpiner,
  displayError,
  updateScreenReaderConfirmation,
} from "./domFunctions.js"

// import functions from dataFunctions
import { getHomeLocation, setLocationObj } from "./dataFunctions.js"

// import current location class
import CurrentLocation from "./CurrentLocation.js"

// creating new current location based on users
const currentLoc = new CurrentLocation()

// initialize app when dom loaded
const initApp = () => {
  // add event listerner
  geoButton.addEventListener("click", getGeoWeather)
  homeButton.addEventListener("click", loadWeather)
  saveButton.addEventListener("click", saveLocation)
  unitButton.addEventListener("click", setUnitPref)
  refreshButton.addEventListener("click", refreshWeather)

  loadWeather()
}
document.addEventListener("DOMContentLoaded", initApp)

const getGeoWeather = (event) => {
  if (event && event.type === "click") {
    addSpiner(locationIcon)
    console.log("clicked")
  }
  if (!navigator.geolocation) return geoError()
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

// geo location error
const geoError = (err) => {
  console.log(err)
  const errMessage = err ? err.message : "Geolocation not supported"
  displayError(errMessage, errMessage)
}

//geo location success
const geoSuccess = (position) => {
  console.log(position)
  const myCoordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat: ${position.coords.latitude} Lon: ${position.coords.longitude}`,
  }

  setLocationObj(currentLoc, myCoordsObj)
  console.log(currentLoc)
  updateDataAndDisplay(currentLoc)
}

// loding weather
const loadWeather = (event) => {
  const savedLocation = getHomeLocation()
  if (!savedLocation && !event) return getGeoWeather()
  if (!savedLocation && event.type === "click") {
    displayError(
      "No Home Location Saved.",
      "Sorry. Please save your home location first."
    )
  } else if (savedLocation && !event) {
    displayHomeWeatherLocation(savedLocation)
  } else {
    addSpiner(homeIcon)
    displayHomeWeatherLocation(savedLocation)
  }
}

// display Home Weather Location
const displayHomeWeatherLocation = (home) => {
  if (typeof home === "string") {
    const locationObj = JSON.parse(home)
    console.log(locationObj)
    const myCoordsObj = {
      lat: locationObj.lat,
      lon: locationObj.lon,
      name: locationObj.name,
      unit: locationObj.unit,
    }
    setLocationObj(currentLoc, myCoordsObj)
    updateDataAndDisplay(currentLoc)
  }
}

// save location
const saveLocation = () => {
  if (currentLoc.getLat() && currentLoc.getLon()) {
    addSpiner(saveIcon)
    const location = {
      lat: currentLoc.getLat(),
      lon: currentLoc.getLon(),
      name: currentLoc.getName(),
      unit: currentLoc.getUnit(),
    }
    localStorage.setItem("defaultWeatherLocation", JSON.stringify(location))
    updateScreenReaderConfirmation(
      `Saved ${currentLoc.getName()} as home location.`
    )
  }
}

// setting weather unit
const setUnitPref = () => {
  addSpiner(unitIcon)
  currentLoc.toggleUnit()
  updateDataAndDisplay(currentLoc)
}

// refresh current weather
const refreshWeather = () => {
  addSpiner(refreshIcon)
  updateDataAndDisplay(currentLoc)
}

const updateDataAndDisplay = async (locationObj) => {
  console.log(locationObj)
}
