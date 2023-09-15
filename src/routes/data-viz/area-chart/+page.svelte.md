<script lang="ts">
  import { AreaChart, Area, Axis } from "/src/lib";

  let currentData = { timestamp: new Date(), pv: null };

  function subtractSec(sec) {
    const date = new Date();
    // Setting the milliseconds to zero will ensure that the x-axis
    // labels line up exactly with the plots on the chart.
    date.setMilliseconds(0);
    // Subtract the given seconds from the Date object and set the
    // date object to have the new seconds.
    date.setSeconds(date.getSeconds() - sec);
    return date;
  }

  const simpleData = [
    {
      timestamp: subtractSec(7),
      pv: 2400,
    },
    {
      timestamp: subtractSec(6),
      pv: 1398,
    },
    {
      timestamp: subtractSec(5),
      pv: 9800,
    },
    {
      timestamp: subtractSec(4),
      pv: 3908,
    },
    {
      timestamp: subtractSec(3),
      pv: 4800,
    },
    {
      timestamp: subtractSec(2),
      pv: 3800,
    },
    {
      timestamp: subtractSec(1),
      pv: 4300,
    },
  ];

  const complexData = [
    {
      timestamp: subtractSec(7),
      // name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: subtractSec(6),
      // name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: subtractSec(5),
      // name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: subtractSec(4),
      // name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: subtractSec(3),
      // name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: subtractSec(2),
      // name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: subtractSec(1),
      // name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  function handleHoveredData(event) {
    currentData = event.detail;
  }
</script>


# Area Chart

---

## Example Usage

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={25}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-color)"}
    />
  </AreaChart>
</div>

<br><br>

```svelte
<script>
  import { AreaChart, Area, Axis } from "@fanny-pack-ui/svelte-kit";

  function subtractSec(sec) {
    const date = new Date();
    // Setting the milliseconds to zero will ensure that the x-axis
    // labels line up exactly with the plots on the chart.
    date.setMilliseconds(0);
    // Subtract the given seconds from the Date object and set the
    // date object to have the new seconds.
    date.setSeconds(date.getSeconds() - sec);
    return date;
  }

  const simpleData = [
    { timestamp: subtractSec(7), pv: 2400 },
    { timestamp: subtractSec(6), pv: 1398 },
    { timestamp: subtractSec(5), pv: 9800 },
    { timestamp: subtractSec(4), pv: 3908 },
    { timestamp: subtractSec(3), pv: 4800 },
    { timestamp: subtractSec(2), pv: 3800 },
    { timestamp: subtractSec(1), pv: 4300 },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
</script>

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-color)"}
    />
  </AreaChart>
</div>

<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }
</style>
```

---

## Multiple Overlaid Areas

You can overlay multiple areas on top of each other. Keep in mind that some of the data points might not display very clearly and your chart might not look very good. You might consider using line charts for this use case instead of area charts.

<div class="chart-space">
  <AreaChart
    data={complexData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-12}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area yValueId="uv" color="darkred" />
    <Area yValueId="pv" color="greenyellow" />
    <Area yValueId="amt" color="darkblue" />
  </AreaChart>
</div>

<br><br>

```svelte
<script>
  const complexData = [
    {
      timestamp: subtractSec(7),
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: subtractSec(6),
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: subtractSec(5),
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: subtractSec(4),
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: subtractSec(3),
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: subtractSec(2),
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: subtractSec(1),
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
</script>

<div class="chart-space">
  <AreaChart
    data={complexData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    ...
    <Area yValueId="uv" color="darkred" />
    <Area yValueId="pv" color="greenyellow" />
    <Area yValueId="amt" color="darkblue" />
  </AreaChart>
</div>
```

---

## Displaying data without the tooltip

<br>

<div class="current-data">
  <span class="time">Time: {getTime(currentData.timestamp)}</span><span class="value">Value: {currentData.pv}</span>
</div>

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    showTooltip={false}
    on:hoveredData={handleHoveredData}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={25}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-color)"}
    />
  </AreaChart>
</div>

<br><br>

```svelte
<script lang="ts">
  let currentData = { timestamp: new Date(), pv: null };

  function handleHoveredData(event) {
    currentData = event.detail;
  }
</script>

<div class="current-data">
  <span class="time">Time: {getTime(currentData.timestamp)}</span>
  <span class="value">Value: {currentData.pv}</span>
</div>

<AreaChart
  ...
  showTooltip={false}
  on:hoveredData={handleHoveredData}
>
  ...
</AreaChart>
```

<br>

There are situations where a tooltip might not be the best way to display values from a data point. In the `<AreaChart>` component you can set `showTooltip={false}` and listen to the `on:hoveredData` event. You can then format the data that is displayed to the user however you want. 

<br>

---

## Props

### For the `<AreaChart>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `data` | `array` of `objects` | Any array of objects containing numerical values | NA | This prop will provide the data that is displayed in your chart. |
| `xValueId` | `string` | Any property name from your data objects | NA | This prop should be the name of a property from your data objects. This is how the `<AreaChart>` component is able to tell which values should be treated as the x-values. |
| `margin` | `object` | possible values | `{ top: 0, bottom: 0, left: 0, right: 0 }` | The `margin` prop is used to provide space between the edges of the chart and the container element that wraps your chart component. The margins include the axes and their tick labels, but do not include the chart title or axis labels. For example, if you increase the left chart margin, then the left edge of the chart along with the y-axis and its tick labels will move away from the left side of the screen, but the y-axis label will not move. |
| `chartTitleText` | `string` | Any string | `""` (an empty string) | This prop provides the chart title text. If no text is provided in this prop, then the chart will not have a title. |
| `chartTitleSize` | `number` | Any number | `16` (pixels) | This prop provides the size of the chart title in pixels. |
| `showTooltip` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the tooltip when a user hovers over the chart. If the tooltip is hidden, then the vertical indicator line that appears along with the tooltip will also be hidden. |
| `formatTooltipXValue` | `function` | Any function | `(value) => value`<br>By default this will return the value without formatting it. | You should provide a function to this prop that will take an x-value as an argument and return a formatted version of the x-value. |

<hr>
<br>

### For the `<Area>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `yValueId` | `string` | Any property name from your data objects | NA | This prop should be the name of a property from your data objects. This is how the `<AreaChart>` component is able to tell which value(s) should be treated as a y-value. |
| `color` | `string` | Any CSS color value | `"#000000"` | This prop provides the color for your area chart. |

<hr>
<br>

### For the `<Axis>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `axisType` | `string` | `"xAxis"`, `"yAxis"` | `""` (an empty string) | This prop defines whether the axis will be an x-axis (positioned below the chart) or a y-axis (positioned on the left side of the chart). |
| <div class="divider-row">Axis Line</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showAxisLine` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the axis line. |
| `lineStrokeColor` | `string` | Any CSS color value | `"#000000"` | This prop provides the color of the axis lines and axis tick marks. |
| `lineStrokeWidth` | `number` | Any number | `1` | This prop provides the stroke width for the axis lines and axis tick marks. |
| <div class="divider-row">Tick Marks</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showTickMarks` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the tick marks. |
| `fullLengthTickMarks` | `boolean` | `true`, `false` | `false` | If `showTickMarks` is `true`, then this prop allows you to set the tick marks to be the full height of the chart. |
| `numberOfTickMarks` | `number` | Any number | `5` | D3.js will take this number into consideration when setting the number of tick marks, but ultimately D3 will set the number of tick marks that it calculates to be the most appropriate number based on your data. |
| <div class="divider-row">Tick Labels</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showTickLabels` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the tick labels. |
| `tickLabelFontSize` | `number` | Any number | `12` | This prop sets the font size of the tick labels. |
| `tickLabelFill` | `string` | Any CSS color value | `"#000000"` | This prop sets the text color of the tick labels. |
| `formatTickLabel` | `function` | Any function | `(tick) => tick`<br>By default this will return the tick label without formatting it. | You should provide a function to this prop that will take a tick label as an argument and return a formatted version of the tick label. |
| `tickLabelTranslateX` | `number` | Any number | `"xAxis"`=`0`, `"yAxis"`=`-15` | This prop allows you to shift the tick labels either left or right. |
| `tickLabelTranslateY` | `number` | Any number | `"xAxis"`=`15`, `"yAxis"`=`0` | This prop allows you to shift the tick labels either up or down. |
| `rotateTickLabel` | `number` | Any number | `0` | This prop allows you to rotate the tick labels. |
| <div class="divider-row">Axis Labels</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `axisLabelText` | `string` | Any string | `""` (an empty string) | This prop provides the axis label text. If no text is provided in this prop, then the axis will not have a label. |
| `axisLabelSize` | `number` | Any number | `16` (pixels) | This prop provides the size of the axis label in pixels. |

<hr>
<br>

## Event dispatching for the `<AreaChart>` component

| Event | Description |
| ----- | ----------- |
| `on:hoveredData` | You can listen for the `hoveredData` event and get the currently hovered data object on the `event.detail` property (see the example above for details). You might want to use this instead of displaying data through the tooltip. |


<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }

  .current-data {
    display: inline-block;
    border: var(--border-default);
    font-family: var(--monospace);
    font-weight: bold;

    & .time, & .value {
      display: inline-block;
      padding: 10px 20px;
    }

    & .time {
      border-right: var(--border-default);
    }
  }

  .divider-row {
    margin: -10px -25px;
    padding: 3px 25px;
    font-size: 14px;
    font-style: italic;
    background-color: var(--bg-color-element-default);
  }
</style>
