<!-- `<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown as it is provided natively by the browser. See https://www.filamentgroup.com/lab/select-css.html -->

<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import { Label } from "../Labels";
	import { createId } from "/src/components/utils";

	export let label = "";
	export let options;
	export let optionValue = null;
	export let optionLabel = null;
	export let optgroup = null;
	export let value;
  export let disabled = false;
  export let padding = "var(--select-default-padding)";
  export let fontSize = "var(--select-default-font-size)";

  let isActive = false;
	let componentId = createId();
	$: optionsDataType = typeof options[0] === "object" ? "object" : "primitive";
	// When the `optgroups` object is created it will look like the following.
	// This will allow this <Select> component to render properly with <optgroup> elements.
	// I need to make optgroups look like the following because native select elements can only work with primitive data types. They won't work with objects as the selected option. And then I need to test this with the native select element (by tabbing to it in the UI) to see if everything renders properly and the correct options get selected accurately.
	// let optgroups = {
	//   Sauropods: [
	//     { group: "Sauropods", value: "diplodocus", label: "Diplodocus" },
	//     { group: "Sauropods", value: "saltasaurus", label: "Saltasaurus" },
	//     { group: "Sauropods", value: "apatosaurus", label: "Apatosaurus" },
	//   ],
	//   Theropods: [
	//     { group: "Theropods", value: "tyrannosaurus", label: "Tyrannosaurus" },
	//     { group: "Theropods", value: "velociraptor", label: "Velociraptor" },
	//     { group: "Theropods", value: "deinonychus", label: "Deinonychus" },
	//   ],
	// };
	const optgroups = {};

	onMount(() => {
		if (optgroup) {
			sortOptionsIntoOptgroups();
		}
	});

	// If a user passes an array of objects to the `options` prop and updates that array of objects later while this `<Select>` component is still mounted, then the functions inside the `onMount()` hook will not run again (since this component is already mounted) and the updates to the array of objects will not be reflected in this component's dropdown. The following `afterUpdate()` hook will run the functions inside of it again, if the previously described scenario occurs, which will cause the updates to the array of objects to be reflected in this component's dropdown.
	afterUpdate(() => {
		if (optgroup) {
			sortOptionsIntoOptgroups();
		}
	});

	/**
	 * This function will group the `options` by the order of first appearance of the `optgroup` prop.
	 * https://stackoverflow.com/questions/44887733/group-array-items-by-order-of-their-first-appearance
	 *
	 * How does the JavaScript Array.sort() method work?
	 * https://www.javascripttutorial.net/javascript-array-sort/#:~:text=The%20sort()%20method%20allows,first%20and%20largest%20value%20last.
	 */
	function sortOptionsIntoOptgroups() {
		try {
      // This sort() function will loop through the `options` array that is passed into this component and sort the elements so that the elements with the same `optgroup`s are grouped together.
			const sortedOptions = options.sort(function (a, b) {
				// If `(a[optgroup] !== b[optgroup])`, then sort the two elements so that b (the first element) stays in the lower index position (i.e. b comes first).
				if (a[optgroup] !== b[optgroup]) {
					let indexA = options.findIndex((option) => option[optgroup] === a[optgroup]);
					let indexB = options.findIndex((option) => option[optgroup] === b[optgroup]);
					return indexA - indexB;
				}
				// Otherwise leave them where they are (i.e. do not sort them).
				else {
					return 0;
				}
			});

			let currentOptgroup = "";
			// This for loop will loop through the `sortedOptions` array and create an `optgroups` object. See the `optgroups` object example above for details.
			for (let i = 0; i < sortedOptions.length; i++) {
				if (currentOptgroup !== sortedOptions[i][optgroup]) {
					// Update the currentOptgroup value.
					currentOptgroup = sortedOptions[i][optgroup];
					optgroups[currentOptgroup] = [sortedOptions[i]];
				} else {
					optgroups[currentOptgroup].push(sortedOptions[i]);
				}
			}
		} catch (err) {
			console.error("sortOptionsIntoOptgroups:", err);
		}
	}
</script>

<Label {label} forVal={`fp-select-btn-${componentId}`} id={componentId} />
<div class="select-wrapper" class:isActive class:disabled>
  <!-- For some reason the disabled <select> element doesn't style the background color or text color properly. So when this component is disabled, then the <select> element gets replaced with a <div> element for now - at least until I can figure out what is causing that issue. -->
  {#if disabled}
    <div class="disabled-replacement" style={`padding:${padding}; font-size:${fontSize};`}>
      {value}
    </div>
  {:else}
    <select
      class="select-native"
      style={`padding:${padding}; font-size:${fontSize};`}
      aria-labelledby={componentId} 
      bind:value={value}
      on:change
      {...$$restProps}
      {disabled}
      on:focus={() => isActive = true}
      on:blur={() => isActive = false}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <option value={option}>{option}</option>
        {/each}
      {:else if optionsDataType === "object"}
        {#if optgroup}
          {#each Object.entries(optgroups) as [key, value]}
            <optgroup label={key}>
              {#each value as option}
                <option value={option[optionValue]}>{option[optionLabel]}</option>
              {/each}
            </optgroup>
          {/each}
        {:else}
          {#each options as option}
            <option value={option[optionValue]}>{option[optionLabel]}</option>
          {/each}
        {/if}
      {/if}
    </select>
  {/if}
  <svg width="1em" height="1em" fill="var(--custom-select-text-color, var(--text-color-default))" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);" class:disabled>
    <path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path>
  </svg>
</div>

<style>
  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    background-color: var(--custom-select-bg-color, var(--bg-color-element-default));

    &.isActive {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.disabled {
      border-color: var(--border-color-disabled);
      background-color: var(--bg-color-element-disabled);
      color: var(--text-color-disabled);
    }

    & .disabled-replacement {
      width: 100%;
      border: var(--border-default);
      border-color: var(--border-color-disabled);
      border-radius: var(--border-radius);
      color: var(--text-color-disabled);
    }

    & .select-native {
      display: block;
      width: 100%;
      max-width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      border: var(--border-default);
      border-color: var(--custom-select-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      background-color: transparent;
      color: var(--custom-select-text-color, var(--text-color-default));
      cursor: pointer;
      /* background-image: url('data:image/svg+xml,<svg width="1.2em" height="1.2em" fill="var(--custom-select-text-color, var(--text-color-default))" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);"><path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path></svg>');
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 1em auto, 100%; */

      &:hover {
        box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
      }

      &:focus {
        outline: none;
      }

      & option {
        font-weight: normal;
        color: var(--custom-option-text-color, var(--text-color-default));
      }
    }

    & .select-native::-ms-expand {
      display: none;
    }

    /* Support for rtl text, explicit support for Arabic and Hebrew */
    & *[dir="rtl"] .select-native,
    & :root:lang(ar) .select-native,
    & :root:lang(iw) .select-native {
      background-position: left 0.7em top 50%, 0 0;
      padding: 0.6em 0.8em 0.5em 1.4em;
    }

    /* Disabled styles */
    & .select-native:disabled,
    & .select-native[aria-disabled="true"] {
      border-color: var(--border-color-disabled);
      background-color: var(--bg-color-element-disabled);
      color: var(--text-color-disabled);
      pointer-events: none;
    }

    & svg {
      position: absolute;
      right: 0.7em;
      pointer-events: none;
      
      /* Disabled styles */
      &.disabled {
        fill: var(--text-color-disabled);
      }
    }
  }
</style>
