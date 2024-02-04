import { CalculatorFormContentManager} from "./dynamic_content/input_form_content.js";

const formContentManager = new CalculatorFormContentManager()

function main() {
  formContentManager.initialiseForm()

  // Remove the question mark if navigating from the results page
  window.history.replaceState(null, "", "./")
}

main()