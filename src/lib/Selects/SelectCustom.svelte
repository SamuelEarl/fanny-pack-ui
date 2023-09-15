<!--
  I borrowed some ideas from the Custom Select Box on this How To page:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<script lang="ts">
  import { onMount, afterUpdate, tick, createEventDispatcher } from "svelte";
  import { Label } from "../Labels";
  import { createId, calculateOptionsListHeight } from "../fp-utils";

  export let label = "";
  export let id = "";
  export let options;
  export let optionLabel = null;
  export let optgroup = null;
  export let value;
  export let disabled = false;
  export let padding = "var(--select-default-padding)";
  export let fontSize = "var(--select-default-font-size)";

  const dispatch = createEventDispatcher();
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
  let optgroups = {};
  let selectOptionsList;
  let showSelectOptionsList = false;

  const selectStyles = `padding:${padding}; font-size:${fontSize};`;

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
      // This sort() function will loop through the `options` array that is passed into this component and sort the elements so that the elements with the same `optgroup`s are grouped together.
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

  async function toggleOptionsList() {
    showSelectOptionsList = !showSelectOptionsList;
    // There is no need to run the following code if the options list is hidden, so only run it if the options list is shown.
    if (showSelectOptionsList)  {
      calculateOptionsListHeight(componentId, showSelectOptionsList, tick, window);
      // Wait for the options list element to be displayed in the DOM before setting `focus()` on it.
      await tick();
      selectOptionsList.focus();
    }
  }

  function setSelectedOption(option) {
    value = option;
    toggleOptionsList();
    dispatch("change", option);
  }
</script>


<Label {label} forVal={`fp-select-btn-${componentId}`} />
<div
  {id}
  class={`fp-select-container fp-select-container-${componentId}`}
>
  <!-- The <select> element is kept here, but it is hidden to preserve accessibility. -->
  <select bind:value={value} on:change {disabled}>
    {#if optionsDataType === "object"}
      {#if optgroup}
        {#each Object.entries(optgroups) as [key, value]}
          <optgroup label={key}>
            {#each value as option}
              <option value={option[optionLabel]}>{option[optionLabel]}</option>
            {/each}
          </optgroup>
        {/each}
      {:else}
        {#each options as option}
          <option value={option[optionLabel]}>{option[optionLabel]}</option>
        {/each}
      {/if}
    {:else}
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    {/if}
  </select>

  <!-- When the `fp-select-options-list` element is opened, it receives focus. That allows the `fp-select-options-list` to respond to the `blur` event and close the `fp-select-options-list` when the user clicks outside of it. However, if the user clicks on the `fp-select-btn` element, then the `on:click={toggleOptionsList}` listener/handler causes the `fp-select-options-list` element to immediately open again after the `blur` event has fired and then closed the `fp-select-options-list`. However, the `active` class uses a `pointer-events: none` CSS rule to disable any pointer events on both the `fp-select-btn` and `fp-select-btn-overlay` elements when they are active. So the click event will not conflict with the `blur` event. -->  
  <div
    id={`fp-select-btn-${componentId}`} 
    class="fp-select-btn" 
    class:active={showSelectOptionsList}
    class:disabled={disabled}
    on:click={() => {
      if (disabled) return;
      toggleOptionsList();
    }}
  >
    <div 
      class="fp-select-btn-overlay" 
      class:active={showSelectOptionsList}
      style={selectStyles}
      title={optionsDataType === "primitive" ? value : value[optionLabel]}
    >
      {#if optionsDataType === "primitive"}
        {value}
      {:else if optionsDataType === "object"}
        {value[optionLabel]}
      {/if}
    </div>
  </div>

  {#if showSelectOptionsList}
    <div
      id={`fp-select-options-list-${componentId}`}
      class="fp-select-options-list"
      tabindex="-1"
      bind:this={selectOptionsList}
      on:blur={(event) => {
        showSelectOptionsList = false;
      }}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <div 
            class="fp-select-option"
            style={selectStyles}
            on:click={() => setSelectedOption(option)}
            title={option}
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
              style={selectStyles}
              title={key}
            >
              {key}
            </div>
            {#each value as option}
              <div 
                class="fp-select-option"
                style={`${selectStyles} padding-left: calc(2 * ${padding});`}
                on:click={() => setSelectedOption(option)}
                title={option[optionLabel]}
              >
                {option[optionLabel]}
              </div>
            {/each}
          {/each}
        <!-- List the options without optgroups. -->
        {:else}
          {#each options as option}
            <div 
              class="fp-select-option"
              style={selectStyles}
              on:click={() => setSelectedOption(option)}
              title={option[optionLabel]}
            >
              {option[optionLabel]}
            </div>
          {/each}
        {/if}

      {/if}
    </div>
  {/if}
</div>


<style>
  /* The container must be positioned relative */
  .fp-select-container {
    width: 100%;
    position: relative;

    /* Hide the <select> element. */
    & select {
      display: none;
    }

    & .fp-select-btn {
      border: var(--border-default);
      border-color: var(--custom-select-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      background-color: var(--custom-select-bg-color, var(--bg-color-element-default));
      color: var(--custom-select-text-color, var(--text-color-default));
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
      }

      /* Style the arrow inside the select element */
      &:after {
        position: absolute;
        content: "›";
        top: 45%;
        right: 0;
        width: 0;
        height: 0;
        transform: rotate(90deg);
        font-size: 1.5rem;
      }

      &.active {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        pointer-events: none;
      }

      &.disabled {
        border-color: var(--border-color-disabled);
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }

      /* The overlay contains the text for the selected option. */
      & .fp-select-btn-overlay {
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        
        &.active {
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          background-color: rgba(0, 0, 0, 0.1);
          pointer-events: none;
        }
      }
    }
    
    & .fp-select-options-list {
      position: absolute;
      left: 0;
      right: 0;
      overflow-y: auto;
      outline: none;
      border: 2px solid;
      border-color: var(--border-color-default);
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      box-shadow: var(--box-shadow-depth);
      background-color: var(--white);
      color: var(--text-color-default);
      z-index: 100;

      & .fp-select-optgroup-label {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        font-weight: bold;
        pointer-events: none;
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .fp-select-option {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        color: var(--text-color-default);
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        /* For the last option in the select dropdown, make the bottom border 
        transparent so it looks hidden and gives a sharper appearance. */
        &:last-child {
          border-bottom-color: transparent;
        }
      }
    }
  }
</style>
