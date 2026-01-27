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

        data = JSON.stringify(data)
        localStorage.setItem(this.cacheKey, data)
    },

    scrollToTop() {
        window.scrollTo(0, 0)
    },
}