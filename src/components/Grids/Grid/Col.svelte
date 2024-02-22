<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  // Number of columns for each breakpoint.
  export let xs = 0;
  export let sm = 0;
  export let md = 0;
  export let lg = 0;
  export let xl = 0;
  export let xxl = 0;

  let {
    equalColWidths,
    colPaddingY,
    colPaddingX, 
  } = getContext(GRID_KEY);

  const breakpointNames = ["xs", "sm", "md", "lg", "xl", "xxl"];

  // Create the set of classes that the column <div> element will have.
  $: columnClasses = [xs, sm, md, lg, xl, xxl]
    .map((numberOfColumns, i) => {
      let breakpoint = breakpointNames[i];

      if (numberOfColumns) {
        return `fp-${breakpoint}-${numberOfColumns}`;
      }
    })
    .filter(Boolean)
    .join(" ");
</script>

<div 
  class={`fp-grid-col ${columnClasses}`}
  class:fp-equal-col-widths={equalColWidths}
  style={`padding: ${colPaddingY}px ${colPaddingX}px`}
>
  <slot />
</div>

<style>
  .fp-equal-col-widths {
    flex: 1;
  }

  .fp-grid-col {

    @media (--xs-up) {
      &.fp-xs-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xs-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xs-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xs-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xs-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xs-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xs-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xs-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xs-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xs-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xs-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xs-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--sm-up) {
      &.fp-sm-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-sm-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-sm-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-sm-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-sm-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-sm-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-sm-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-sm-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-sm-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-sm-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-sm-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-sm-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--md-up) {
      &.fp-md-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-md-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-md-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-md-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-md-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-md-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-md-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-md-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-md-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-md-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-md-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-md-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--lg-up) {
      &.fp-lg-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-lg-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-lg-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-lg-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-lg-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-lg-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-lg-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-lg-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-lg-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-lg-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-lg-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-lg-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xl-up) {
      &.fp-xl-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xl-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xl-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xl-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xl-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xl-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xl-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xl-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xl-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xl-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xl-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xl-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xxl-up) {
      &.fp-xxl-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fp-xxl-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fp-xxl-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fp-xxl-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fp-xxl-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fp-xxl-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fp-xxl-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fp-xxl-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fp-xxl-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fp-xxl-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fp-xxl-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fp-xxl-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }
  }
</style>
