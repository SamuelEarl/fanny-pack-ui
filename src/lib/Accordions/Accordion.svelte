<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import { ACCORDION_KEY } from "./AccordionGroup.svelte";

  export let id = "";
  export let title;
  export let open = false;

  const { 
    accordionTitlePadding,
    fontSize,
    spaceBetweenAccordions 
  } = getContext(ACCORDION_KEY);

  const accordionPanelPadding = `padding: calc(2 * ${accordionTitlePadding}) ${accordionTitlePadding};`
</script>

<!-- Accordion Wrapper -->
<div class={`fp-accordion-wrapper`} style={`margin-bottom:${spaceBetweenAccordions}`}>
  <!-- Accordion Title -->
  <div
    {id}
    class="fp-accordion-title"
    class:active={open}
    style={`padding:${accordionTitlePadding}; font-size:${fontSize};`}
    on:click={() => open = !open}
    on:keyup={() => open = !open}
  >
    {title}
  </div>

  <!-- Accordion Panel -->
  {#if open}
    <div 
      class="fp-accordion-panel"
      style={`${accordionPanelPadding} font-size:${fontSize};`}
      transition:slide
    >
      <slot></slot>
    </div>
  {/if}
</div>


<style>
  .fp-accordion-wrapper {

    &:last-child {
      margin-bottom: 0 !important;
    }

    & .fp-accordion-title {
      border: var(--border-default);
      border-radius: var(--border-radius);
      background-color: var(--bg-color-element-default);
      color: var(--text-color-default);
      cursor: pointer;

      &:after {
        content: "+"; /* Unicode character for "plus" sign (+) */
        font-weight: bold;
        color: inherit;
        float: right;
        margin-left: 5px;
      }

      &.active:after {
        content: "−"; /* Unicode character for "minus" sign (-) */
      }

      &:hover {
        box-shadow: var(--box-shadow-default);
      }
    }
  }
</style>
