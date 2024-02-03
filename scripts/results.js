import { calculateFuseRating } from "./calculators/cable_fuse_rating_calculator.js";
import { calculateDeviceCurrentDraw } from "./calculators/device_current_draw_calculator.js";
import { calculateResistanceOfCable } from "./calculators/cable_resistance_calculator.js";
import { roundNumber as roundToDecimalPlaces } from "./formatters/number_rouder.js";
import { InputResultsContentManager } from "./dynamic_content/input_results_content.js";

const PROTECTIVE_EARTH_TEST_TOLERANCE_OHMS = 0.1

function calculatorProcessData() {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.get('myParam');

  const power = queryParams.get('power')
  const voltage = parseInt(queryParams.get('voltage'))
  const inrush = queryParams.get('inrush')
  const csa = queryParams.get('csa')
  const fuse = parseInt(queryParams.get('fuse'))
  const plugType = queryParams.get('plug-type')
  const cableLength = parseFloat(queryParams.get('cable-length'))

  const inputResultsManager = new InputResultsContentManager()
  inputResultsManager.initialiseForm(power, voltage, csa, inrush, fuse, plugType, cableLength)

  const currentDraw = calculateDeviceCurrentDraw(power, voltage)
  
  const roundedCurrentDrawString = roundToDecimalPlaces(currentDraw, 2)

  let warningMessage = ""

  if (fuse < currentDraw) {
    warningMessage +=
      `Fuse rating too low for device! 
        Should be at least ${roundedCurrentDrawString}
        `
  }

  const fuseRatingOfCable = calculateFuseRating(csa, plugType, inrush, cableLength)

  if (fuse > fuseRatingOfCable) {
    warningMessage +=
      `Fuse rating too high for the combination of flex/cable! 
        Should at most be ${fuseRatingOfCable}
        `
  }

  if (warningMessage !== "") {
    generateDisplayMessage(warningMessage)
    return
  }

  const cableResistance = calculateResistanceOfCable(csa, cableLength)

  const maxResistanceForProtectiveEarthTest = cableResistance + PROTECTIVE_EARTH_TEST_TOLERANCE_OHMS

  const roundedMaxResistance = roundToDecimalPlaces(maxResistanceForProtectiveEarthTest, 3)


}

function main() {
  calculatorProcessData()
}

window.addEventListener("load", () => main())


