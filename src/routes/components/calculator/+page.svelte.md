<script lang="ts">
  import { Button, Calculator, CurrencyInput, Input } from "/src/lib";
  import Icon from "@iconify/svelte";

  let amount = 0;
  let currencyAmount = 0;
  let decimalPlaces = 2;
  let showCalculator = false;
</script>

# Calculator

---

## Example Usage

<div class="amount">
  Amount: {amount}
</div>
<Calculator
  actionBtnText="Update Amount"
  {decimalPlaces}
  on:calculateTotal={event => amount = event.detail} 
/>
<br>
<div class="decimal-places-group">
  <div class="label">What is the max number of decimal<br>places that the result should have?</div>
  <div class="input">
    <Input
      type="number"
      bind:value={decimalPlaces}
    />
  </div>
</div>

<br>

```svelte
<script lang="ts">
  import { Calculator } from "@fanny-pack-ui/svelte-kit";

  let amount = 0;
  let decimalPlaces = 2;
</script>

<div class="amount">
  Amount: {amount}
</div>
<Calculator
  actionBtnText="Update Amount"
  {decimalPlaces}
  on:calculateTotal={event => amount = event.detail} 
/>
```

---

<div class="calc-group">
  <div class="input-btn-group">
    <CurrencyInput bind:value={currencyAmount} />
    <Button
      btnIcon=""
      bgColor="var(--secondary-color)"
      borderColor="var(--secondary-color)"
      padding="10px"
      on:click={() => showCalculator = !showCalculator}
    >
      <Icon icon="bx:calculator" width="20" />
    </Button>
  </div>
  {#if showCalculator}
    <div class="calc-container-outer">
      <div class="calc-container-inner">
        <Calculator
          on:calculateTotal={event => currencyAmount = event.detail} 
          on:hideCalculator={() => showCalculator = false}
        />
      </div>
    </div>
  {/if}
</div>

---

## Keyboard Shortcuts

**I have added "Keyboard Input" tooltips for the necessary buttons, so most of the following notes might be irrelevant now.**

- The `Enter` key:
  - An initial `Enter` key press acts like the `=` button in the UI: It will calculate the entries in the calculator and it will enable the Action Button, if the Action Button is present in the UI.
  - If the Action Button is present in the UI: If the user presses the `Enter` key again while the Action Button is enabled, then it will be the same as the user clicking the Action Button in the UI.
- `n` or `N` will act the same as the user clicking the `+/-` button in the UI (i.e. it will toggle the negative sign on and off).
- `Escape`: This will hide the calculator.

## Props

- `actionBtnText`
- `decimalPlaces`: Default: `2`. This prop enables you to prevent precision loss (see https://javascript.info/number#imprecise-calculations). You can set this to any value you want, but if it is too high then you will run the risk of losing precision. So you should test the number of decimal places against a regular calculator to see if higher numbers of decimals still preserve precision.


## Events

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:calculateTotal` | This component emits a `calculateTotal` event, which can be used to... |
| `on:hideCalculator` | This component emits a `hideCalculator` event, which can be used to... |

</div>

<style>
  .amount {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .decimal-places-group {
    display: flex;
    align-items: center;

    & .label {
      margin-right: 10px;
    }

    & .input {
      width: 70px;
    }
  }

  .calc-group {
    width: 275px;

    & .input-btn-group {
      display: flex;

      & :global(input) {
        margin-right: 4px;
      }
    }

    & .calc-container-outer {
      position: relative;
      display: flex;
      justify-content: flex-end;
      z-index: 100;

      & .calc-container-inner {
        position: absolute;
        top: 5px;
      }
    }
  }
</style>
