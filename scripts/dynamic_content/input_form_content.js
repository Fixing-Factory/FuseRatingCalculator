export class CalculatorFormContentManager {
  constructor() {
    this.csaInput = document.getElementById('csa')
    this.inrushCurrentFormBox = document.getElementById('inrush-selection')
  }

  initialiseForm() {
    this.csaInput.addEventListener("change", () => { this.onCSAChange() })
  }

  onCSAChange() {
    switch (this.csaInput.value) {
      case "0.5": {
        this.inrushCurrentFormBox.classList.remove('disabled')
        break
      }
      default: {
        this.inrushCurrentFormBox.classList.add('disabled')
        break
      }
    }
  }
}
