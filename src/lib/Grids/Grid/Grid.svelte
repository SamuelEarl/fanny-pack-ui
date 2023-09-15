<script lang="ts">
  import { setContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  export let colGutter = 0;
  export let rowGutter = 0;
  export let equalColWidths = false;
  export let contain = false;

  setContext(GRID_KEY, {
    "colGutter": colGutter,
    "rowGutter": rowGutter,
    "equalColWidths": equalColWidths,
  });
</script>

<div 
  class="fp-grid"
  class:fp-container={contain}
>
  <slot />
</div>

<style>
  .fp-grid {
    display: grid;
  }
</style>
