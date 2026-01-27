var appMainMethods = {

    YouTubeGetID: function (url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
            ID = ID[0];
        }
        return ID;
    },

    displayItem(url) {
        if (url.length > 50) {
            let head = url.slice(0, 20)
            let foot = url.slice(-30)
            return head + '...' + foot
        }
        return url
    },
    popup(url) {

        var popup = window.open(url, '_blank', "width=" + screen.availWidth + ",height=" + screen.availHeight);
        if (popup == null)
            alert('Please change your popup settings');
        else {
            popup.moveTo(0, 0);
            // popup.resizeTo(screen.availWidth, screen.availHeight);
        }
    },
}