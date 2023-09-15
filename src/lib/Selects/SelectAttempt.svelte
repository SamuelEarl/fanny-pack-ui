<!-- TODO: Incorporate the calculateOptionsListHeight function. -->

<!--
  Look at these articles:
  * I like this one because it uses a native select element, which works well on mobile devices, and this approach tries to be as accessible as possible: https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/ 
  * This seems like a good approach, but since ul and li elements are used instead of a native select element, then it won't work as well on mobile devices: https://24ways.org/2019/making-a-better-custom-select-element/
-->
<script lang="ts">
  import { onMount, afterUpdate, tick, createEventDispatcher } from "svelte";
  import { Label } from "../Labels";
  import { createId } from "$lib/fp-utils";

  export let label = "";
  export let options;
  // Native select elements can only handle primitive data types. So I need to rework the <Select /> component so that if an array of objects is passed to it, then it will convert it to an array of primitives. If a user passes an array of objects to this <Select /> component, then they will need to specify which property in each object will be the value for each option and which property will be the label for each option.
  export let optionValue = null;
  export let optionLabel = null;
  export let optgroup = null;
  export let value;
  $: console.log("VALUE PROP:", value);

  const dispatch = createEventDispatcher();
  let selectCustom;
  let componentId = createId();
  let optionsDataType;
  // When the `optgroups` object is created it will look like the following.
  // This will allow this <Select> component to render properly with <optgroup> elements.
  // let optgroups = {
  //   Sauropods: [
  //     { name: "Diplodocus", group: "Sauropods" },
  //     { name: "Saltasaurus", group: "Sauropods" },
  //     { name: "Apatosaurus", group: "Sauropods" },
  //   ],
  //   Theropods: [
  //     { name: "Tyrannosaurus", group: "Theropods" },
  //     { name: "Velociraptor", group: "Theropods" },
  //     { name: "Deinonychus", group: "Theropods" },
  //   ],
  // };
  // UPDATE: I need to make optgroups look like the following because native select elements can only work with primitive data types. They won't work with objects as the selected option. And then I need to test this with the native select element (by tabbing to it in the UI) to see if everything renders properly and the correct options get selected accurately.
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
  // $: console.log("optgroups:", optgroups);

  // This component dispatches a custom event called `change`, so you can call an event handler when a user selects a value in the <Select /> component. The customizations in this <Select /> component won't allow for forwarding the broswer `change` event when someone uses a mouse to interact with this component, but this dispatched custom `change` event will allow you to respond to changes in the <Select /> component's value.
  $: dispatch("change", value);

  let isActive = false;
  // $: console.log("isActive:", isActive);

  onMount(() => {
    determineOptionsDataType(options);
    if (optgroup) {
      sortOptions();
    }
  });

  // If a user passes an array of objects to the `options` prop and updates that array of objects later while this `<Select>` component is still mounted, then the functions inside the `onMount()` hook will not run again (since this component is already mounted) and the updates to the array of objects will not be reflected in this component's dropdown. The following `afterUpdate()` hook will run the functions inside of it again, if the previously described scenario occurs, which will cause the updates to the array of objects to be reflected in this component's dropdown.
  afterUpdate(() => {
    determineOptionsDataType(options);
    if (optgroup) {
      sortOptions();
    }
  });

  /**
   * This function will determine the data type of the data structures that are inside the `options` array.
   * The result will be either `array`, `object`, or `primitive`.
   */
   function determineOptionsDataType(options) {
    try {
      if (options?.length > 0) {
        // NOTE: I am keeping this code here in case I want to support nested arrays as an `options` data structure.
        // `typeof options[0] === "object"` will return `true` for arrays, so it is necessary to check for arrays with Array.isArray() before checking for objects. Otherwise an `options` array that contains nested arrays will be designated as an array of objects.
        // if (Array.isArray(options[0])) {
        //   optionsDataType = "array";
        // }
        if (typeof options[0] === "object") {
          optionsDataType = "object";
        }
        else {
          optionsDataType = "primitive";
        }
      }
    }
    catch(err) {
      console.error("determineOptionsDataType:", err);
    }
  }

  /**
   * This function will group the `options` by the order of first appearance of the `optgroup` prop.
   * https://stackoverflow.com/questions/44887733/group-array-items-by-order-of-their-first-appearance
   * 
   * How does the JavaScript Array.sort() method work?
   * https://www.javascripttutorial.net/javascript-array-sort/#:~:text=The%20sort()%20method%20allows,first%20and%20largest%20value%20last.
   */
   function sortOptions() {
    try {
      options.sort(function(a, b) {        
        // If `(a[optgroup] !== b[optgroup])`, then sort the two elements so that b (the first element) stays in the lower index position (i.e. b comes first).
        if (a[optgroup] !== b[optgroup]) {
          let indexA = options.findIndex(option => option[optgroup] === a[optgroup]);
          let indexB = options.findIndex(option => option[optgroup] === b[optgroup]);
          return indexA - indexB;
        }
        // Otherwise leave them where they are (i.e. do not sort them).
        else {
          return 0;
        }
      });

      let currentOptgroup = "";
      // This for loop will loop through the `options` array that is passed into this component and create an `optgroups` object. See the `optgroups` object example above for details.
      for (let i = 0; i < options.length; i++) {
        if (currentOptgroup !== options[i][optgroup]) {
          // Update the currentOptgroup value.
          currentOptgroup = options[i][optgroup];
          optgroups[currentOptgroup] = [ options[i] ];
        }
        else {
          optgroups[currentOptgroup].push(options[i]);
        }
      }
    }
    catch(err) {
      console.error("sortOptions:", err);
    }
  }

  let selectedOptionIndex = 0;
  // $: console.log("selectedOptionIndex:", selectedOptionIndex);
  async function supportKeyboardNavigation(event) {
    // Set the initial value of `selectedOptionIndex`.
    if (optionsDataType === "primitive") {
      selectedOptionIndex = options.findIndex(element => element === value);
    }
    if (optionsDataType === "object") {
      selectedOptionIndex = options.findIndex(element => element[optionValue] === value);
    }

    // Press down -> go next.
    if (event.keyCode === 40 && selectedOptionIndex < options.length - 1) {
      event.preventDefault(); // prevent page scrolling
      selectedOptionIndex += 1;
    }

    // Press up -> go previous.
    if (event.keyCode === 38 && selectedOptionIndex > 0) {
      event.preventDefault(); // prevent page scrolling
      selectedOptionIndex -= 1;
    }

    // Set the value to equal the option that was selected.
    if (optionsDataType === "primitive") {
      value = options[selectedOptionIndex];
    }
    if (optionsDataType === "object") {
      value = options[selectedOptionIndex][optionValue];
    }

    // Press Enter or space -> select the option.
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      isActive = !isActive;
    }

    // Press ESC -> close selectCustom.
    if (event.keyCode === 27) {
      isActive = false;
    }
  }
</script>

<!-- If the selectCustom element has focus (i.e. is the `document.activeElement`), 
  then call the `supportKeyboardNavigation` function on `keydown` events. -->
<svelte:document on:keydown={document.activeElement === selectCustom ? supportKeyboardNavigation : null} />

<div class="select">
	<!-- <span class="selectLabel" id={componentId}> Main job role</span> -->
  <Label {label} forVal={`fp-select-btn-${componentId}`} id={componentId} />
	<div class="selectWrapper">
    <!-- elSelectNative -->
    <select 
      class="selectNative js-selectNative" 
      aria-labelledby={componentId}
      bind:value={value}
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

		<!-- Hide the custom select from AT (e.g. SR) using aria-hidden -->
    <!-- elSelectCustom -->
    <!-- 
      In a blur event, the "event.target" is the element that has lost focus.
      When the `selectCustom` element `isActive` (i.e. opened), it receives focus. That allows the `selectCustom` to respond to the `blur` event and set `isActive` to `false when the user clicks outside of it.
    -->
		<div 
      class="selectCustom js-selectCustom"
      class:isActive 
      aria-hidden={isActive}
      tabindex="-1"
      bind:this={selectCustom}
      on:blur={(event) => {
        const selectCustomLostfocus = selectCustom.contains(event.target);
        if (selectCustomLostfocus) {
          isActive = false;
        }
      }}
    >
      <!-- elSelectCustomBox -->
			<div
        class="selectCustom-trigger"
        on:click={async () => {
          isActive = !isActive;
          await tick();
          selectCustom.focus();
        }}
        on:keydown={async () => {
          isActive = !isActive;
          await tick();
          selectCustom.focus();
        }}
      >
      {#if optionsDataType === "primitive"}
        {value}
      {:else if optionsDataType === "object"}
        <!-- When a mouse user selects an option from the selectCustom element, they are setting the `value` prop to equal the `option[optionValue]` property (which is just a primitive value, not the entire object inside the `options` array). But when `optionsDataType === "object"`, then the property that needs to be displayed is the `option[optionLabel]` property. So the code inside the following curly braces will find the object inside the `options` array whose `optionValue` property matches the value that was selected, then it will pull off the value of the `optionLabel` property and return the `optionLabel` property. -->
        <!-- {options.find(obj => obj[optionValue] === value)[optionLabel]} -->
      {/if}
      </div>
      <!-- elSelectCustomOpts -->
			<div class="selectCustom-options">
        {#if optionsDataType === "primitive"}
          {#each options as option}
            <div
              class="selectCustom-option" 
              class:isHighlighted={option === value}
              data-value={option}
              title={option}
              on:click={() => {
                value = option;
                isActive = false;
              }}
              on:keydown={() => {
                value = option;
                isActive = false;
              }}
            >
              {option}
            </div>
          {/each}
        
        {:else if optionsDataType === "object"}
          <!-- List the options under their respective optgroups. -->
          {#if optgroup}
            {#each Object.entries(optgroups) as [key, value]}
              <div 
                class="fp-select-optgroup-label"
                title={key}
              >
                {key}
              </div>
              {#each value as option}
                <div 
                  class="selectCustom-option" 
                  class:isHighlighted={option[optionValue] === value}
                  data-value={option[optionValue]}
                  title={option[optionLabel]}
                  on:click={() => {
                    console.log("option value property:", option[optionValue]);
                    value = option[optionValue];
                    console.log("value:", value);
                    isActive = false;
                  }}
                  on:keydown={() => {
                    value = option[optionValue];
                    isActive = false;
                  }}
                >
                  {option[optionLabel]}
                </div>
              {/each}
            {/each}
          <!-- List the options without optgroups. -->
          {:else}
            {#each options as option}
              <div
                class="selectCustom-option" 
                class:isHighlighted={option[optionValue] === value}
                data-value={option[optionValue]}
                title={option[optionLabel]}
                on:click={() => {
                  value = option[optionValue];
                  isActive = false;
                }}
                on:keydown={() => {
                  value = option[optionValue];
                  isActive = false;
                }}
              >
                {option[optionLabel]}
              </div>
            {/each}
          {/if}
        {/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Both native and custom selects must have the same width/height. */
	.selectNative,
	.selectCustom {
		position: relative;
		width: 22rem;
		height: 4rem;
	}

	/* Make sure the custom select does not mess with the layout */
	.selectCustom {
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}

	/* This media query detects devices where the primary */
	/* input mechanism can hover over elements. (e.g. computers with a mouse) */
	@media (hover: hover) {
		/* Since we are using a mouse, it's safe to show the custom select. */
		.selectCustom {
			display: block;
		}

		/* In a computer using keyboard? Then let's hide back the custom select */
		/* while the native one is focused: */
		.selectNative:focus + .selectCustom {
			display: none;
		}
	}

	/* Add the focus states too, They matter, always! */
	.selectNative:focus,
	.selectCustom.isActive .selectCustom-trigger {
		outline: none;
		box-shadow: white 0 0 0 0.2rem, #ff821f 0 0 0 0.4rem;
	}

	/* Rest of the styles to create the custom select. */
	/* Just make sure the native and the custom have a similar "box" (the trigger). */

	.select {
		position: relative;
	}

	/* .selectLabel {
		display: block;
		font-weight: bold;
		margin-bottom: 0.4rem;
	} */

	.selectWrapper {
		position: relative;
	}

	.selectNative,
	.selectCustom-trigger {
		font-size: 1.6rem;
		background-color: #fff;
		border: 1px solid #6f6f6f;
		border-radius: 0.4rem;
	}

	.selectNative {
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: 100%;
		background-position-y: 0.8rem;
		padding: 0rem 0.8rem;
	}

	.selectCustom-trigger {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 0.8rem 0.8rem;
		cursor: pointer;
	}

	.selectCustom-trigger::after {
		content: '▾';
		position: absolute;
		top: 0;
		line-height: 3.8rem;
		right: 0.8rem;
	}

	.selectCustom-trigger:hover {
		border-color: #8c00ff;
	}

	.selectCustom-options {
		position: absolute;
		top: calc(3.8rem + 0.8rem);
		left: 0;
		width: 100%;
		border: 1px solid #6f6f6f;
		border-radius: 0.4rem;
		background-color: #fff;
		box-shadow: 0 0 4px #e9e1f8;
		z-index: 1;
		padding: 0.8rem 0;
		display: none;
	}

	.selectCustom.isActive .selectCustom-options {
		display: block;
	}

	.selectCustom-option {
		position: relative;
		padding: 0.8rem;
		padding-left: 2.5rem;
	}

	.selectCustom-option.isHighlighted,
	.selectCustom-option:hover {
		background-color: #865bd7; /* contrast AA */
		color: white;
		cursor: default;
	}

	.selectCustom-option:not(:last-of-type)::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #d3d3d3;
	}

	.selectCustom-option.isActive::before {
		content: '✓';
		position: absolute;
		left: 0.8rem;
	}
</style>
