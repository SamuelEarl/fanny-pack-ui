<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";

  export let label;
  export let forVal;
  export let id = "";
  export let labelAlign = "left";
  export let tooltipIcon = "entypo:info-with-circle";
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div
    class={`fp-label-container ${labelAlign}`}
    style="margin-bottom: var(--label-default-margin-bottom);"
  >
    <label 
      for={forVal}
      {id}
      style="font-size: var(--label-default-font-size);"
    >
      {label}
    </label>
    {#if tooltipText}
      <Tooltip tooltipText={tooltipText}>
        <Icon icon={tooltipIcon} />
      </Tooltip>
    {/if}
  </div>
{/if}


<style>
  .fp-label-container {

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
</style>
