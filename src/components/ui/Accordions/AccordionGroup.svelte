<script context="module">
  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";

  export let border = true;
  export let groupPadding = "var(--accordion-default-group-padding)";
  export let accordionTitlePadding = "var(--accordion-default-title-padding)";
  export let fontSize = "var(--accordion-default-font-size)";
  export let spaceBetweenAccordions = "var(--accordion-default-space-between-accordions)";

  setContext(ACCORDION_KEY, {
    "accordionTitlePadding": accordionTitlePadding,
    "fontSize": fontSize,
    "spaceBetweenAccordions": spaceBetweenAccordions,
  });
</script>

<div
  class={`${border ? "fp-accordion-group" : ""}`} 
  style={`padding:${groupPadding};`}
>
  <slot></slot>
</div>

<style>
  .fp-accordion-group {
    border: 1px solid var(--border-color-default);
    border-radius: var(--border-radius);
  }
</style>
