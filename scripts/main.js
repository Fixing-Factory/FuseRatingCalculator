import { setupDynamicFormBehaviour } from "./dynamic_content/dynamic_form_content.js";
import { fuseRatingTable } from "./fuse_rating_table.js"

function calculatorFormSubmit(event) {
    // Implicitly raises a "formdata" event (so we can actually read the data and use it!)
    new FormData(event.target);

    // Suppresses the default form behaviour of directing to a new page on page submit
    event.preventDefault()
}

function calculatorProcessData(event) {
    const data = event.formData;

    const power = data.get("power")
    const voltage = parseInt(data.get("voltage"))
    const inrush = data.get("inrush")
    const short_lead = data.get("short-lead")
    const csa = data.get("csa")
    const fuse = parseInt(data.get("fuse"))
    const plug = data.get("plug")


    const currentDraw = power / voltage
    const roundedCurrentDrawString = currentDraw.toLocaleString(
        "en-GB",
        {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }
    );

    let warningMessage = ""

    if (fuse < currentDraw) {
        warningMessage +=
            `Fuse rating too low for device! 
        Should be at least ${roundedCurrentDrawString}
        `
    }

    let fuseRatingOfCable = fuseRatingTable[csa]["standard"][plug]

    if (csa === "0.5" && inrush) {
        fuseRatingOfCable = fuseRatingTable[csa]["inrush"][plug]
    }

    if (csa === "0.75" && short_lead) {
        fuseRatingOfCable = fuseRatingTable[csa]["short_lead"][plug]
    }

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

    const evaluationMessage =
        `No Concerns Flagged for this Combination 
    Max Amps of Device: ${roundedCurrentDrawString} 
    Fuse Rating of Cable & Plug: ${fuseRatingOfCable}
    `


    generateDisplayMessage(evaluationMessage)
}

function generateDisplayMessage(message) {
    const outputElement = document.getElementById('outcome')

    outputElement.innerText = message
}

function main() {
    const calculatorForm = document.getElementById('calculator-form')
    calculatorForm.addEventListener('submit', calculatorFormSubmit)
    calculatorForm.addEventListener('formdata', calculatorProcessData)
    setupDynamicFormBehaviour()
}

main()