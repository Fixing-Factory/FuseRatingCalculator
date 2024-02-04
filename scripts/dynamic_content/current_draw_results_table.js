import { fuseList } from "../data_tables/fuse_list.js"
import { roundNumber as roundToDecimalPlaces } from "../formatters/number_rouder.js";

export class CurrentDrawResultsTableManager {
  constructor() {
    this.currentDraw = document.getElementById('current-draw')
    this.fuseSelection = document.getElementById('fuse-selection-current-draw')
    this.minimumFuseCurrentDraw = document.getElementById('minimum-fuse-current-draw')
  }

  populateTable(currentDraw, fuseSelection) {
    const roundedCurrentDrawString = roundToDecimalPlaces(currentDraw, 2)
    this.currentDraw.innerHTML = `${roundedCurrentDrawString}A`
    this.fuseSelection.innerHTML = `${fuseSelection}A`
    this.minimumFuseCurrentDraw.innerHTML = `${this.pickMinViableFuse(currentDraw)}A`
  }

  pickMinViableFuse(currentDraw) {
    return fuseList.find((fuse) => currentDraw < fuse)
  }
}
