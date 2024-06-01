import { fuseList } from "../data_tables/fuse_list.js"
import { roundNumber as roundToDecimalPlaces } from "../formatters/number_rouder.js";

export class CurrentDrawResultsTableManager {
  constructor() {
    this.currentDraw = document.getElementById('current-draw')
    this.fuseSelection = document.getElementById('fuse-selection-current-draw')
    this.minimumFuseCurrentDraw = document.getElementById('minimum-fuse-current-draw')
  }

  populateTable(currentDraw, fuseSelection, targetFuseExemption) {
    const roundedCurrentDrawString = roundToDecimalPlaces(currentDraw, 2)
    this.currentDraw.innerHTML = `${roundedCurrentDrawString}A`
    this.fuseSelection.innerHTML = `${fuseSelection}A`
    this.minimumFuseCurrentDraw.innerHTML = targetFuseExemption || this.pickMinViableFuse(currentDraw)

    if ((currentDraw > fuseSelection) && !targetFuseExemption) {
      this.minimumFuseCurrentDraw.classList.add("highlight")
      this.fuseSelection.classList.add("highlight")
      this.fuseSelection.innerHTML += "!!!"
    }
  }

  pickMinViableFuse(currentDraw) {
    const targetFuse = fuseList.find((fuse) => currentDraw < fuse)

    if (targetFuse) {
      return `${targetFuse}A`
    } else {
      return "Too High for a Fuse!"
    }
  }
}
