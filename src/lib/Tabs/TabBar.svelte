<script lang="ts">
  import { setContext } from "svelte";

  export let tabStyle = "line"; // Possible values: "fill", "line"
  export let marginBottom = "var(--tabs-default-tab-bar-margin-bottom)";

  setContext("tabStyle", tabStyle);
</script>

<div 
  class={`fp-tabs-tab-bar ${tabStyle}`} 
  style={`margin-bottom:${marginBottom};`}>
	<slot></slot>
</div>

<style>
  @media (--xs-up) {
    .fp-tabs-tab-bar {
      display: flex;

      &.fill {
        border: var(--border-default);
        border-radius: var(--border-radius);
        overflow: hidden;
        background-color: var(--bg-color-element-default);
        color: var(--text-color-default);

        &:hover {
          box-shadow: 0 0 0 1px var(--border-color-default);;
        }
      }

      &.line {
        border-bottom: var(--border-default);

        &:hover {
          box-shadow: 0 1px 0 0 var(--border-color-default);
        }
      }
    }
  }
</style>
