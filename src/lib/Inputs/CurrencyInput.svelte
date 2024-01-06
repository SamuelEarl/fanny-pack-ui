<!--
  NOTES:
  * Localization: I think the browser will handle localization for the <input type="number"/> field. So users whose currency uses commas instead of periods to separate whole numbers from fractional numbers should be able to type commas into the number input field. I have not figured out how to test that though. There might be an option where I need to pass in a `lang` prop (or something like that) to handle localization for the number input field.
  * Internationalization API, see:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
-->

<script lang="ts">
  import { tick, createEventDispatcher } from "svelte";
  import { createId } from "../utils";
  import { Label } from "../Labels";

  export let value = 0;
  export let valAlign = "right";
  export let locale = "en-US";
  export let currency = "USD";
  export let label = "";
  export let padding = "var(--input-default-padding)";
  export let fontSize = "var(--input-default-font-size)";
  export let labelAlign = "right";
  export let placeholder = "";
  export let disabled = false;

  const dispatch = createEventDispatcher();
  let componentId = createId();
  $: formattedValue = formatValue(value);
  let showNumberInput = false;
  let numberInput;

  const inputStyles = `padding:${padding}; font-size:${fontSize};`;

  async function handleTextInputFocus() {
    showNumberInput = true;
    await tick();
    // Place the focus inside the number input field.
    // NOTE: This `focus()` method is unnecessary for browsers, but it might be necessary to explicitly set the focus on the `numberInput` in order to bring up a virtual keyboard on mobile devices. TODO: I will need to test this, though.
    numberInput.focus();
    // Highlight the value.
    numberInput.select();
  }

  /**
   * If the user clicks outside of the input field or presses "Enter" or "Esc",
   * then hide the "number" input field and show the "text" input field.
   */
  async function loseFocus(event) {
    // NOTE: `event.keyCode` is deprecated. Use `event.key` instead. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key.
    if (event.type === "blur" || event.key === "Enter" || event.key === "Escape") {
      // If a user deletes the number in the "number" input field and does not enter another number in its place, then `value` will be `null`. The `formatValue()` function will format `null` to be `$0.00`, so it will appear to be a valid value to the user. However, since `value` is actually `null` there could be unexpected errors when `value` gets passed to another part of the app or saved to the database. To prevent any possible problems, the following `if` statement will set any values that are either `null` or `undefined` back to their default value of 0.
      if (value === null || value === undefined) {
        value = 0;
      }
      // Remove all decimals numbers longer than 2 decimal places.
      // Use the `toFixed()` method to handle decimal numbers. See https://javascript.info/number#imprecise-calculations.
      value = Number(value.toFixed(2));
      showNumberInput = false;

      // The `on:blur` event is already used by the <input type="number" /> component (in this file) to switch the input field from a number input back to a text input. So this component is unable to forward the blur event like you normally would in Svelte. Instead, this component manually dispatches the blur event here when the user clicks outside of the input field or presses "Enter" or "Esc". This will act the same as if the blur event were forwarded. The main difference is that the `blur` event will be found on the `event.detail` object rather than the `event` object.
      if (event.type === "blur") {
        dispatch("blur", event);
      }
    }
  }

  // See the `loseFocus()` function above for some background about this `formatValue()` function.
  function formatValue(value) {
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
  }
</script>


<Label {label} forVal={`fp-input-${componentId}`} {labelAlign} />
{#if showNumberInput}
  <!-- Using a "number" input here will allow a user's device to display a numeric virtual keyboard when the user clicks inside this input field. -->
  <input
    type="number"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    step="0.01"
    min="0.00"
    placeholder={placeholder}
    disabled={disabled}
    bind:value={value}
    bind:this={numberInput}
    on:keyup={loseFocus}
    on:blur={loseFocus}
    on:change
    on:input
  />
{:else}
  <input
    type="text"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    placeholder={placeholder}
    disabled={disabled}
    bind:value={formattedValue}
    on:focus={handleTextInputFocus}
  />
{/if}


<style>
  /* Remove Arrows/Spinners */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .fp-currency-input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--custom-input-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    background-color: var(--custom-input-bg-color, var(--bg-color-element-default));
    color: var(--custom-input-text-color, var(--text-color-default));

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }

    &::placeholder {
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 2px var(--custom-input-border-color, var(--border-color-default));
    }

    &:disabled {
      border-color: var(--border-color-disabled);
      box-shadow: none;
      color: var(--text-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }
  }
</style>
