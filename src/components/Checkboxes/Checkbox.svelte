<script lang="ts">
  import { createId } from "/src/components/utils";
  // Importing an external CSS file into the "style" block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the "script" block.
  import "./checkbox.css";

  export let id = createId();
  export let checked;
  export let label;
  export let disabled = false;
  export let marginBottom = "var(--checkbox-default-margin-bottom)";
  export let verticalAlignment = "var(--checkbox-default-vertical-alignment)";
</script>


<label
  for={id}
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom};`}
>
  <input
    type="checkbox"
    {id}
    class="fp-checkbox-input"
    bind:checked={checked}
    {disabled}
    on:change
    on:input
  > {label}
  <span 
    class="fp-checkbox-checkmark" 
    style={`top: ${verticalAlignment};`}
  ></span>
</label><br>
