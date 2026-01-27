var appMainMethodsDraw = {

    drawIconLazy() {
        clearTimeout(this.drawIconLazyTimer)
        this.drawIconLazyTimer = setTimeout(() => {
            this.drawIcon()
        }, 0)
    },
    clearIcon() {
        // this.dataSave()
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height)
    },
    drawIcon() {
        this.dataSave()
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height)

        let drawing = new Image();
        // drawing.crossOrigin = 'Anonymous';
        drawing.src = this.thumbnailURL; // can also be a remote URL e.g. http://
        // console.log(drawing.src);

        drawing.onload = () => {
            let { height, width } = drawing
            let resizedHeight = height
            let resizedWidth = width
            // if (resizedWidth > 512) {
            //   resizedWidth = 512
            //   resizedHeight = resizedHeight * (resizedWidth / width)
            //   top = (512 - resizedHeight) / 2
            // } 

            let widthWithPadding = Math.round(512 * (100 - this.iconPadding) / 100)
            let paddingWidth = Math.round((512 - widthWithPadding) / 2)


            let top = paddingWidth
            let left = paddingWidth

            if (this.fitImage === false) {
                if (resizedWidth > resizedHeight) {
                    // if (resizedHeight > 512) {
                    resizedHeight = widthWithPadding
                    resizedWidth = resizedWidth * (resizedHeight / height)
                    //left = (512 - resizedWidth) / 2

                    let maxLeft = widthWithPadding - resizedWidth
                    left = maxLeft * (this.youtubeHorizontalPercentage / 100) + paddingWidth
                    // } 
                }
                else {
                    // if (resizedWidth > 512) {
                    resizedWidth = widthWithPadding
                    resizedHeight = resizedHeight * (resizedWidth / width)
                    //left = (512 - resizedWidth) / 2


                    let max = widthWithPadding - resizedHeight
                    top = max * (this.youtubeHorizontalPercentage / 100) + paddingWidth
                    // } 
                }
            }
            else {
                if (resizedWidth < resizedHeight) {
                    // if (resizedHeight > 512) {
                    resizedHeight = widthWithPadding
                    resizedWidth = resizedWidth * (resizedHeight / height)
                    //left = (512 - resizedWidth) / 2

                    let maxLeft = widthWithPadding - resizedWidth
                    left = Math.round(maxLeft / 2) + paddingWidth
                    // } 
                }
                else {
                    // if (resizedWidth > 512) {
                    resizedWidth = widthWithPadding
                    resizedHeight = resizedHeight * (resizedWidth / width)
                    //left = (512 - resizedWidth) / 2


                    let max = widthWithPadding - resizedHeight
                    top = Math.round(max / 2) + paddingWidth
                    // } 
                }
            }
            //console.log(left, top, resizedWidth, resizedHeight)

            if (this.setBackground) {
                // context.drawImage(drawing, left, top, resizedWidth, resizedHeight);  
                // canvas.roundRectangle(0, 0, 512, 512, 30)
                // canvas.fillRect(0,0,512,512)

                let ctx = canvas.getContext('2d');
                // ctx.restore();
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                // alert('清除了沒？')
                ctx.fillStyle = this.backgroundColor;
                let radius = Math.round((512 / 2) * this.backgroundCornerRound)
                // console.log(radius)
                ctx.roundRect(0, 0, 512, 512, radius);
                ctx.fill();
                // ctx.save();

                // alert('畫上去了喔')
            }

            context.drawImage(drawing, left, top, resizedWidth, resizedHeight);

            if (this.iconHueRotateDegree !== 0 && this.iconHueRotateDegree !== 360) {
                context.filter = `hue-rotate(${this.iconHueRotateDegree}deg)`;
            }


            if (this.iconPosition !== 0) {
                drawMusicIcon()
            }

            //console.log('go')
        }

        let drawMusicIcon = () => {
            let iconDrawing = new Image()
            // iconDrawing.crossOrigin = 'Anonymous';
            iconDrawing.src = this.iconURL; // can also be a remote URL e.g. http://
            iconDrawing.width = 512
            iconDrawing.height = 512
            iconDrawing.onload = () => {
                let { height, width } = iconDrawing
                let resizedHeight = height
                let resizedWidth = width
                let top = 0
                let left = 0
                // if (resizedWidth > 512) {
                //   resizedWidth = 512
                //   resizedHeight = resizedHeight * (resizedWidth / width)
                //   top = (512 - resizedHeight) / 2
                // } 

                if (this.iconPosition === 5) {
                    // console.log(this.iconPaddingPercentage)
                    let limitSize = 512 - (256 * (Number(this.iconPaddingPercentage) / 100))
                    // console.log(limitSize)
                    if (resizedHeight > limitSize) {
                        resizedHeight = limitSize
                        resizedWidth = resizedWidth * (resizedHeight / height)
                    }

                    left = (512 - resizedWidth) / 2
                    top = (512 - resizedHeight) / 2
                }
                else {
                    let limitSize = 256
                    if (resizedHeight > limitSize) {
                        resizedHeight = limitSize
                        resizedWidth = resizedWidth * (resizedHeight / height)
                    }
                }

                if ([7, 8, 9].indexOf(this.iconPosition) > -1) {
                    top = (128 * (Number(this.iconPaddingPercentage) / 100))
                }
                if ([1, 2, 3].indexOf(this.iconPosition) > -1) {
                    top = 256 - (128 * (Number(this.iconPaddingPercentage) / 100))
                }

                if ([7, 4, 1].indexOf(this.iconPosition) > -1) {
                    left = (128 * (Number(this.iconPaddingPercentage) / 100))
                }
                if ([9, 6, 3].indexOf(this.iconPosition) > -1) {
                    left = 256 - (128 * (Number(this.iconPaddingPercentage) / 100))
                }

                if ([8, 2].indexOf(this.iconPosition) > -1) {
                    left = 128
                }
                if ([4, 6].indexOf(this.iconPosition) > -1) {
                    top = 128
                }

                // --- 新增：繪製邊框邏輯 ---
                // 假設你有這兩個參數：this.iconBorderWidth (數字) 和 this.iconBorderColor (字串，如 "#FFFFFF")
                const borderWidth = this.iconBorderWidth || 4;
                const borderColor = this.iconBorderColor || '#FFFFFF';

                if (borderWidth > 0) {
                    // 1. 建立一個臨時 Canvas 來製作單色剪影
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = resizedWidth + borderWidth * 2;
                    tempCanvas.height = resizedHeight + borderWidth * 2;
                    const tempCtx = tempCanvas.getContext('2d');

                    // 2. 將圖片繪製到臨時 Canvas 中心
                    tempCtx.drawImage(iconDrawing, borderWidth, borderWidth, resizedWidth, resizedHeight);

                    // 3. 使用 source-in 模式將非透明區域填滿邊框顏色
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = borderColor;
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    // 4. 在主 Canvas 上以多個角度偏移繪製剪影，形成描邊效果
                    context.save();
                    // 這裡循環 8 個方向 (每 45 度一個)，如果邊框很粗，可以增加循環次數
                    for (let angle = 0; angle < 360; angle += 45) {
                        const radians = (angle * Math.PI) / 180;
                        const x = left + Math.cos(radians) * borderWidth;
                        const y = top + Math.sin(radians) * borderWidth;
                        // 繪製剪影（需要扣除 tempCanvas 內部的內距）
                        context.drawImage(tempCanvas, x - borderWidth, y - borderWidth);
                    }
                    context.restore();
                }

                // 繪製圖片本體
                context.drawImage(iconDrawing, left, top, resizedWidth, resizedHeight)
                // this.roundRect(context, 0, 0, 512, 512, 30)
                // this.canvaseBase64 = canvas.toDataURL('image/png')
                // console.log(this.canvaseBase64)

                // context.roundRect(20,20,80,80,[new DOMPoint(60,80), new DOMPoint(110,100)]);
                // context.strokeStyle = "green";
                // context.stroke();
            }
        }
    },

}