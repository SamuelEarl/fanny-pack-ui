<script lang="ts">
  export let id;
  export let group;
  export let value;
  export let label = value;
  export let disabled = false;
  export let marginBottom = "var(--radio-default-margin-bottom)";
  export let verticalAlignment = "var(--radio-default-vertical-alignment)";
</script>


<label
  for={id}
  class="fp-radio-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom}`}
>
  <input
    type="radio" 
    {id}
    class="fp-radio-input" 
    bind:group={group} 
    {value} 
    {disabled}
    on:change
    on:input
  > {label}
  <span
    class="fp-radio-checkmark"
    style={`top: ${verticalAlignment}`}
  ></span>
</label>


<style>
  /* Radio Button Styles: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */

  /* Customize the label (the container). */
  .fp-radio-label-wrapper {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 1rem;
    /* -webkit-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    user-select: none;
    
    /* On mouse-over of an unselected radio button, add a thicker outline to the radio button. */
    &:hover .fp-radio-input ~ .fp-radio-checkmark {
      box-shadow: var(--box-shadow-default);
    }

    /* On mouse-over of a selected radio button, add a thicker outline to the radio button that matches the background color. */
    &:hover .fp-radio-input:checked ~ .fp-radio-checkmark {
      box-shadow: var(--box-shadow-primary);
    }
  
    /* Hide the browser's default radio button. */
    & .fp-radio-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      /* When the radio button is selected, add a colored background. */
      &:checked ~ .fp-radio-checkmark {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
      }

      /* Show the checkmark when checked. */
      &:checked ~ .fp-radio-checkmark:after {
        display: block;
      }
    }

    /* Create a custom radio button. */
    & .fp-radio-checkmark {
      position: absolute;
      left: 0;
      height: 25px;
      width: 25px;
      border: var(--border-default);
      border-radius: 50%;
      background-color: var(--bg-color-element-default);

      /* Create the checkmark/indicator. */
      &:after {
        /* Hide the checkmark/indicator when not checked. */
        content: "";
        position: absolute;
        display: none;

        /* Style the checkmark/indicator. */
        top: 7px;
        left: 7px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: white;
      }
    }

    /* Disabled radio buttons styles */
    & .fp-radio-input:disabled ~ .fp-radio-checkmark {
      border-color: var(--border-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }
    /* On mouse-over of an disabled radio button, prevent the thicker outline from appearing around the radio button. */
    &:hover .fp-radio-input:disabled ~ .fp-radio-checkmark {
      box-shadow: none;
    }
    /* Set `cursor: default` on the label text of a disabled radio button. */
    &.disabled {
      cursor: default;
    }
  }
</style>
