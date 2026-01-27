var appMainComputed = {
    youtubeId() {
        return this.YouTubeGetID(this.YouTubeURL)
    },
    thumbnailURL() {
        if (typeof (this.YouTubeURL) === 'string' && this.YouTubeURL.startsWith('data:image/')) {
            return this.YouTubeURL
        }
        else if (!this.youtubeId || this.youtubeId.startsWith('http')) {
            return this.YouTubeURL
        }
        else {
            return `https://i.ytimg.com/vi/${this.youtubeId}/maxresdefault.jpg`
        }
    },
    iconFilename() {
        try {
            let url = new URL(this.iconURL)
            // console.log(url)
            let { pathname } = url
            if (pathname.indexOf('/') > -1) {
                pathname = pathname.slice(pathname.lastIndexOf('/') + 1)
            }
            if (pathname.indexOf('.') > -1) {
                pathname = pathname.slice(0, pathname.lastIndexOf('.'))
            }

            return pathname
        }
        catch (e) {
            return ''
        }
    },
    filename() {
        return this.youtubeId +
            '-' + this.iconFilename +
            '-' + this.iconPosition + this.iconPaddingPercentage +
            '.png'
    },
    imgbbHTMLoutput() {
        if (this.imgbbHTML.indexOf('src="') === -1) {
            return ''
        }

        let pos1 = this.imgbbHTML.indexOf('src="') + 5
        let pos2 = this.imgbbHTML.indexOf('"', pos1 + 1)

        return this.imgbbHTML.slice(pos1, pos2)
    },
    validBase64String() {
        return (this.base64String.startsWith('data:image/'))
    },
    validBase64StringMain() {
        return (this.YouTubeURL.startsWith('data:image/'))
    },
    validBase64StringCorner() {
        return (this.iconURL.startsWith('data:image/'))
    },
}