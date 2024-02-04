export class CableFuseRatingResultsTableManager {
  constructor() {
    this.csaSelection = document.getElementById('csa-selection-cable-fuse-rating')
    this.plugSelection = document.getElementById('plug-selection-cable-fuse-rating')
    this.cableFuseRating = document.getElementById('cable-fuse-rating')
    this.fuseSelection = document.getElementById('fuse-selection-cable-fuse-rating')
  }

  populateTable(csa, inrush, plugSelection, cableFuseRating, fuseSelection) {
    this.csaSelection.innerHTML = this.generateCSAText(csa, inrush)
    this.plugSelection.innerHTML = `${plugSelection}`
    this.cableFuseRating.innerHTML = `${cableFuseRating}A`
    this.fuseSelection.innerHTML = `${fuseSelection}A`

    if (cableFuseRating < fuseSelection) {
      this.cableFuseRating.classList.add("highlight")
      this.fuseSelection.classList.add("highlight")
      this.fuseSelection.innerHTML += "!!!"
    }
  }

  generateCSAText(csa, inrush) {
    if (csa === "0.5" && inrush) {
      return `${csa}mm² inrush`
    } else {
      return `${csa}mm²`
    }
  }
}
