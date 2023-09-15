<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  let {
    rowMarginsY,
    rowMarginsX,
  } = getContext(GRID_KEY);
</script>

<div
  class="fp-grid-row"
  style={`margin: ${rowMarginsY}px ${rowMarginsX}px`}
>
  <slot />
</div>

<style>
  .fp-grid-row {
    display: grid;
  }
</style>
