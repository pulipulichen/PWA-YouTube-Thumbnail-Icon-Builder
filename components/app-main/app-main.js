/* global ClipboardUtils */

let appMain = {
  data () {
    
    
    
    return {
      cacheKey: 'YouTube-Thumbnail-Icon',
      cacheAttrs: ['YouTubeURL', 'HistoryYouTubeURL', 'iconURL', 'HistoryIconURL', 'youtubeHorizontalPercentage', 'iconPaddingPercentage', 'iconPosition'],
      init: false,
      
      YouTubeURL: 'https://youtu.be/vXCB1zGGFiY',
      iconURL: 'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',

      youtubeHorizontalPercentage: 50,
      iconPaddingPercentage: 0,
      iconPosition: 3,
      iconPositionList: [7,8,9,4,5,6,1,2,3],
      canvaseBase64: '',
      drawIconLazyTimer: null,

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
      ],

      imgbbHTML: '',
      
    }
  },
  mounted () {
    this.dataLoad()
    
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
      if (!this.youtubeId || this.youtubeId.startsWith('http')) {
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
        return false
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
    youtubeHorizontalPercentage () {
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
      drawing.onload = () => {
        let {height, width} = drawing
        let resizedHeight = height
        let resizedWidth = width
        let top = 0
        let left = 0
        // if (resizedWidth > 512) {
        //   resizedWidth = 512
        //   resizedHeight = resizedHeight * (resizedWidth / width)
        //   top = (512 - resizedHeight) / 2
        // } 
        if (resizedWidth > resizedHeight) {
          // if (resizedHeight > 512) {
            resizedHeight = 512
            resizedWidth = resizedWidth * (resizedHeight / height)
            //left = (512 - resizedWidth) / 2

            let maxLeft = 512 - resizedWidth
            left = maxLeft * (this.youtubeHorizontalPercentage / 100)
          // } 
        }
        else {
          // if (resizedWidth > 512) {
            resizedWidth = 512
            resizedHeight = resizedHeight * (resizedWidth / width)
            //left = (512 - resizedWidth) / 2
            

            let max = 512 - resizedHeight
            top = max * (this.youtubeHorizontalPercentage / 100)
          // } 
        }
        //console.log(left, top, resizedWidth, resizedHeight)

        context.drawImage(drawing, left, top, resizedWidth, resizedHeight);

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
    displayItem (url) {
      if (url.length > 50) {
        let head = url.slice(0, 20)
        let foot = url.slice(-30)
        return head + '...' + foot
      }
      return url
    }
  }
}

module.exports = appMain