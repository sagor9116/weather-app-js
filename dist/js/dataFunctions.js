const setLocationObj = (locationObj, coordsObj) => {
  const { lat, lon, name, unit } = coordsObj
  locationObj.setLat(lat)
  locationObj.setLon(lon)
  locationObj.setName(name)
  if (unit) {
    locationObj.setUnit(unit)
  }
}

const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation")
}

export { setLocationObj, getHomeLocation }
