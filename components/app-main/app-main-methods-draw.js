var appMainMethodsDraw = {

    drawIconLazy() {
        clearTimeout(this.drawIconLazyTimer)
        this.drawIconLazyTimer = setTimeout(() => {
            this.drawIcon()
        }, 0)
    },
    clearIcon() {
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
        drawing.src = this.thumbnailURL;

        drawing.onload = () => {
            let { height, width } = drawing
            let resizedHeight = height
            let resizedWidth = width

            let widthWithPadding = Math.round(512 * (100 - this.iconPadding) / 100)
            let paddingWidth = Math.round((512 - widthWithPadding) / 2)

            let top = paddingWidth
            let left = paddingWidth

            if (this.fitImage === false) {
                if (resizedWidth > resizedHeight) {
                    resizedHeight = widthWithPadding
                    resizedWidth = resizedWidth * (resizedHeight / height)
                    let maxLeft = widthWithPadding - resizedWidth
                    left = maxLeft * (this.youtubeHorizontalPercentage / 100) + paddingWidth
                }
                else {
                    resizedWidth = widthWithPadding
                    resizedHeight = resizedHeight * (resizedWidth / width)
                    let max = widthWithPadding - resizedHeight
                    top = max * (this.youtubeHorizontalPercentage / 100) + paddingWidth
                }
            }
            else {
                if (resizedWidth < resizedHeight) {
                    resizedHeight = widthWithPadding
                    resizedWidth = resizedWidth * (resizedHeight / height)
                    let maxLeft = widthWithPadding - resizedWidth
                    left = Math.round(maxLeft / 2) + paddingWidth
                }
                else {
                    resizedWidth = widthWithPadding
                    resizedHeight = resizedHeight * (resizedWidth / width)
                    let max = widthWithPadding - resizedHeight
                    top = Math.round(max / 2) + paddingWidth
                }
            }

            if (this.setBackground) {
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.fillStyle = this.backgroundColor;
                let radius = Math.round((512 / 2) * this.backgroundCornerRound)
                ctx.roundRect(0, 0, 512, 512, radius);
                ctx.fill();
            }

            context.drawImage(drawing, left, top, resizedWidth, resizedHeight);

            if (this.iconHueRotateDegree !== 0 && this.iconHueRotateDegree !== 360) {
                context.filter = `hue-rotate(${this.iconHueRotateDegree}deg)`;
            }

            if (this.iconPosition !== 0) {
                drawMusicIcon()
            }
        }

        let drawMusicIcon = () => {
            let iconDrawing = new Image()
            iconDrawing.src = this.iconURL;
            iconDrawing.onload = () => {
                let { height, width } = iconDrawing
                let resizedHeight = height
                let resizedWidth = width
                let top = 0
                let left = 0

                // --- 新增：取得縮放參數 (預設 1) ---
                const sizeScale = this.iconSizeScale !== undefined ? Number(this.iconSizeScale) : 1;

                // 計算限制尺寸 (Base Limit)
                let limitSize = 256;
                if (this.iconPosition === 5) {
                    limitSize = 512 - (256 * (Number(this.iconPaddingPercentage) / 100))
                }

                // 套用 iconSizeScale
                limitSize = limitSize * sizeScale;

                // 縮放圖片本體尺寸
                if (resizedHeight > limitSize || resizedWidth > limitSize) {
                    if (resizedWidth > resizedHeight) {
                        resizedWidth = limitSize
                        resizedHeight = height * (limitSize / width)
                    } else {
                        resizedHeight = limitSize
                        resizedWidth = width * (resizedHeight / height)
                    }
                }

                // --- 調整坐標計算邏輯，確保縮放後位置依然正確 ---
                const paddingOffset = (128 * (Number(this.iconPaddingPercentage) / 100));

                // Y 軸位置 (Top)
                if ([7, 8, 9].indexOf(this.iconPosition) > -1) {
                    // 靠上
                    top = paddingOffset;
                } else if ([1, 2, 3].indexOf(this.iconPosition) > -1) {
                    // 靠下
                    top = 512 - resizedHeight - paddingOffset;
                } else {
                    // 垂直置中 (4, 5, 6)
                    top = (512 - resizedHeight) / 2;
                }

                // X 軸位置 (Left)
                if ([7, 4, 1].indexOf(this.iconPosition) > -1) {
                    // 靠左
                    left = paddingOffset;
                } else if ([9, 6, 3].indexOf(this.iconPosition) > -1) {
                    // 靠右
                    left = 512 - resizedWidth - paddingOffset;
                } else {
                    // 水平置中 (8, 5, 2)
                    left = (512 - resizedWidth) / 2;
                }

                // --- 繪製邊框邏輯 ---
                const borderWidth = this.iconBorderWidth || 0;
                const borderColor = this.iconBorderColor || '#FFFFFF';

                if (borderWidth > 0) {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = resizedWidth + borderWidth * 2;
                    tempCanvas.height = resizedHeight + borderWidth * 2;
                    const tempCtx = tempCanvas.getContext('2d');

                    tempCtx.drawImage(iconDrawing, borderWidth, borderWidth, resizedWidth, resizedHeight);
                    tempCtx.globalCompositeOperation = 'source-in';
                    tempCtx.fillStyle = borderColor;
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    context.save();
                    for (let angle = 0; angle < 360; angle += 45) {
                        const radians = (angle * Math.PI) / 180;
                        const x = left + Math.cos(radians) * borderWidth;
                        const y = top + Math.sin(radians) * borderWidth;
                        context.drawImage(tempCanvas, x - borderWidth, y - borderWidth);
                    }
                    context.restore();
                }

                // 繪製圖片本體
                context.drawImage(iconDrawing, left, top, resizedWidth, resizedHeight)
            }
        }
    },
    presetToIcon(url) {
        if (this.presetIconsToMain == true) {
            this.YouTubeURL = url
        }
        else {
            this.iconURL = url;
        }
    }
}