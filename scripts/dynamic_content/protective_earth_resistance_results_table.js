import { cableResistanceTable } from "../data_tables/cable_resistance_table.js"
import { roundNumber as roundToDecimalPlaces } from "../formatters/number_rouder.js"

const PROTECTIVE_EARTH_TEST_TOLERANCE_OHMS = 0.1

export class ProtectiveEarthResistanceTableManager {
  constructor() {
    this.csaResistance = document.getElementById('csa-resistance')
    this.cableLengthSelection = document.getElementById('cable-length-selction-protective-earth-resistance')
    this.cableResistance = document.getElementById('cable-resistance')
    this.maxResistance = document.getElementById('max-resistance')
  }

  populateTable(csa, cableLength, cableResistance) {
    const csaResistance = cableResistanceTable[csa] * 0.001
    // Because of binary representation the line above can actually introduce rounding errors!
    const roundedcsaResistance = roundToDecimalPlaces(csaResistance, 3)
    this.csaResistance.innerHTML = `${roundedcsaResistance}Ωm⁻¹`
    
    this.cableLengthSelection.innerHTML = `${cableLength}m`
    
    const roundedCableResistance = roundToDecimalPlaces(cableResistance, 3)
    this.cableResistance.innerHTML = `${roundedCableResistance}Ω`
    
    const maxResistance = cableResistance + PROTECTIVE_EARTH_TEST_TOLERANCE_OHMS
    const roundedMaxResistance = roundToDecimalPlaces(maxResistance, 3)
    this.maxResistance.innerHTML = `${roundedMaxResistance}Ω`
  }
}
