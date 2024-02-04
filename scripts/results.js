import { calculateFuseRating } from "./calculators/cable_fuse_rating_calculator.js";
import { calculateDeviceCurrentDraw } from "./calculators/device_current_draw_calculator.js";
import { calculateResistanceOfCable } from "./calculators/cable_resistance_calculator.js";
import { InputResultsTableManager } from "./dynamic_content/input_results_table.js";
import { CurrentDrawResultsTableManager } from "./dynamic_content/current_draw_results_table.js";
import { CableFuseRatingResultsTableManager } from "./dynamic_content/cable_fuse_rating_results_table.js";
import { ProtectiveEarthResistanceTableManager } from "./dynamic_content/protective_earth_resistance_results_table.js";

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

  const inputResultsManager = new InputResultsTableManager()
  inputResultsManager.populateTable(power, voltage, csa, inrush, fuse, plugType, cableLength)
  
  const currentDraw = calculateDeviceCurrentDraw(power, voltage)
  const currentDrawResultsContentManager = new CurrentDrawResultsTableManager()
  currentDrawResultsContentManager.populateTable(currentDraw, fuse)

  const fuseRatingOfCable = calculateFuseRating(csa, plugType, inrush, cableLength)
  const cableFuseRatingResultsTableManager = new CableFuseRatingResultsTableManager()
  cableFuseRatingResultsTableManager.populateTable(csa, inrush, plugType, fuseRatingOfCable, fuse)

  const cableResistance = calculateResistanceOfCable(csa, cableLength)
  const protectiveEarthResistanceTableManager = new ProtectiveEarthResistanceTableManager()
  protectiveEarthResistanceTableManager.populateTable(csa, cableLength, cableResistance)
}

function main() {
  calculatorProcessData()

  // Hide the new page (so that refreshes reload the homepage)
  history.replaceState(null, "", "./")
}

window.addEventListener("load", () => main())


