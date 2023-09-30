<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs:
  The calendar is now inside a modal, but that modal does not have quite the same functionality as the <Modal/> component. For example, the "Cancel" and "OK" buttons are not in the footer, they are in the content body. There is no close button in the top, right corner. To provide a consistent theme across all the components I think I might want to update my <Modal/> component. Right now the modal content wrapper has predefined widths, but those widths do not fit smaller components like a calendar or a calculator. The modal content wrapper's predefined width is great for larger components that have a bunch of content (i.e. an article). 
    * Or, if there is a way to still have the calendar or calculator popup inside a modal but popup directly below the field that it is associated with so the user can still see the field, then that would be the best user experience. 
    * Also, if the field is too close to the bottom of the screen to where the calendar or calculator would be hidden when it pops up, I want the screen to scroll up, if necessary, to show the entire calendar or calculator, like how the calculator widget works right now.
  * I need to clean up the CSS and make sure that it uses accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
      * I need to change the styles for the other components to also use accessible principles.
  * I need to test the accessibility on the input field and the button. The example from the link above focuses on the accessibility of the calendar, but it doesn't talk about the input field or button accessbility. So I need to make sure those have been designed with accessibility in mind too.
-->

<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import Calendar from "./DatePickerCalendar.svelte";
  import { getDateObjFromISODate, isValidDate } from "./utils";
  import { Label } from "../Labels";
  import { createId } from "../fp-utils";

  export let label = "";
  export let value:string;
  /** Checks whether the ISO date string is valid */
  export let isValid = false;
  export let paddingV = "var(--date-picker-input-default-padding-v)";
  export let paddingH = "var(--date-picker-input-default-padding-h)";
  export let fontSize = "var(--date-picker-input-default-font-size)";
  export let placeholder = "YYYY-MM-DD";
  export let btnIcon = "mdi:calendar";
  export let btnIconSize:number = 0;
  export let disabled = false;

  let componentId = createId();
  let focused = false;
  let dialogTopPos = 0;
  let dialogLeftPos = 0;
  let showDialog = false;

  $: dateObjFromVal = getDateObjFromISODate(value);

  // This will update the `isValid` prop when the value changes.
  $: {
    isValid = isValidDate(value);
  }

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  onMount(() => {
    // If the user does not pass a value for the `btnIconSize` prop, then set the value for `btnIconSize` by calling `setBtnIconSize()`.
    if (!btnIconSize) {
      setBtnIconSize();
    }
  });

  function calculateDialogPosition() {
    if (!showDialog) {
      // Get the inputBtnGroup element.
      const inputBtnGroup = document.getElementById(`input-btn-group-${componentId}`);
      // Get the boundingClientRect properties of the inputBtnGroup element.
      const boundingClientRect = inputBtnGroup?.getBoundingClientRect();
      // Get the y-position of the bottom of the inputBtnGroup element and add 2 pixels to it.
      dialogTopPos = boundingClientRect?.bottom + 2;
      // Get the x-position of the left side of the inputBtnGroup element.
      dialogLeftPos = boundingClientRect?.left;
      showDialog = true;
    }
    else {
      showDialog = false;
    }
  }

  /**
   * Get the input field's font-size, even if that size is set in a stylesheet:
   * https://stackoverflow.com/a/15195345/9453009
   */
  function setBtnIconSize() {
    let dateInputField = document.getElementById(`fp-date-picker-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    btnIconSize = parseFloat(style);
  }
</script>

{#if showDialog}
  <Calendar
    top={dialogTopPos}
    left={dialogLeftPos}
    {value} 
    on:change={(event) => {
      value = event.detail;
    }}
    on:hideDialog={() => showDialog = false} 
  />
{/if}

<Label {label} forVal={`fp-date-picker-${componentId}`} />

<div id={`input-btn-group-${componentId}`} class="input-btn-group" class:focused class:disabled>
  <input
    type="text" 
    {placeholder}
    id={`fp-date-picker-${componentId}`}
    style={`font-size:${fontSize}; padding:${paddingV} ${paddingH};`}
    aria-describedby="id-description-1"
    bind:value
    {disabled}
    on:focus={() => focused = true}
    on:blur={() => focused = false}
  >
  <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
  <button
    type="button" 
    class="date-btn"
    style={`padding:${paddingV} calc(${paddingV} + 3px);`}
    aria-label={`Change Date, ${dayLabels[dateObjFromVal.getDay()]} ${monthLabels[dateObjFromVal.getMonth()]} ${dateObjFromVal.getDate()}, ${dateObjFromVal.getFullYear()}`}
    {disabled}
    on:click={calculateDialogPosition}
    on:keyup={calculateDialogPosition}
  >
    <Icon icon={btnIcon} width={btnIconSize} />
  </button>
</div>

<style>
  .screen-reader-only {
    position: absolute;
    top: -2000em;
    left: -3000em;
  }

  .input-btn-group {
    width: 100%;
    display: flex;
    border: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    /* This `overflow: hidden` style will ensure that the background color of the input and button elements goes all the way out to the border no matter how high or low the border radius value is. */
    overflow: hidden;

    &:hover, &.focused {
      box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
    }

    &.disabled {
      pointer-events: none;
    }

    & input {
      flex: 1;
      width: 100%;
      margin: 0;
      border: none;
      outline: none;
      background-color: var(--custom-date-picker-input-bg-color, var(--bg-color-element-default));
      color: var(--custom-date-picker-input-text-color, inherit);

      &::placeholder {
        color: var(--custom-date-picker-input-placeholder-text-color, var(--placeholder-color-default));
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }
    }

    & .date-btn {
      border-left: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-btn-separator-color, var(--border-color-default));
      background-color: var(--custom-date-picker-btn-bg-color, var(--neutral-3));
      color: var(--custom-date-picker-btn-icon-color, inherit);

      &:focus {
        outline: none;
      }

      &:disabled {
        border-color: var(--text-color-disabled);
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }
    }
  }
</style>
