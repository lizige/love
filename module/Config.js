
export class Config {

  static  petalCount = {
      min: 8,
      max: 15
  }

  static  petalStretch = {
      min: 4,
      max: 8
  }

  static growFactor = {
      min: 1,
      max: 2
  }
  static bloomRadius ={
      min: 8,
      max: 12
  }
  static circle = 6.28;
  
  static  density= 10;

  static  growSpeed= 1000/60 ;

  static  color = {
      rmin: 128,
      rmax: 255,
      gmin: 0,
      gmax: 128,
      bmin: 0,
      bmax: 128,
      opacity: 0.5
    }
  static  tanAngle=60;

  constructor() {
    
  }
  
}