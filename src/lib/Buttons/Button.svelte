<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  import { delay } from "$lib/utils";

  export let type = "button";
  export let bgColor = "var(--btn-default-bg-color)";
  export let borderColor = "var(--btn-default-border-color)";
  export let textColor = "var(--btn-default-text-color)";
  export let padding = "var(--btn-default-padding)";
  export let fontSize = "var(--btn-default-font-size)";
  // export let hollow = false;
  export let width = "auto";
  export let disabled = false;
  export let formIsInvalid = false;
  export let btnIcon = "";
  export let btnIconDisabled = "icomoon-free:spinner2";
  export let btnIconSide = "right";
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
  export let rotateBtnIcon = "0deg";
  export let rotateBtnIconDisabled = "0deg";

  const dispatch = createEventDispatcher();

  // Set the background, border, outline, and text colors.
  const btnColorStyles = `background-color:${bgColor}; border-color:${borderColor}; outline-color:${borderColor}; color:${textColor};`;
  // Set the padding and font sizes.
  const btnSizeStyles = `padding:${padding}; font-size:${fontSize};`;

  // If no button text slots are passed to this component, then `btnTextSlotsExist` will be `false`.
  const btnTextSlotsExist = Object.keys($$slots).length !== 0;

  /**
   * NOTE: These `btnIconStyles` will only be applied to <Button> 
   * components that have both a `btnIcon` and `btnIconDisabled` prop.
   * They will NOT be applied to icons that are passed in a slot.
   */
  function getBtnIconStyles() {
    let iconStyles = "";
    // Icon Buttons do not have any text. So if no button text slots are passed to this component, then `btnTextSlotsExist` will be false and no `order` or `margin` styles will be set on the icon.
    if (btnTextSlotsExist) {
      if (btnIconSide === "left") {
        iconStyles = `order: -9999; margin-right: calc(${fontSize} - 5px);`;
      }
      if (btnIconSide === "right") {
        iconStyles = `order: 9999; margin-left: calc(${fontSize} - 5px);`;
      }
    }
    return iconStyles;
  }
  const btnIconStyles = getBtnIconStyles();

  function addOutline(event) {
    event.target.style.outlineWidth = "2px";
    // If the user tabs over to the button, then change the outlineStyle to "dashed".
    if (event.key === "Tab") {
      event.target.style.outlineStyle = "dashed";
    }
  }

  function removeOutline(event) {
    console.log("lost focus");
    event.target.style.outlineWidth = "0";
    // When the button loses focus, then reset the outlineStyle to the default style.
    event.target.style.outlineStyle = "solid";
  }

  function addExtraOutline(event) {
    event.target.style.outlineWidth = "4px";
  }

  function removeExtraOutline(event) {
    event.target.style.outlineWidth = "2px";
  }
</script>

<!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
<!-- Even though I am using hover states to add and remove the button outline, I need to use on:mouseenter and on:mouseleave in order to add and remove the button outline after a user clicks a button. If I don't use those mouse event listeners, then the outlineWidth will not get reset to its default size when a user hovers away from the button. -->
<button
  {type}
  class={`fp-btn ${type === "submit" && formIsInvalid ? "form-is-invalid" : ""} ${borderColor === "transparent" ? "transparent-border" : "non-transparent-border"}`}
  style={`${btnColorStyles} ${btnSizeStyles} ${width === "full" ? "width: 100%" : ""}`}
  {disabled}
  {...$$restProps}
  on:mouseenter={addOutline}
  on:mouseleave={removeOutline}
  on:keyup={addOutline}
  on:blur={removeOutline}
  on:click={async (event) => {
    addExtraOutline(event);
    await delay(150);
    removeExtraOutline(event);
    dispatch("click");
  }}
  on:touchstart={addOutline}
  on:touchend={async (event) => {
    await delay(150);
    removeOutline(event);
  }}
>
  <!-- Button Text -->
  {#if $$slots.btnTextDisabled && disabled}
    <slot name="btnTextDisabled">Disabled Button Text</slot>
  {:else if $$slots.default}
    <slot>Button Text</slot>
  {/if}

  <!-- Button Icon -->
  <!-- If the btnIcon and the btnIconDisabled both exist, then display the icon. If either the btnIcon or btnIconDisabled is an empty string, then no icons will be displayed with the button. See the docs for details. -->
  {#if btnIcon && btnIconDisabled}
    <!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
    {#if type === "submit" && formIsInvalid}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    <!-- If the button is disabled, then... -->
    {:else if disabled}
      <!-- NOTE: You can NOT dynamically bind classes to a component instance, so the <Icon /> component has to be repeated a couple of times - once for the "fp-spin" class and once without. -->
      {#if btnIconDisabledShouldSpin}
        <!-- ...show a spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles}`} class="fp-spin" />
      {:else}
        <!-- ...or show a non-spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles} transform:rotate(${rotateBtnIconDisabled});`} />
      {/if}
    <!-- If the button is not disabled, then show the btnIcon. -->
    {:else}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    {/if}
  {/if}
</button>

<style>
  @media (--xs-up) {
    .fp-btn {
      border-width: 2px;
      border-style: solid;
      outline-width: 0;
      outline-style: solid;
      font-weight: bold;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;

      /* Since I have to use on:mouseenter and on:mouseout to reset the outlineWidth, I don't know if this hover rule is actually doing anything. But I am leaving it here just in case is does affect the button styles. */
      &:hover {
        outline-width: 2px;
      }

      &:disabled {
        outline-color: var(--border-color-disabled) !important;
        pointer-events: none !important;
      }

      &.non-transparent-border:disabled {
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }

      &.form-is-invalid {
        outline-width: 0 !important;
        pointer-events: none !important;
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }
    }
  }
</style>
