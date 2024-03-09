<script lang="ts">
  import { createId } from "/src/components/utils";
  import { Label } from "../Labels";

  export let type = "text";
  export let value = "";
  export let label = "";
  export let list = "";
  export let padding = "var(--input-default-padding)";
  export let fontSize = "var(--input-default-font-size)";
  export let min = null;
  export let max = null;
  export let step = "any";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();

  const inputStyles = `padding:${padding}; font-size:${fontSize};`;
</script>


<!-- 
  NOTE: If I try to set the `type` attribute to a dynamic prop, then I get this error:
  "type" attribute cannot be dynamic if input uses two-way binding
  So I have to repeat a lot of code for each input type.
-->
<Label {label} forVal={`fp-input-${componentId}`} />
{#if type === "text"}
  <input
    type="text"
    bind:value={value}
    {list}
    class="fp-input"
    style={inputStyles}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "number"}
  <input
    type="number"
    bind:value={value}
    {list}
    class="fp-input"
    style={inputStyles}
    {min}
    {max}
    {step}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "email"}
  <input
    type="email"
    bind:value={value}
    {list}
    class="fp-input"
    style={inputStyles}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "password"}
  <input
    type="password"
    bind:value={value}
    class="fp-input"
    style={inputStyles}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{/if}


<style>
  .fp-input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--custom-input-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    background-color: var(--custom-input-bg-color, var(--bg-color-element-default));
    color: var(--custom-input-text-color, var(--text-color-default));

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
