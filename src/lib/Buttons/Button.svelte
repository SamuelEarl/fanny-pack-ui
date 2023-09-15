<script lang="ts">
  import Icon from "@iconify/svelte";

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

  // Set the background, border, and text colors.
  const btnColorStyles = `background-color:${bgColor}; border-color:${borderColor}; color:${textColor};`;
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

  function addBoxShadow(event) {
    event.target.style.boxShadow = `0 0 0 2px ${borderColor}`;
  }

  function removeBoxShadow(event) {
    event.target.style.boxShadow = "none";
  }
</script>

<!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
<button
  {type}
  class={`fp-btn ${type === "submit" && formIsInvalid ? "form-is-invalid" : ""} ${borderColor === "transparent" ? "transparent-border" : "non-transparent-border"}`}
  style={`${btnColorStyles} ${btnSizeStyles} ${width === "full" ? "width: 100%" : ""}`}
  {disabled}
  {...$$restProps}
  on:click
  on:mouseenter={addBoxShadow}
  on:mouseleave={removeBoxShadow}
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
      font-weight: bold;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        box-shadow: none !important;
        pointer-events: none !important;
      }

      &.non-transparent-border:disabled {
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }

      &.form-is-invalid {
        box-shadow: none !important;
        pointer-events: none !important;
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }
    }
  }
</style>
