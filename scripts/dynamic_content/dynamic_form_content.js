export class CalculatorFormContentManager {
  constructor() {
    this.csaInput = document.getElementById('csa')
    this.inrushCurrentFormBox = document.getElementById('inrush-selection')
    this.formFieldset = document.getElementById('calculator-form-fields')
    this.formSubmitButton = document.getElementById('calculator-form-submit')
    this.resetButton = document.getElementById('calculator-form-reset')
    this.output = document.getElementById('outcome')
  }

  initialiseForm() {
    this.csaInput.addEventListener("change", () => { this.onCSAChange() })
    this.resetButton.addEventListener("click", () => { this.onReset() })
  }

  onCSAChange() {
    switch (this.csaInput.value) {
      case "0.5": {
        this.inrushCurrentFormBox.classList.remove('disabled')
        break
      }
      case "0.75": {
        this.inrushCurrentFormBox.classList.add('disabled')
        break
      }
      default: {
        this.inrushCurrentFormBox.classList.add('disabled')
        break
      }
    }
  }

  onSubmit() {
    this.disableForm()
    this.displayReset()
  }

  onReset() {
    this.enableForm()
    this.hideReset()
    this.clearOutcome()
  }

  clearOutcome() {
    this.output.innerText = ""
  }

  disableForm() {
    this.formFieldset.setAttribute("disabled", true)
  }

  enableForm() {
    this.formFieldset.removeAttribute("disabled")
  }

  displayReset() {
    this.resetButton.classList.remove('disabled')
  }

  hideReset() {
    this.resetButton.classList.add('disabled')
  }
}
