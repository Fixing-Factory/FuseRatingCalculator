import { fuseRatingTable } from "./fuse_rating_table.js"

const POWER_RATING_MARGIN_OF_ERROR = 0.1 // 10% margin of error for power ratings
const AC_LOWER_SUPPLY_VOLTAGE = 230 * 0.94 // 230V minus 6% - needed to estimate maximum current draw from appliance

function calculatorFormSubmit(event) {
    // Implicitly raises a "formdata" event (so we can actually read the data and use it!)
    new FormData(event.target);

    // Suppresses the default form behaviour of directing to a new page on page submit
    event.preventDefault()
}

function calculatorProcessData(event) {
    const data = event.formData;

    const power = data.get("power")
    const csa = data.get("csa")
    const fuse = parseInt(data.get("fuse"))
    const plug = data.get("plug")


    const powerUpperBound = power * (1.0 + POWER_RATING_MARGIN_OF_ERROR)

    const maximumPotentialCurrentDraw = powerUpperBound / AC_LOWER_SUPPLY_VOLTAGE
    const roundedMaxCurrentDrawString = maximumPotentialCurrentDraw.toLocaleString(
        "en-GB", 
        { 
            maximumFractionDigits: 2, 
            minimumFractionDigits: 2 
        }
    );

    let warningMessage = ""

    if (fuse < maximumPotentialCurrentDraw) {
        warningMessage += `
        Fuse rating too low for device! 
        Should be at least ${ roundedMaxCurrentDrawString }
        `
    }

    const fuseRatingOfCable = fuseRatingTable[csa][plug]

    if (fuse > fuseRatingOfCable) {
        warningMessage += `
        Fuse rating too high for the combination of flex/cable! 
        Should at most be ${ fuseRatingOfCable }
        `
    }
    
    if (warningMessage !== "") {
        generateDisplayMessage(warningMessage)
        return
    }

    const evaluationMessage = `
    No Concerns Flagged for this Combination 
    Max Amps of Device: ${ roundedMaxCurrentDrawString } 
    Fuse Rating of Cable & Plug: ${ fuseRatingOfCable }
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
}

main()