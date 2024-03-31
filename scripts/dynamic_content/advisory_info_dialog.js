const MIN_PAGE_NUMBER = 1
const MAX_PAGE_NUMBER = 2

export class AdvisoryInfoDialogManager {
  constructor() {
    this.infoIcon = document.getElementById('info-icon')
    this.closeButton = document.getElementById('close-dialog')
    this.pageForward = document.getElementById('page-forward')
    this.pageBack = document.getElementById('page-back')
    this.advisoryDialog = document.getElementById('advisory-dialog')
    this.currentPage = 1
  }

  initialiseDialog() {
    this.infoIcon.addEventListener("click", () => { this.onInfoButtonClick() })
    this.closeButton.addEventListener("click", () => { this.onCloseButtonClick() })
    this.pageForward.addEventListener("click", () => { this.onPageForwardClick() })
    this.pageBack.addEventListener("click", () => { this.onPageBackClick() })
  }

  onInfoButtonClick() {
    this.advisoryDialog.showModal()
  }

  onCloseButtonClick() {
    this.advisoryDialog.close()
  }

  onPageForwardClick() {
    let currentParagraph = document.getElementById(`dialog-page-${this.currentPage}`)
    currentParagraph.classList.add("disabled")

    if (this.currentPage === MIN_PAGE_NUMBER) {
      this.pageBack.classList.remove("disabled")
    }

    this.currentPage += 1
    currentParagraph = document.getElementById(`dialog-page-${this.currentPage}`)
    currentParagraph.classList.remove("disabled")

    if (this.currentPage === MAX_PAGE_NUMBER) {
      this.pageForward.classList.add("disabled")
    }
  }

  onPageBackClick() {
    let currentParagraph = document.getElementById(`dialog-page-${this.currentPage}`)
    currentParagraph.classList.add("disabled")

    if (this.currentPage === MAX_PAGE_NUMBER) {
      this.pageForward.classList.remove("disabled")
    }

    this.currentPage -= 1
    currentParagraph = document.getElementById(`dialog-page-${this.currentPage}`)
    currentParagraph.classList.remove("disabled")

    if (this.currentPage === MIN_PAGE_NUMBER) {
      this.pageBack.classList.add("disabled")
    }
  }
}
