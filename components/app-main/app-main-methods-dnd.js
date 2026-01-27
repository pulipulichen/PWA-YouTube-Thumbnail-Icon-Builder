var appMainMethodsDnD = {

    initDropdown() {
        window.addEventListener('dragstart', () => {
            // console.log('dragstart')
            this.isDragFromWindow = true
        })

        window.addEventListener('dragenter', () => {
            // console.log('dragenter')
            if (this.isDragFromWindow === false) {
                this.isDragging = true
            }
        })

        // window.addEventListener('mouseleave', () => {
        //   console.log('mouseleave')
        //   this.isDragging = false
        // })

        // window.addEventListener('dragleave', () => {
        //   console.log('dragleave')
        //   this.isDragging = false
        // })

        window.addEventListener('dragend', () => {
            // console.log('dragend')
            this.isDragFromWindow = false
        })

        // console.log('okkk')

        document.body.addEventListener('dragover', (ev) => {
            ev.preventDefault();
        })

        document.body.addEventListener('dragenter', (ev) => {
            ev.preventDefault();
        })

        document.body.addEventListener('drop', (ev) => {
            ev.preventDefault();
            // console.log('okkk')
            let blob = ev.dataTransfer.items[0].getAsFile()
            // console.log(result)
            var URLObj = window.URL || window.webkitURL;
            let url = URLObj.createObjectURL(blob);

            var xhr = new XMLHttpRequest();
            xhr.onload = () => {
                var reader = new FileReader();
                reader.onloadend = () => {
                    // this.YouTubeURL = reader.result
                    this.base64String = reader.result
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
            // this.paste_createImage(source);
        })
    },

    setAsMainIcon() {
        this.YouTubeURL = this.base64String
    },

    setAsCornerIcon() {
        this.iconURL = this.base64String
    },

}