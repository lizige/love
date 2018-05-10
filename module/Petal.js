import {Tools} from "./Tools.js"
import {Vector} from "./Vector.js"


export class Petal {

    constructor(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
        this.stretchA = stretchA;
        this.stretchB = stretchB;
        this.startAngle = startAngle;
        this.angle = angle;
        this.bloom = bloom;
        this.growFactor = growFactor;
        this.r = 1;
        this.isfinished = false;
    }

    draw() {
        var ctx = this.bloom.garden.ctx;
        var v1, v2, v3, v4;
        v1 = new Vector(0, this.r).rotate(Tools.degrad(this.startAngle));
        v2 = v1.clone().rotate(Tools.degrad(this.angle));
        v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
        v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
        ctx.setStrokeStyle(this.bloom.c);
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
        ctx.stroke();

    }

    render() {
        while (this.r <= this.bloom.r) {
            this.r += this.growFactor; // / 10;
            this.draw();
        }

    }


}