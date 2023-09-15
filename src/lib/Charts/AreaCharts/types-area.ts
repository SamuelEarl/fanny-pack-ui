// This file will contain types that are only used in the area chart components.

import type { Margin } from "../types-charts";

// TODO: Turn this into a generic type to fit different data structures.
export interface AreaChartData {
  timestamp: Date;
  uv: number;
  pv: number;
  amt: number;
}

export interface AreaChartContext {
  svgWidth: SvelteStore<number>;
  svgHeight: SvelteStore<number>;
  hoveredValueXPos: SvelteStore<number>;
  data: AreaChartData;
  xValueId: string;
  xValuesArray: Date[];
  margin: Margin;
  xScaleFunction: (svgWidth: number) => void;
  yScaleFunction: (svgHeight: number) => void;
}
