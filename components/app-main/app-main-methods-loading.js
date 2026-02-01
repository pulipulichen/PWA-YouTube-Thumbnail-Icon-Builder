var appMainMethodsLoading = {
    dataLoad() {
        let projectFileListData = localStorage.getItem(this.cacheKey)
        if (!projectFileListData) {
            return false
        }

        projectFileListData = JSON.parse(projectFileListData)
        for (let key in projectFileListData) {
            this[key] = projectFileListData[key]
        }
    },
    dataSave() {
        if (this.inited === false) {
            return false
        }

        let keys = this.cacheAttrs

        let data = {}
        keys.forEach(key => {
            data[key] = this[key]
        })

        let dataString = JSON.stringify(data)
        try {
            localStorage.setItem(this.cacheKey, dataString)
        } catch (e) {
            if (this.isQuotaExceeded(e)) {
                console.warn('Storage quota exceeded, attempt to shrink data...')
                if (this.dataShrink()) {
                    this.dataSave()
                }
            } else {
                throw e
            }
        }
    },
    isQuotaExceeded(e) {
        let quotaExceeded = false
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true
                        break
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true
                        }
                        break
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true
            }
        }
        return quotaExceeded
    },
    dataShrink() {
        let shrunk = false

        if (this.HistoryYouTubeURL && this.HistoryYouTubeURL.length > 1) {
            this.HistoryYouTubeURL.pop()
            shrunk = true
        } else if (this.HistoryIconURL && this.HistoryIconURL.length > 1) {
            this.HistoryIconURL.pop()
            shrunk = true
        } else if (this.base64String && this.base64String !== '') {
            this.base64String = ''
            shrunk = true
        }

        return shrunk
    },

    scrollToTop() {
        window.scrollTo(0, 0)
    },
}