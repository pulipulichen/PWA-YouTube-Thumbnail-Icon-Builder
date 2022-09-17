/* global ClipboardUtils */

let appMain = {
  data () {
    
    
    
    return {
      cacheKey: 'YouTube-Thumbnail-Icon',
      cacheAttrs: ['YouTubeURL', 'iconURL', 'iconPaddingPercentage', 'iconPosition'],
      init: false,
      
      YouTubeURL: 'https://youtu.be/vXCB1zGGFiY',
      iconURL: 'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',

      iconPaddingPercentage: 0,
      iconPosition: 3,
      iconPositionList: [7,8,9,4,5,6,1,2,3],
      canvaseBase64: '',

      presetIcons: [
        'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',
        'https://cdn-icons-png.flaticon.com/512/3293/3293810.png',
        'https://cdn-icons-png.flaticon.com/512/3293/3293822.png'
      ]
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
      return `https://i.ytimg.com/vi/${this.youtubeId}/maxresdefault.jpg`
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
    }
  },
  watch: {
    thumbnailURL () {
      this.drawIcon()
    },
    iconURL () {
      this.drawIcon()
    },
    iconPaddingPercentage () {
      this.drawIcon()
    },
    iconPosition () {
      this.drawIcon()
    },
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
      }
      return ID;
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

        if (resizedHeight > 512) {
          resizedHeight = 512
          resizedWidth = resizedWidth * (resizedHeight / height)
          left = (512 - resizedWidth) / 2
        } 

        context.drawImage(drawing, left, top, resizedWidth, resizedHeight);

        drawMusicIcon()
        //console.log('go')
      }

      let drawMusicIcon = () => {
        let iconDrawing = new Image()
        iconDrawing.src = this.iconURL; // can also be a remote URL e.g. http://
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
          this.canvaseBase64 = canvas.toDataURL('image/png')
          console.log(this.canvaseBase64)
        }
      }
    }
  }
}

module.exports = appMain