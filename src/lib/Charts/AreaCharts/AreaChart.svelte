<script lang="ts">
  import { setContext, tick, createEventDispatcher, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { scaleTime, scaleLinear, bisectCenter, min, max } from "d3";
  // TODO (bug fix): This lodash function might be causing loading errors for the entire app. Ugh!!!!!
  import { throttle } from "lodash-es";
  import type { Margin } from "../types-charts";
  import { AREA_CHART_KEY } from "./area-chart-utils";
  import { createId } from "../../utils";

  export let data = [];
  export let xValueId: string;
  export let margin: Margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  export let chartTitleSize = 16;
  export let chartTitleText = "";
  export let showTooltip = true;
  // By default this will return the value without formatting it.
  export let formatTooltipXValue = (value) => value;

  const dispatch = createEventDispatcher();
  let componentId = createId();
  let highlightTimerID = null;

  let xValuesArray = data.map(datum => datum[xValueId]);

  let yValues = [];
  for (let i = 0; i < data.length; i++) {
    for (let prop in data[i]) {
      if (prop !== xValueId) {
        yValues.push(data[i][prop]);
      }
    }
  };
  let yScaleMin = Math.min(...yValues);
  // TODO: Test scenarios where the yScaleMin is negative. How does that look on the chart? Will that work accurately?
  yScaleMin = yScaleMin < 0 ? yScaleMin : 0;
  let yScaleMax = Math.max(...yValues);

  // These are reactive contexts, so you can subscribe to them with the $ symbol.
  let svgWidth = writable<number>(600);
  let svgHeight = writable<number>(300);
  let hoveredValueXPos = writable<number>(-1000000);

  $: tooltipXPos = $hoveredValueXPos;
  let tooltipYPos = 0;

  let tooltipBounds = null;
  let chartContainerBounds = null;

  $: xAccessor = (d) => d[xValueId];

  onDestroy(() => {
    clearTimeout(highlightTimerID);
  });

  function xScaleFunction(svgWidth) {
    return scaleTime()
      .domain([min(data, xAccessor), max(data, xAccessor)])
      // The range will provide a 5px buffer on the left and right sides so the points don't get cutoff.
      .range([margin.left + 5, svgWidth - margin.right - 5]);
  }

  $: xScale = xScaleFunction($svgWidth);

  // $: yAccessor = (d) => d[yValueId];

  function yScaleFunction(svgHeight) {
    return scaleLinear()
      // .domain([0, max(data, yAccessor)])
      // TODO: Test this idea: It might be necessary to keep the axes static, even if the data points fluctuate, rather than use a yAccessor function like I did in the xScaleFunction. If this were a realtime chart, then I would probably have to use a dynamically generated yScale with a yAccessor function.
      .domain([yScaleMin, yScaleMax])
      // The range will provide a 5px buffer on the bottom and top sides so the points don't get cutoff.
      .range([svgHeight - margin.bottom - 5, margin.top + 5]);
  }

  let dataIndex;

  async function handleMouseMove(event) {
    // This conditional check prevents the highlighted points and the tooltip from bouncing around in Firefox.
    if (event.offsetX === 0 || event.offsetY === 0) return;

    // Set the mouse's x and y positions.
    let mouseXPos = event.offsetX;
    let mouseYPos = event.offsetY;
    // console.log("mouseXPos:", event.offsetX);
    // console.log("mouseYPos:", event.offsetY);

    // Set the tooltip's y position. 
    tooltipYPos = mouseYPos;

    // Return the point that is closest to the mouse position's current clientX position.
    dataIndex = bisectCenter(xValuesArray, xScale.invert(mouseXPos));
    // console.log("dataIndex:", dataIndex);

    // Set the highlighted x-values and the x-position of the tooltip.
    if (dataIndex < xValuesArray.length) {
      $hoveredValueXPos = xScale(xValuesArray[dataIndex]);
      // console.log("hoveredValueXPos:", $hoveredValueXPos);
      // Dispatch the values that are being hovered over.
      dispatch("hoveredData", data[dataIndex]);
    }

    if (showTooltip) {
      // Wait until the tooltip is in the DOM before referencing it.
      // Calling the tick() method outside of the following `if` statement will also prevent the tooltip from skipping around when the user moves their mouse outside of the chart area to the right.
      await tick();

      // Get the tooltip element.
      if (!tooltipBounds) {
        tooltipBounds = document.getElementById(`chart-tooltip-${componentId}`).getBoundingClientRect();
        // console.log("tooltipBounds:", tooltipBounds);
      }

      // Get the chart container element.
      if (!chartContainerBounds) {
        chartContainerBounds = event.target.closest(".chart-container").getBoundingClientRect();
        // console.log("CHART CONTAINER BOUNDS:", chartContainerBounds);
      }

      // If the user hovers too far to the right on the chart, then place the tooltip a little to the left so it will stay visible.
      let spaceForTooltipWidth = chartContainerBounds.width - tooltipBounds.width - margin.right - 30;
      if (mouseXPos > spaceForTooltipWidth) {
        tooltipXPos = spaceForTooltipWidth;
      }

      // If the user hovers too low on the chart, then place the tooltip a little higher.
      const spaceForTooltipHeight = chartContainerBounds.height - tooltipBounds.height - margin.bottom - 10;
      if (mouseYPos > spaceForTooltipHeight) {
        tooltipYPos = spaceForTooltipHeight;
      }
    }
  }

  /**
   * This function fixes the bug related to using throttle in the on:mouseover event. 
   * Before implementing this function: When I removed the throttle function, then the 
   * tooltip and the highlighting line will disappear when I hover outside of the chart 
   * area. But when the throttle function is present then those things may or may not 
   * disappear. I think that is because the timer that is attached to the throttle 
   * function allows it to run one last time, which means that it will run after the 
   * on:mouseleave event has run and the tooltip and the highlight line will be placed 
   * in the visible DOM again. 
   */
  // TODO: Is there a way to resolve this issue without a setTimeout?
  function removeHighlights() {
    highlightTimerID = setTimeout(() => {
      tooltipXPos = -1000000;
      // If the tooltip is displayed, then remove the highlighted data point when the user 
      // moves their mouse out of the chart area. This also means that when the tooltip is 
      // not displayed then the highlighted data point will remain highlighted when the 
      // user moves their mouse out of the chart area.
      if (showTooltip) {
        $hoveredValueXPos = -1000000;
      }
    }, 250);
  }

  setContext(AREA_CHART_KEY, {
    "svgWidth": svgWidth,
    "svgHeight": svgHeight,
    "hoveredValueXPos": hoveredValueXPos,
    "data": data,
    "xValueId": xValueId,
    "xValuesArray": xValuesArray,
    "margin": margin,
    "xScaleFunction": xScaleFunction,
    "yScaleFunction": yScaleFunction,
  });
</script>

<div
  class="chart-container"
  bind:clientWidth={$svgWidth}
  bind:clientHeight={$svgHeight}
  on:mousemove={throttle(handleMouseMove, 200)}
  on:mouseleave={removeHighlights}
>
  {#if showTooltip && $hoveredValueXPos > 0}
    <div class="chart-tooltip" id={`chart-tooltip-${componentId}`} style={`transform: translate(${tooltipXPos + 15}px, ${tooltipYPos}px)`}>
      {#each Object.entries(data[dataIndex]) as [prop, value]}
        {#if prop === xValueId}
          <div>{prop}: {formatTooltipXValue(value)}</div>
        {:else}
          <div>{prop}: {value}</div>
        {/if}
      {/each}
    </div>
  {/if}
  <svg>
    {#if showTooltip}
      <g class="vertical-hover-line" transform="translate(0, 0)">
        <line
          x1={$hoveredValueXPos}
          y1={margin.top}
          x2={$hoveredValueXPos}
          y2={$svgHeight - margin.bottom}
        />
      </g>
    {/if}

    {#if chartTitleText}
      <text
        class="chart-title"
        x={$svgWidth / 2}
        y={0}
        text-anchor="middle"
        dominant-baseline="hanging"
        font-size={chartTitleSize + "px"}
      >
        {chartTitleText}
      </text>
    {/if}

    <slot></slot>
  </svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;

    & .chart-tooltip {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: var(--white);
      color: var(--text-color-default);
      box-shadow: 0 0 5px 0 var(--border-color);
      pointer-events: none;
      transition: 200ms linear 0s;
      z-index: 100;
    }

    & svg {
      width: 100%;
      height: 100%;

      & .vertical-hover-line line {
        stroke: var(--neutral-4);
        stroke-dasharray: 4 4;
      }
    }
  }
</style>
