export type Color = string;

export interface SimpleColorSet {
  container: Color;
  accent: Color;
  high: Color;
  medium: Color;
  low: Color;
}

export interface ColorMap {};

export interface ContainerColorMap extends ColorMap {
  container(): Color;
}

// export abstract class SurfaceColorMap implements ColorMap {
//   protected colorSet: ColorSet;

//   constructor(colorSet: ColorSet) {
//     this.colorSet = colorSet;
//   }
// }
