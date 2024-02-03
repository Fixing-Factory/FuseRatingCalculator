import { calculateFuseRating } from "./calculators/cable_fuse_rating_calculator.js";
import { calculateDeviceCurrentDraw } from "./calculators/device_current_draw_calculator.js";
import { calculateResistanceOfCable } from "./calculators/cable_resistance_calculator.js";
import { roundNumber as roundToDecimalPlaces } from "./formatters/number_rouder.js";

const PROTECTIVE_EARTH_TEST_TOLERANCE_OHMS = 0.1

function calculatorProcessData() {
  const data = event.formData;

  const power = data.get("power")
  const voltage = parseInt(data.get("voltage"))
  const inrush = data.get("inrush")
  const csa = data.get("csa")
  const fuse = parseInt(data.get("fuse"))
  const plugType = data.get("plug-type")
  const cableLength = parseFloat(data.get("cable-length"))

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

main()