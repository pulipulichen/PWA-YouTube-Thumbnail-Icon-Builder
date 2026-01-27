var appMainMounted = function () {
    this.dataLoad()
    this.initDropdown()

    this.inited = true

    setTimeout(() => {
      this.drawIcon()
    }, 500)

    setTimeout(() => {
      this.scrollToTop()
    }, 4000)
}