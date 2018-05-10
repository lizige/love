import {Config} from "./Config.js"


export class Tools {

    constructor() {
    }

    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    static degrad(angle) {
        return Config.circle / 360 * angle;
    }

    static raddeg(angle) {
        return angle / Config.circle * 360;
    }

    static rgba(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    static randomrgba(rmin, rmax, gmin, gmax, bmin, bmax, a) {
        var r = Math.round(Tools.random(rmin, rmax));
        var g = Math.round(Tools.random(gmin, gmax));
        var b = Math.round(Tools.random(bmin, bmax));
        var limit = 5;
        if (Math.abs(r - g) <= limit && Math.abs(g - b) <= limit && Math.abs(b - r) <= limit) {
            return Tools.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
        } else {
            return Tools.rgba(r, g, b, a);
        }
    }

}