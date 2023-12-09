
<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  import MainNav from "./MainNav.svelte";

  $: currentPath = $page.url.pathname;
</script>

<div class="sidebar">
  <div class="title-wrapper">
    <a href="/">Fanny Pack UI</a>
  </div>

  <MainNav />
</div>

  <!-- <div class="nav-links">
    <a href="/" class:active={currentPath === "/"}>
      <Icon icon="carbon:home" /> &nbsp; Overview
    </a>
    <a href="/get-started" class:active={currentPath === "/get-started"}>
      <Icon icon="carbon:play" /> &nbsp; Get Started
    </a>
    <a href="/customize-theme" class:active={currentPath === "/customize-theme"}>
      <Icon icon="material-symbols:style-outline-sharp" /> &nbsp; Customize Theme
    </a>
    <a href="/update-to-latest-version" class:active={currentPath === "/update-to-latest-version"}>
      <Icon icon="ic:baseline-update" /> &nbsp; Update To Latest Version
    </a>
  </div>
  <div class="section-heading">Components</div>
  <div class="nav-links">
    <a href="/docs/components/accordion" class:active={currentPath === "/docs/components/accordion"}>
      <Icon icon="carbon:account" /> &nbsp; Accordion
    </a>
    <a href="/docs/components/button" class:active={currentPath === "/docs/components/button"}>
      <Icon icon="carbon:button-centered" /> &nbsp; Button
    </a>
    <a href="/docs/components/checkbox/single" class:active={currentPath === "/docs/components/checkbox/single"}>
      <Icon icon="carbon:checkbox-checked" /> &nbsp; Checkbox (single)
    </a>
    <a href="/docs/components/checkbox/group" class:active={currentPath === "/docs/components/checkbox/group"}>
      <Icon icon="carbon:list-boxes" /> &nbsp; Checkbox (group)
    </a>
    <a href="/docs/components/date-picker" class:active={currentPath === "/docs/components/date-picker"}>
      <Icon icon="carbon:calendar" /> &nbsp; Date Picker
    </a>
    COLOR PICKER SHOULD BE COMMENTED OUT: See my comment about a color picker component in the TODOS.md file.
    <a href="/docs/components/color-picker" class:active={currentPath === "/docs/components/color-picker"}>
      <Icon icon="clarity:color-picker-solid" /> &nbsp; Color Picker
    </a>
    <a href="/docs/components/drop-zone" class:active={currentPath === "/docs/components/drop-zone"}>
      <Icon icon="pixelarticons:drop-area" /> &nbsp; Drop Zone (file upload)
    </a>
    FLEXGRID SHOULD BE COMMENTED OUT
    <a href="/docs/components/flex-grid" class:active={currentPath === "/docs/components/flex-grid"}>
      <Icon icon="ph:layout-light" /> &nbsp; FlexGrid (layout)
    </a>
    <a href="/docs/components/grid" class:active={currentPath === "/docs/components/grid"}>
      <Icon icon="ph:layout-light" /> &nbsp; Grid (layout)
    </a>
    <a href="/docs/components/input/currency" class:active={currentPath === "/docs/components/input/currency"}>
      <Icon icon="carbon:currency-dollar" /> &nbsp; Input (currency)
    </a>
    <a href="/docs/components/input/misc" class:active={currentPath === "/docs/components/input/misc"}>
      <Icon icon="radix-icons:input" /> &nbsp; Input (text, number, email)
    </a>
    <a href="/docs/components/modal" class:active={currentPath === "/docs/components/modal"}>
      <Icon icon="carbon:popup" /> &nbsp; Modal (popup window)
    </a>
    <a href="/docs/components/radio-button" class:active={currentPath === "/docs/components/radio-button"}>
      <Icon icon="carbon:radio-button-checked" /> &nbsp; Radio Button
    </a>
    <a href="/docs/components/select/single" class:active={currentPath === "/docs/components/select/single"}>
      <Icon icon="icon-park-outline:list-view" /> &nbsp; Select (single)
    </a>
    <a href="/docs/components/select/multi" class:active={currentPath === "/docs/components/select/multi"}>
      <Icon icon="fluent:multiselect-ltr-20-filled" /> &nbsp; Select (multi)
    </a>
    <a href="/docs/components/tabs" class:active={currentPath === "/docs/components/tabs"}>
      <Icon icon="ic:outline-tab" /> &nbsp; Tabs (tabbed content)
    </a>
    <a href="/docs/components/textarea" class:active={currentPath === "/docs/components/textarea"}>
      <Icon icon="bi:textarea-resize" /> &nbsp; Textarea
    </a>
    <a href="/docs/components/toast" class:active={currentPath === "/docs/components/toast"}>
      <Icon icon="carbon:information-square" /> &nbsp; Toast (notification pane)
    </a>
    <a href="/docs/components/tooltip" class:active={currentPath === "/docs/components/tooltip"}>
      <Icon icon="carbon:chat" /> &nbsp; Tooltip
    </a>
  </div>
  <div class="section-heading">Data Viz</div>
  <div class="nav-links">
    <a href="/data-viz/area-chart" class:active={currentPath === "/data-viz/area-chart"}>
      <Icon icon="tabler:chart-area-line" /> &nbsp; Area Chart
    </a>
    <a href="/data-viz/bar-chart/horizontal" class:active={currentPath === "/data-viz/bar-chart/horizontal"}>
      <Icon icon="bi:bar-chart" rotate="90deg" /> &nbsp; Bar Chart (horizontal)
    </a>
    <a href="/data-viz/bar-chart/vertical" class:active={currentPath === "/data-viz/bar-chart/vertical"}>
      <Icon icon="bi:bar-chart" /> &nbsp; Bar Chart (vertical)
    </a>
    <a href="/data-viz/bubble-chart" class:active={currentPath === "/data-viz/bubble-chart"}>
      <Icon icon="carbon:chart-bubble" /> &nbsp; Bubble Chart
    </a>
    <a href="/data-viz/geospatial-chart" class:active={currentPath === "/data-viz/geospatial-chart"}>
      <Icon icon="gis:world-map-alt" /> &nbsp; Geospatial Chart
    </a>
    <a href="/data-viz/histogram" class:active={currentPath === "/data-viz/histogram"}>
      <Icon icon="fluent:data-histogram-24-regular" /> &nbsp; Histogram
    </a>
    <a href="/data-viz/line-chart" class:active={currentPath === "/data-viz/line-chart"}>
      <Icon icon="mdi:chart-line-variant" /> &nbsp; Line Chart
    </a>
    <a href="/data-viz/scatterplot" class:active={currentPath === "/data-viz/scatterplot"}>
      <Icon icon="carbon:chart-scatter" /> &nbsp; Scatterplot
    </a>
  </div>
  <div class="section-heading">Utility Classes</div>
  <div class="nav-links">
    <a href="/utility-classes/visibility" class:active={currentPath === "/utility-classes/visibility"}>
      <Icon icon="bx:show" /> &nbsp; Visibility
    </a>
  </div> -->

<style>
  .sidebar {
    min-height: 100%;
    padding-bottom: 50px;
    background-color: var(--secondary-color);

    & .title-wrapper {
      font-family: var(--cursive);
      padding: 15px;
      font-size: 1.5rem;
      line-height: 1.5;
      text-align: center;

      & a {
        border-bottom: none;
        color: var(--white);
      }
    }

    /* & .section-heading {
      padding: 10px;
      padding-left: 15px;
      font-size: 1.1rem;
      font-weight: bold;
    }

    & .nav-links {
      display: flex;
      flex-direction: column;

      & a {
        display: flex;
        padding: 10px;
        padding-left: 30px;
        border-bottom: none;
        color: var(--tertiary-color);

        &:hover {
          background-color: var(--primary-color);
        }

        &.active {
          background-color: var(--primary-color);
        }
      }
    } */
  }
</style>
