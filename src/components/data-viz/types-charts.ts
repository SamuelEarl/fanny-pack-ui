// This file will contain types that are used throughout many different charts.

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface AxisContext {
  svgWidth: SvelteStore<number>;
  svgHeight: SvelteStore<number>;
  margin: Margin;
  xScaleFunction: (svgWidth: number) => number;
  yScaleFunction: (svgHeight: number) => number;
}
