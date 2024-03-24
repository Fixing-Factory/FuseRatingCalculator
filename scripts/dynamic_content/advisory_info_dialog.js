export class AdvisoryInfoDialogManager {
  constructor() {
    this.infoIcon = document.getElementById('info-icon')
    this.advisoryDialog = document.getElementById('advisory-dialog')
  }

  initialiseDialog() {
    this.infoIcon.addEventListener("click", () => { this.onInfoButtonClick() })
  }

  onInfoButtonClick() {
    if (this.advisoryDialog.open) {
      this.advisoryDialog.close()
    } else{
      this.advisoryDialog.show()
    }
  }
}
