export class InputResultsTableManager {
  constructor() {
    this.powerInput = document.getElementById('power-selection')
    this.voltageInput = document.getElementById('voltage-selection')
    this.csaInput = document.getElementById('csa-selection')
    this.fuseInput = document.getElementById('fuse-selection')
    this.plugTypeInput = document.getElementById('plug-type-selection')
    this.cableLengthInput = document.getElementById('cable-length-selection')
  }

  populateTable(power, voltage, csa, inrush, fuse, plugType, cableLength) {
    this.powerInput.innerHTML = `${power}W`
    this.voltageInput.innerHTML = `${voltage}V`
    this.csaInput.innerHTML = this.generateCSAText(csa, inrush)
    this.fuseInput.innerHTML = `${fuse}A`
    this.plugTypeInput.innerHTML = plugType
    this.cableLengthInput.innerHTML = `${cableLength}m`
  }

  generateCSAText(csa, inrush) {
    if (csa === "0.5" && inrush) {
      return `${csa}mm² inrush`
    } else {
      return `${csa}mm²`
    }
  }
}
