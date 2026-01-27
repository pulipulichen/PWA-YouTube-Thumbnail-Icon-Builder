var appMainMethodsFilter = {

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

}