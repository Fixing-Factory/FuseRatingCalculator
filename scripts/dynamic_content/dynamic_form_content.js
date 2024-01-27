export function setupDynamicFormBehaviour() {
  const csaInput = document.getElementById('csa')
  const inrushCurrentFormBox = document.getElementById('inrush-selection')

  function onCSAChange() {
    switch (csaInput.value) {
      case "0.5": {
        inrushCurrentFormBox.classList.remove('disabled')
        break
      }
      case "0.75": {
        inrushCurrentFormBox.classList.add('disabled')
        break
      }
      default: {
        inrushCurrentFormBox.classList.add('disabled')
        break
      }
    }
  }

  csaInput.addEventListener("change", onCSAChange)
}
