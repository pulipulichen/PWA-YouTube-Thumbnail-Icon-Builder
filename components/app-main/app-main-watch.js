var appMainWatch = {
    thumbnailURL() {
        // this.clearIcon()
        this.drawIconLazy()

        let url = this.YouTubeURL
        if (this.HistoryYouTubeURL.indexOf(url) === -1) {
            this.HistoryYouTubeURL.unshift(url)

            if (this.HistoryYouTubeURL.length > 10) {
                this.HistoryYouTubeURL = this.HistoryYouTubeURL.slice(0, 10)
            }
        }
        else {
            this.HistoryYouTubeURL = this.HistoryYouTubeURL.filter(item => item !== url)
            this.HistoryYouTubeURL.unshift(url)
        }
    },
    iconURL(url) {
        // this.clearIcon()
        this.drawIconLazy()

        if (this.presetIcons.indexOf(url) > -1) {
            return false
        }

        if (this.HistoryIconURL.indexOf(url) === -1) {
            this.HistoryIconURL.unshift(url)

            if (this.HistoryIconURL.length > 10) {
                this.HistoryIconURL = this.HistoryIconURL.slice(0, 10)
            }
        }
        else {
            this.HistoryIconURL = this.HistoryIconURL.filter(item => item !== url)
            this.HistoryIconURL.unshift(url)
        }
    },
    iconPaddingPercentage() {
        this.drawIconLazy()
    },
    iconPosition() {
        this.drawIconLazy()
    },
    fitImage() {
        this.drawIconLazy()
    },
    setBackground() {
        this.drawIconLazy()
    },
    backgroundCornerRound() {
        this.drawIconLazy()
    },
    iconPadding() {
        this.drawIconLazy()
    },
    backgroundColor() {
        this.drawIconLazy()
    },
    youtubeHorizontalPercentage() {
        this.drawIconLazy()
    },

    youtubeHueRotateDegree() {
        this.drawIconLazy()
    },
    iconHueRotateDegree() {
        this.drawIconLazy()
    },
    iconBorderWidth() {
        this.drawIconLazy()
    },
    iconBorderColor() {
        this.drawIconLazy()
    },

    selectHistoryYouTubeURL(url) {
        if (url === '') {
            return false
        }

        this.YouTubeURL = url
        this.selectHistoryYouTubeURL = ''
    },
    selectHistoryIconURL(url) {
        if (url === '') {
            return false
        }

        this.iconURL = url
        this.selectHistoryIconURL = ''
    },
}