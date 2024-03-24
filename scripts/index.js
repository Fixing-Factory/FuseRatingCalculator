import { AdvisoryInfoDialogManager } from "./dynamic_content/advisory_info_dialog.js";
import { CalculatorFormContentManager} from "./dynamic_content/input_form_content.js";

const formContentManager = new CalculatorFormContentManager()
const dialogManager = new AdvisoryInfoDialogManager()

function main() {
  formContentManager.initialiseForm()
  dialogManager.initialiseDialog()

  // Remove the question mark if navigating from the results page
  history.replaceState(null, "", "./")
}

main()