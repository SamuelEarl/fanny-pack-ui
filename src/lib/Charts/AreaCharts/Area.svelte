<script lang="ts">
  import { getContext } from "svelte";
  import { area, line, curveCatmullRom } from "d3";
  import { AREA_CHART_KEY } from "./area-chart-utils";

  export let yValueId;
  export let color = "#000000";

  let {
    svgWidth,
    svgHeight,
    hoveredValueXPos,
    data,
    xValueId,
    xScaleFunction,
    yScaleFunction,
  } = getContext(AREA_CHART_KEY);

  $: xScale = xScaleFunction($svgWidth);
  $: yScale = yScaleFunction($svgHeight);

  // The area generator.
	$: areaGenerator = area()
		.x(d => xScale(d[xValueId]))
    .y0(() => yScale.range()[0])
		.y1(d => yScale(d[yValueId]))
    .curve(curveCatmullRom.alpha(0.5));

  // The line generator.
	$: lineGenerator = line()
		.x(d => xScale(d[xValueId]))
		.y(d => yScale(d[yValueId]))
    .curve(curveCatmullRom.alpha(0.5));

  function createId() {
    return `${Math.random().toString(36)}`;
  }

  let componentId = createId();
</script>

<defs>
  <linearGradient
    id={`area-gradient-${componentId}`}
    x1="0%"
    y1="0%"
    x2="0%"
    y2="100%"
  >
    <stop offset="0%" stop-color={color} stop-opacity="0.7" />
    <stop offset="100%" stop-color={color} stop-opacity="0.05" />
  </linearGradient>
</defs>

<g>
  <path d={areaGenerator(data)} class="area" fill={`url(#area-gradient-${componentId})`} />
  <path d={lineGenerator(data)} class="line" stroke={color} />    
  {#each data as datum, index}
    <!-- Set the cx and cy coordinates to be their scaled versions so they will be plotted inside the chart area. -->
    <circle
      cx={xScale(datum[xValueId])}
      cy={yScale(datum[yValueId])}
      r="5"
      id={`circle-${createId()}`}
      stroke={color}
      fill={$hoveredValueXPos === xScale(datum[xValueId]) ? color : "white"}
      class="circle"
    />
  {/each}
</g>

<style>
  .line {
    fill-opacity: 0;
    stroke-width: 2;
  }

  .circle {
    stroke-width: 1;
  }
</style>
