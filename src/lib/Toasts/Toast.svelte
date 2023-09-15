<script lang="ts">
  import { toastContent } from "./toast-store";

  export let duration = 7000;
  export let fontSize = "1.15rem";

  $: clearToastAfterDuration($toastContent);
  let timeout;

  /**
   * Clear any previous timeouts otherwise you could get inconsistent timers.
   * https://stackoverflow.com/a/1472717/9453009
   */
  function clearToastAfterDuration(unusedParam) {
    // Clear any previous timeouts.
    clearTimeout(timeout);
    // // Set a new timeout.
    // timeout = setTimeout(() => toastContent.set(null), duration);

    // If the user calls `ToastContent.set()` and does not set a custom duration for the toast, then use the default duration that is passed into this component.
    if ($toastContent && !$toastContent.duration) {
      // If the default duration is `Infinity`, then return without clearing the toast. The user will have to close the toast by clicking the "x".
      if (duration === Infinity) {
        return;
      }
      // If the default duration is a number other than Infinity, then clear the toast after the duration has lapsed.
      else {
        // Set a new timeout.
        timeout = setTimeout(() => toastContent.set(null), duration);
      }
    }
    // If the user calls `ToastContent.set()` and sets the duration for the toast to `Infinity`, then return withoug clearing the toast. The user will have to close the toast by clicking the "x".
    else if ($toastContent && $toastContent.duration === Infinity) {
      return;
    }
    // If the user calls `ToastContent.set()` and sets a custom duration for the toast, then use that custom duration before clearing the toast.
    else if ($toastContent) {
      // Set a new timeout.
      timeout = setTimeout(() => toastContent.set(null), $toastContent.duration);
    }
  }
</script>


{#if $toastContent}
  <div 
    id="toast" 
    class={`${$toastContent.type}`}
    style={`font-size: ${fontSize};`}
  >
    <div class="msg">
      {$toastContent.msg}
    </div>
    <div class="close" on:click={() => {
      clearTimeout(timeout);
      toastContent.set(null);
    }}>&times;</div>
  </div>
{/if}


<style>
  #toast {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;

    &.info {
      background-color: var(--info-color);  
      color: var(--text-color-for-info-bg);
    }

    &.success {
      background-color: var(--success-color);
      color: var(--text-color-for-success-bg);
    }
    
    &.warning {
      background-color: var(--warning-color);
      color: var(--text-color-for-warning-bg);
    }

    &.error {
      background-color: var(--error-color);
      color: var(--text-color-for-error-bg);
    }

    & .msg {
      flex: 1;
      padding: 20px;
    }

    & .close {
      width: 50px;
      font-size: 2rem;
      font-weight: normal;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
