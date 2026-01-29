var appMainData = function () {
    return {
        cacheKey: 'YouTube-Thumbnail-Icon',
        cacheAttrs: [
            'YouTubeURL',
            'HistoryYouTubeURL',
            'iconURL',
            'setBackground',
            'iconPadding',
            'backgroundCornerRound',
            'backgroundColor',
            'fitImage',
            'HistoryIconURL',
            'youtubeHorizontalPercentage',
            'youtubeHueRotateDegree',
            'iconHueRotateDegree',
            'iconPaddingPercentage',
            'iconPosition',
            'iconBorderWidth',
            'iconBorderColor',
            'iconSizeScale',
            'base64String',
            'presetIconsToMain'
        ],
        init: false,

        YouTubeURL: 'https://youtu.be/vXCB1zGGFiY',
        iconURL: 'https://cdn-icons-png.flaticon.com/512/1895/1895657.png',

        youtubeHorizontalPercentage: 50,
        iconPaddingPercentage: 0,
        iconPosition: 3,
        iconPositionList: [7, 8, 9, 4, 5, 6, 1, 2, 3],
        iconBorderWidth: 4,
        iconBorderColor: "#FFFFFF",
        iconSizeScale: 1,
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

        presetIconsToMain: false,

        presetIcons: PRESET_ICONS,

        imgbbHTML: '',
        base64String: '',

    }
}
