<script>
	import { getContext } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";

	const panel = {};
	const {
    registerPanel, 
    selectedPanel,
    panelPaddingStyle, 
  } = getContext(TABS_KEY);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div style={`${panelPaddingStyle}`}>
    <slot></slot>
  </div>
{/if}
