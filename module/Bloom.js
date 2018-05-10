import {Tools} from "./Tools.js"
import {Petal} from "./Petal.js"
import {Config} from "./Config.js"

export class Bloom {

  constructor(p, r, c, pc, garden) {
    this.p = p;
    this.r = r;
    this.c = c;
    this.pc = pc;
    this.petals = [];
    this.garden = garden;
    this.init();
    this.garden.addBloom(this);
  }

  draw() {

    this.garden.ctx.save();
    this.garden.ctx.translate(this.p.x, this.p.y);
    for (var i = 0; i < this.petals.length; i++) {
      let p = this.petals[i];
      p.render();
    }
    this.garden.ctx.draw(true);
    this.garden.ctx.restore();
  }
  init() {
    var angle = 360 / this.pc;
    var startAngle = Tools.randomInt(0, 90);
    for (var i = 0; i < this.pc; i++) {
      this.petals.push(new Petal(Tools.random(Config.petalStretch.min, Config.petalStretch.max), Tools.random(Config.petalStretch.min, Config.petalStretch.max), startAngle + i * angle, angle, Tools.random(Config.growFactor.min, Config.growFactor.max), this));
    }
  }
}