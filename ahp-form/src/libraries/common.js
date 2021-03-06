/**
 * "Round number into n decimal "places"
 * @param num The number to be rounded
 * @param places The number of decimal places. Default = 2
 * @return The rounded number
 */
function round(num, places = 2) {
  return Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places;
}

export { round };