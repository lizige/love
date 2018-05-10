import {Tools} from "./Tools.js"
import {Bloom} from "./Bloom.js"
import {Vector} from "./Vector.js"
import {Config} from "./Config.js"

export class Garden {

    constructor(ctx, width, height) {
        this.blooms = [];
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.init();
    }

    render(interval) {
        let pm = this.drawBloomInterval(0);
        var me = this;
        for (let i = 1; i < this.blooms.length; i++) {
            pm = pm.then(function () {
                return me.drawBloomInterval(i)
            });
        }

        return pm;
    }

    drawBloomInterval(idx) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.blooms[idx].draw();
            //  me.ctx.draw(true);
            setTimeout(resolve, 100);
        });
    }


    addBloom(b) {
        this.blooms.push(b);
    }

    removeBloom(b) {
        var bloom;
        for (var i = 0; i < this.blooms.length; i++) {
            bloom = this.blooms[i];
            if (bloom === b) {
                this.blooms.splice(i, 1);
                return this;
            }
        }
    }

    createRandomBloom(x, y) {
        this.createBloom(x, y, Tools.randomInt(Config.bloomRadius.min, Config.bloomRadius.max), Tools.randomrgba(Config.color.rmin, Config.color.rmax, Config.color.gmin, Config.color.gmax, Config.color.bmin, Config.color.bmax, Config.color.opacity), Tools.randomInt(Config.petalCount.min, Config.petalCount.max));
    }

    createBloom(x, y, r, c, pc) {
        new Bloom(new Vector(x, y), r, c, pc, this);
    }

    clear() {
        this.blooms = [];
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    xRatio() {
        let width = this.width - 20;
        var t = 24.8 / Math.PI;
        return width / (2 * 16 * Math.pow(Math.sin(t), 3));
    }

    yRatio() {
        var t = 10.8 / Math.PI;
        return this.height / (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    }

    getHeartPoint(angle, xRatio, yRatio) {
        var offsetX = this.width / 2, offsetY = this.height;

        var t = angle / Math.PI;
        var x = xRatio * (16 * Math.pow(Math.sin(t), 3));
        var y = yRatio * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return new Array(offsetX + x, offsetY + y);
    }

    init() {
        var angle = 10;
        var heart = new Array();
        var xRatio = this.xRatio();
        var yRatio = this.yRatio();
        while (angle < 30) {
            var bloom = this.getHeartPoint(angle, xRatio, yRatio);
            var draw = true;
            for (var i = 0; i < heart.length; i++) {
                var p = heart[i];
                var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
                if (distance < Config.bloomRadius.max * 1.3) {
                    draw = false;
                    break;
                }
            }
            if (draw) {
                heart.push(bloom);
                this.createRandomBloom(bloom[0], bloom[1]);
            }

            angle += 0.2;

        }
    }
}


