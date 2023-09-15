<script context="module">
  export let TABS_KEY = Symbol();
</script>

<script>
	import { setContext, onDestroy } from "svelte";
	import { writable } from "svelte/store";

  export let border = true;
  export let containerPadding = "var(--tabs-default-container-padding)";
  export let tabPadding = "var(--tabs-default-tab-padding)";
  export let tabFontSize = "var(--tabs-default-tab-font-size)";
  export let panelPadding = "var(--tabs-default-panel-padding)";

	const tabsContainer = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

  const tabPaddingStyle = `padding: ${tabPadding};`;
  const panelPaddingStyle = `padding: ${panelPadding};`;
  const tabFontSizeStyle = `font-size: ${tabFontSize};`;

	setContext(TABS_KEY, {
		registerTab: tab => {
			tabsContainer.push(tab);
			selectedTab.update(current => current || tab);
			
			onDestroy(() => {
				const i = tabsContainer.indexOf(tab);
				tabsContainer.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabsContainer[i] || tabsContainer[tabsContainer.length - 1]) : current);
			});
		},

		registerPanel: panel => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabsContainer.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel,
    tabPaddingStyle,
    panelPaddingStyle,
    tabFontSizeStyle,
	});
</script>

<!-- If `border` is true, then include the border styles. -->
<div
  style={`${border ? "border:var(--border-default); border-radius:var(--border-radius);" : ""} padding:${containerPadding};`}
>
	<slot></slot>
</div>
