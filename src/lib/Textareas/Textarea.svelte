<script lang="ts">
  import { createId } from "../fp-utils";
  import { Label } from "../Labels";
  
  export let label = "";
  export let id = "";
  export let value = "";
  export let placeholder = "";
  export let disabled = false;
  export let padding = "var(--textarea-default-padding)";
  export let fontSize = "var(--textarea-default-font-size)";

  let componentId = createId();
</script>


<Label {label} forVal={`fp-textarea-${componentId}`} />
<textarea
  bind:value={value}
  {id}
  style={`padding:${padding}; font-size:${fontSize};`}
  on:input
  on:keyup
  on:blur
  {placeholder}
  {disabled}
  {...$$restProps}
></textarea>


<style>
  textarea {
    width: 100%;
    border: var(--border-default);
    border-color: var(--custom-textarea-border-color, var(--border-color-default));
    border-radius: var(--border-radius, 3px);
    background-color: var(--custom-textarea-bg-color, var(--bg-color-element-default));
    color: var(--custom-textarea-text-color, var(--text-color-default));
    outline: none;

    &::placeholder {
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 2px var(--custom-textarea-border-color, var(--border-color-default));
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
