<script>
	import { getContext } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";

	const tab = {};
	const {
    registerTab, 
    selectTab, 
    selectedTab, 
    tabPaddingStyle, 
    tabFontSizeStyle 
  } = getContext(TABS_KEY);
  let tabStyle = getContext("tabStyle");

	registerTab(tab);
</script>

<div
  class={`fp-tabs-tab ${tabStyle}`}
  class:active="{$selectedTab === tab}"
  style={`${tabPaddingStyle} ${tabFontSizeStyle}`}
  {...$$restProps}
  on:click="{() => selectTab(tab)}"
  on:keyup="{() => selectTab(tab)}"
>
	<slot></slot>
</div>

<style>
  @media (--xs-up) {
    .fp-tabs-tab {
      cursor: pointer;

      &.fill {

        &:hover {
          background-color: var(--border-color-default);
        }
        
        &.active {
          background-color: var(--border-color-default);
        }
      }

      &.line {
        margin-bottom: -1px;
        border-bottom: 4px solid transparent;

        &:hover {
          border-color: var(--border-color-default);
        }

        &.active {
          border-color: var(--text-color-default);
        }
      }
    }
  }
</style>
