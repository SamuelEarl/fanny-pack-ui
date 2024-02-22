<script lang="ts">
  import { getContext } from "svelte";
  import { FLEX_GRID_KEY } from "./flex-grid-utils";

  let {
    colGutter,
    rowGutter,
    rowMarginsY,
    rowMarginsX,
  } = getContext(FLEX_GRID_KEY);
</script>

<!-- <div
  class="fp-flex-row"
  style={`margin: ${rowMarginsY}px ${rowMarginsX}px`}
> -->
<div
  class="fp-flex-row"
  style={`margin: -${rowGutter}px 0`}
>
  <slot />
</div>

<style>
  .fp-flex-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
