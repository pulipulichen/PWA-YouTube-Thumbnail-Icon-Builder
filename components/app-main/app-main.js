/* global ClipboardUtils */

let appMain = {
  data () {
    
    
    
    return {
      cacheKey: 'YouTube-Thumbnail-Icon',
      cacheAttrs: ['YouTubeURL', 'HistoryYouTubeURL', 'iconURL', 'setBackground', 'iconPadding', 'backgroundCornerRound', 'backgroundColor', 'fitImage', 'HistoryIconURL', 'youtubeHorizontalPercentage', 'youtubeHueRotateDegree', 'iconHueRotateDegree', 'iconPaddingPercentage', 'iconPosition'],
      init: false,
      
      YouTubeURL: 'https://youtu.be/vXCB1zGGFiY',
      iconURL: 'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',

      youtubeHorizontalPercentage: 50,
      iconPaddingPercentage: 0,
      iconPosition: 3,
      iconPositionList: [7,8,9,4,5,6,1,2,3],
      canvaseBase64: '',
      drawIconLazyTimer: null,

      youtubeHueRotateDegree: 0,
      iconHueRotateDegree: 0,
      fitImage: false,
      iconPadding: 0,

      setBackground: false,
      backgroundCornerRound: 0.3,
      backgroundColor: 'white',

      HistoryYouTubeURL: [],
      HistoryIconURL: [],

      selectHistoryYouTubeURL: ``,
      selectHistoryIconURL: ``,

      presetIcons: [
        'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',
        'https://cdn-icons-png.flaticon.com/512/3293/3293810.png',
        'https://cdn-icons-png.flaticon.com/512/3293/3293822.png',
        'https://cdn.iconscout.com/icon/free/png-256/logo-127-116266.png',
        'https://blogger.googleusercontent.com/img/a/AVvXsEjTPFZczYG4fmpoPDVISoxJZ_xNOLCDXm-pryNsS7igZ3mrZP9I654mf3hmqiuXBw6xW_G_m24RlsoddwnUM7XZ8YTEAGf_u0iM4RaXPr6LCk_r7iwF34LfDpbk3akuDLU-I1muTD-OtAlR0OdF9q1ppa-n8admztfrBsc2EPTjq8r5I0RATqI',
        'https://lh3.googleusercontent.com/-f6XuWkPsrEk/Ycq9X8RiDuI/AAAAAAAFEVQ/BYUhx02M45UMVbt3LpwvHUdBP8t-WiVjQCNcBGAsYHQ/s1600/slides-icon-6-yellow.jpg',
        'https://lh3.googleusercontent.com/-KggvrRwyGXA/YVk8ocMehyI/AAAAAAAFBpI/beeiCgBqKQQL6RVG-8DCV6-2D-afb6J0ACLcBGAsYHQ/s1600/sheet-blue-Alecive-Flatwoken-Apps-Google-Drive-Forms.png',
        'https://lh3.googleusercontent.com/-3VWx8YodNfU/YcrAMBrI0bI/AAAAAAAFEWA/xw13o-kGx5Mq2eh_XXNZZn85zPmCYcWoACNcBGAsYHQ/s1600/google-drive-docs-blue.png',
        
        // gitmind
        'https://blogger.googleusercontent.com/img/a/AVvXsEg7qmOiY-BpThdQyDICyJX6ow9vvyMhA0Ni-IKV0EogcElC7rfLiIU2pZDX1LqPhyo1UcGs6cbYDljBhmWrTC2aoM_5ntjQ0LvzWfvAvTdV4NHesgCD-Zfo4R02AxrHb-JofeZ-3IHckUoVRdIDYqjTntJDn6jax85FgAyuapWz2ZtQBEH94u0',

        // koha
        'https://blogger.googleusercontent.com/img/a/AVvXsEjXTYuZEyZm_TWDzcl-tyKwz7EQC1jBv6uO3VAVJEb9TkXKL_V3Vbk6eINetsWetrgtDXq2vY3U9tRcj_mnHxuOOPGICoPKQr9mBtcVlyAcN1hnsPCABnAKN7DYQxOscJAj-jIq2caJjKPxbTdSG1MN3hbRjU8DvEkqOVG22U5iFrnLYNHX1v0',

        // letters
        'https://blogger.googleusercontent.com/img/a/AVvXsEh6z_USX241_RnMqb86RSHQ53Ph1EVwklcEPSqmyNygh_ft0VVYvWTtrB7ICbyRzL6-D0qbvziWThvojG2iSTtFATBK6rEX6gSiWzlHx8zz7ZgreBkIMKOmyJ6afH64VWEtnbYJqITfKVifhmGj7vQXPCtlIT1tKSUK2B0h4VgoAECkl669hsI',
        'https://blogger.googleusercontent.com/img/a/AVvXsEgz9_9UUcpiyuYwm_FIrSnrlfq09Llw2sPxP4Pp2bdL3BJISbgw72xOCD1dS-iF3fNWybnhNcXtGIjQAifVRbL4k3N2OBJQRGL33RiSc2afBy4hNtWTTepj0fk8kL65zN3yMfsWoci8CwKaRu_z2R3jlY5Bp7VN4xkwP-ENzXnDb-xuhTjWV5I',

        // folder
        'https://blogger.googleusercontent.com/img/a/AVvXsEhAfwdBxjcTbZIgQSQRNds-2GqmqZX9AGTPSi64I5u_F0JnWezuxXQnCI4ZX7kjdmWpD-vnsje6FxPF_4dg_896peNBKot8QAHDD1cK2CV5fs_Sl4gHyNDv3RC9TlI7Tm298vOtWHbUllanBGaS0b8pJYUVidGsydO2MiPMXz_phTTdiZFJgzQ',
        'https://cdn-icons-png.flaticon.com/512/8743/8743947.png',
        'https://cdn-icons-png.flaticon.com/512/4848/4848214.png',
        'https://cdn-icons-png.flaticon.com/512/9196/9196262.png',

        // checkbox
        'https://cdn-icons-png.flaticon.com/512/5583/5583108.png',

        // blogger
        'https://cdn-icons-png.flaticon.com/512/2673/2673669.png',
        'https://lh3.googleusercontent.com/-vjf_alp-zjQ/VvtkKVpqCjI/AAAAAAACuMI/HPJXcEemwok/s0/pulipuli144x144.jpg',
        'https://blogger.googleusercontent.com/img/a/AVvXsEhS3QuNpqvl-zTxxT6PVc5tbXB2nh3JIFp2vDTdkqeaMZ8l-WtaULRRoBN_bp1X5EjzY8OIBvAjjIo4SEOfvqBLGExNKtnbhwQ3GUp_VrBaMgYWQS2pTwgMj5KlulfPEKwAHkpSkmk-GmgxhJEo1-CXXef9HOFmZGfzGLWjZy24R4BxUjSvqwLLFA',

        // app
        'https://blogger.googleusercontent.com/img/a/AVvXsEjarTUjitObYQtqr6jZs6lekhlA5qBOffvY99TzUg5PaUuWBx0EABtpbXcsAd5lqsBqVP0p6m0H4cFOwkKiQi-vLh3FOnvcuKwaUdhqDkox-yW1tKdwxesMxtLUwJqfkIkDQVK3_dHEJ_ZPs87jznz82plyDLGVLBl7b2yNdRbfFFlROcD0j6ohGQ',
        'https://blogger.googleusercontent.com/img/a/AVvXsEiPn2_SmHaq2kygPzBc1aPfXYfrXUb-_i5JhbN0fUcdt8zCCe3WQmxXdAoa3fihxGdWVtPB4v77Wkvn59B7lyZM1IowLLJyTgxZl-HRQac5FX1tg1zgeMK05iHvyeYjNm259TBf3J9THsEnecNXmcnFVSkIVMkLxIWatomV6M7dcR9R9-U5iJSqWg',

        // internet
        'https://blogger.googleusercontent.com/img/a/AVvXsEhMI_ZRAvOK8rueF9iwlv5KhWI_yRq1hY79PtvvG1TcG7y6hKSQaymaWlXtaP51yn4pQ1FYtijYojKTo5AGarNhgT7vCp0FNn2bDI7wNaZDOS0GW8P2b02W_9Rfr2wW3VURxDU4cRzh6R5Tgik37FBpTLq9V1IHR57ialr4pw-S0A3ifoJBNywbhQ',

        // note,
        'https://i.ibb.co/VJqcJnD/planning.png',
        'https://blogger.googleusercontent.com/img/a/AVvXsEjTu4JTjJibJwcXzNDnfqeEPF1PxmKlUHJjH2A_Ap7oL-0jUUysbiERYGMbbF1_aMZblWRTA4Ki3J365x-2o1qfbY5mPbSmUQq5IAHXu8Y0Uz1Sk_rLDXMOalH_SMd1uDMqBl0pFduLFSpQiMUBf5kz1Ax1eS3L-ZTzXZlqr5ZGPcvINzStsMQ',
        
        // clean
        'https://i.ibb.co/tZtVLNV/clean.png',
      ],

      imgbbHTML: '',
      
    }
  },
  mounted () {
    this.dataLoad()
    this.initDropdown()
    
    this.inited = true

    setTimeout(() => {
      this.drawIcon()
    }, 500)
  },
  computed: {
    youtubeId () {
      return this.YouTubeGetID(this.YouTubeURL)
    },
    thumbnailURL () {
      if (typeof(this.YouTubeURL) === 'string' && this.YouTubeURL.startsWith('data:image/')) {
        return this.YouTubeURL
      }
      else if (!this.youtubeId || this.youtubeId.startsWith('http')) {
        return this.YouTubeURL
      }
      else {
        return `https://i.ytimg.com/vi/${this.youtubeId}/maxresdefault.jpg`
      }
    },
    iconFilename () {
      try {
        let url = new URL(this.iconURL)
        // console.log(url)
        let {pathname} = url
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
    filename () {
      return this.youtubeId + 
        '-' + this.iconFilename + 
        '-' + this.iconPosition + this.iconPaddingPercentage +
        '.png'
    },
    imgbbHTMLoutput () {
      if (this.imgbbHTML.indexOf('src="') === -1) {
        return ''
      }

      let pos1 = this.imgbbHTML.indexOf('src="') + 5
      let pos2 = this.imgbbHTML.indexOf('"', pos1 + 1)

      return this.imgbbHTML.slice(pos1, pos2)
    }
  },
  watch: {
    thumbnailURL () {
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
    iconURL (url) {
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
    iconPaddingPercentage () {
      this.drawIconLazy()
    },
    iconPosition () {
      this.drawIconLazy()
    },
    fitImage () {
      this.drawIconLazy()
    },
    setBackground () {
      this.drawIconLazy()
    },
    backgroundCornerRound () {
      this.drawIconLazy()
    },
    iconPadding () {
      this.drawIconLazy()
    },
    backgroundColor () {
      this.drawIconLazy()
    },
    youtubeHorizontalPercentage () {
      this.drawIconLazy()
    },

    youtubeHueRotateDegree () {
      this.drawIconLazy()
    },
    iconHueRotateDegree () {
      this.drawIconLazy()
    },

    selectHistoryYouTubeURL (url) {
      if (url === '') {
        return false
      }

      this.YouTubeURL = url
      this.selectHistoryYouTubeURL = ''
    },
    selectHistoryIconURL (url) {
      if (url === '') {
        return false
      }

      this.iconURL = url
      this.selectHistoryIconURL = ''
    }
  },
  methods: {
    dataLoad () {
      let projectFileListData = localStorage.getItem(this.cacheKey)
      if (!projectFileListData) {
        return false
      }
      
      projectFileListData = JSON.parse(projectFileListData)
      for (let key in projectFileListData) {
        this[key] = projectFileListData[key]
      }
    },
    dataSave () {
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

    YouTubeGetID: function (url){
      var ID = '';
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      }
      else {
        ID = url;
        ID = ID[0];
      }
      return ID;
    },
    drawIconLazy () {
      clearTimeout(this.drawIconLazyTimer)
      this.drawIconLazyTimer = setTimeout(() => {
        this.drawIcon()
      }, 0)
    },
    clearIcon () {
      // this.dataSave()
      let canvas=document.getElementById("canvas");
      let context=canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height)
    },
    drawIcon () {
      this.dataSave()
      let canvas=document.getElementById("canvas");
      let context=canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height)

      let drawing = new Image();
      drawing.src = this.thumbnailURL; // can also be a remote URL e.g. http://
      // console.log(drawing.src);

      drawing.onload = () => {
        let {height, width} = drawing
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
        iconDrawing.src = this.iconURL; // can also be a remote URL e.g. http://
        iconDrawing.width = 512
        iconDrawing.height = 512
        iconDrawing.onload = () => {
          let {height, width} = iconDrawing
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

          if ([7,8,9].indexOf(this.iconPosition) > -1) {
            top = (128 * (Number(this.iconPaddingPercentage) / 100))
          }
          if ([1,2,3].indexOf(this.iconPosition) > -1) {
            top = 256 - (128 * (Number(this.iconPaddingPercentage) / 100))
          }

          if ([7,4,1].indexOf(this.iconPosition) > -1) {
            left = (128 * (Number(this.iconPaddingPercentage) / 100))
          }
          if ([9,6,3].indexOf(this.iconPosition) > -1) {
            left = 256 - (128 * (Number(this.iconPaddingPercentage) / 100))
          }

          if ([8,2].indexOf(this.iconPosition) > -1) {
            left = 128
          }
          if ([4,6].indexOf(this.iconPosition) > -1) {
            top = 128
          }

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
    roundRect(ctx, x, y, width, height, radius) {
      if (typeof radius === "undefined") {
        radius = 5;
      }
      if (typeof radius === "number") {
        radius = {
          tl: radius,
          tr: radius,
          br: radius,
          bl: radius
        };
      } else {
        var defaultRadius = {
          tl: 0,
          tr: 0,
          br: 0,
          bl: 0
        };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();

      ctx.clip();
      ctx.clearRect(0, 0, 512, 512);
      ctx.save();
    },
    hueRotate(rotation) {
      rotation = (rotation || 0) / 180 * Math.PI;
      var cosR = Math.cos(rotation),
        sinR = Math.sin(rotation),
        sqrt = Math.sqrt;
    
      var w = 1 / 3,
        sqrW = sqrt(w);
      var a00 = cosR + (1.0 - cosR) * w;
      var a01 = w * (1.0 - cosR) - sqrW * sinR;
      var a02 = w * (1.0 - cosR) + sqrW * sinR;
      var a10 = w * (1.0 - cosR) + sqrW * sinR;
      var a11 = cosR + w * (1.0 - cosR);
      var a12 = w * (1.0 - cosR) - sqrW * sinR;
      var a20 = w * (1.0 - cosR) - sqrW * sinR;
      var a21 = w * (1.0 - cosR) + sqrW * sinR;
      var a22 = cosR + w * (1.0 - cosR);
      var matrix = [
        a00, a01, a02, 0, 0,
        a10, a11, a12, 0, 0,
        a20, a21, a22, 0, 0,
        0, 0, 0, 1, 0,
      ];
      return matrix.join(' ');
    },
    displayItem (url) {
      if (url.length > 50) {
        let head = url.slice(0, 20)
        let foot = url.slice(-30)
        return head + '...' + foot
      }
      return url
    },
    popup (url) {

      var popup = window.open(url, '_blank', "width="+screen.availWidth+",height="+screen.availHeight);
      if (popup == null)
         alert('Please change your popup settings');
      else  {
        popup.moveTo(0, 0);
        // popup.resizeTo(screen.availWidth, screen.availHeight);
      }
    },
    initDropdown () {
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
            this.YouTubeURL = reader.result
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
        // this.paste_createImage(source);
      })
    },
  }
}

module.exports = appMain