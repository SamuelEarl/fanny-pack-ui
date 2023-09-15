<script lang="ts">
  import { getContext } from "svelte";
  import { AREA_CHART_KEY } from "./AreaCharts/area-chart-utils";

  // Axis Line
  export let showAxisLine = true;
  export let lineStrokeColor = "#000000";
  export let lineStrokeWidth = 1;
  // Tick Marks
  export let showTickMarks = true;
  export let fullLengthTickMarks = false;
  export let numberOfTickMarks = 5;
  // Tick Labels
  export let showTickLabels = true;
  export let tickLabelFontSize = 12;
  export let tickLabelFill = "#000000";
  // By default this will return the tick label without formatting it.
  export let formatTickLabel = (tick) => tick;
  export let tickLabelTranslateX = 0;
  export let tickLabelTranslateY = 15;
  export let rotateTickLabel = 0;
  // Axis Label
  export let axisLabelText = "";
  export let axisLabelSize = 16;

  let {
    svgWidth,
    svgHeight,
    margin,
    xScaleFunction,
  } = getContext(AREA_CHART_KEY);

  $: xScale = xScaleFunction($svgWidth);
</script>

{#if axisLabelText}
  <text
    class="axis-label"
    x={$svgWidth / 2}
    y={$svgHeight}
    text-anchor="middle"
    dominant-baseline="bottom"
    font-size={axisLabelSize + "px"}
  >
    {axisLabelText}
  </text>
{/if}

<!-- x-axis -->
<!-- x-axis group -->
<!-- The `- 5` in the `translate()` function below aligns the x-axis line with the bottom edge of the chart. -->
<g class="axis-group" transform="translate(0, {$svgHeight - margin.bottom - 5})">
  <!-- x-axis line -->
  {#if showAxisLine}
    <!-- The x-axis starting point is 5px behind the y-axis. -->
    <line
      x1={margin.left - 5}
      x2={$svgWidth - margin.right}
      class="axis-line"
      stroke={lineStrokeColor}
      stroke-width={lineStrokeWidth}
    />
  {/if}
  
  <!-- tick marks -->
  {#each xScale.ticks(numberOfTickMarks) as tick}
    <g class="tick-group" transform={`translate(${xScale(tick)})`}>
      {#if showTickMarks}
        <!-- x-axis tick marks start a 5px below the x-axis line. If this axis has fullLengthTickMarks, then each tick mark will end at the top edge of the chart (plus 5px toward the top to match the y-axis length - see the comment above the y-axis line). Otherwise each tick mark will end where the x-axis line would be (i.e. at x2="0") and each tick mark would be 5px tall. -->
        <line
          y1="10" 
          y2={fullLengthTickMarks ? (-($svgHeight - margin.top - margin.bottom + 5)) : 0}
          class="tick-mark" 
          stroke={lineStrokeColor} 
          stroke-width={lineStrokeWidth} 
        />
      {/if}
      {#if showTickLabels}
        <text
          class="tick-label"
          text-anchor="middle"
          dominant-baseline="middle"
          transform={`translate(${tickLabelTranslateX}, ${tickLabelTranslateY}) rotate(${rotateTickLabel})`}
          font-size={tickLabelFontSize}
          fill={tickLabelFill}
        >
          {formatTickLabel(tick)}
        </text>
      {/if}
    </g>
  {/each}
</g>

<style>
  .axis-line {
    shape-rendering: crispEdges;
  }

  .tick-mark {
    shape-rendering: crispEdges;
  }

  .tick-label {
    shape-rendering: crispEdges;
  }
</style>
