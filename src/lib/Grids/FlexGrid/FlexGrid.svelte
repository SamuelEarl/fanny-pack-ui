<script lang="ts">
  import { setContext } from "svelte";
  import { FLEX_GRID_KEY } from "./flex-grid-utils";

  export let colGutter = 0;
  export let rowGutter = 0;
  export let rowMarginsY = 0;
  export let rowMarginsX = 0;
  export let colPaddingY = 0;
  export let colPaddingX = 0;
  export let equalColWidths = false;
  export let contain = false;

  setContext(FLEX_GRID_KEY, {
    "colGutter": colGutter,
    "rowGutter": rowGutter,
    "rowMarginsY": rowMarginsY,
    "rowMarginsX": rowMarginsX,
    "equalColWidths": equalColWidths,
    "colPaddingY": colPaddingY,
    "colPaddingX": colPaddingX,
  });
</script>

<div 
  class="fp-flex-grid"
  class:fp-container={contain}
  style={`margin: -${rowGutter}px -${colGutter / 2}px`}
>
  <slot />
</div>
