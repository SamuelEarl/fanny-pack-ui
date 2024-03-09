<script lang="ts">
  import { Button, Calculator, CurrencyInput, Input } from "/src/components";
  import Icon from "@iconify/svelte";

  let amount = 0;
  let currencyAmount = 0;
  let decimalPlaces = 2;
  let showStandAloneCalculator = true;
  let showCalculator = false;
</script>

# Calculator

---

## Example Usage

<div class="amount">
  Amount: {amount}
</div>
{#if showStandAloneCalculator}
  <Calculator
    {decimalPlaces}
    closeBtn={false}
    insertBtnText="Set"
    on:setCalculationResult={event => amount = event.detail} 
  />
{/if}
<br>
<div class="decimal-places-group">
  <div class="question">What is the max number of decimal places that the result should have?</div>
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
    {decimalPlaces}
    closeBtn={false}
    insertBtnText="Set"
    on:setCalculationResult={event => amount = event.detail} 
  />
```

**NOTE:**

This `<Calculator>` component receives focus when it is mounted. That means that if this `<Calculator>` component is visible in the UI, any keystrokes will be intercepted and handled by the `<Calculator>` until the user removes focus from it by clicking outside of the `<Calculator>` or tabbing to another element. 

However, you can hide this `<Calculator>` component and all keystrokes will work normally. The next example shows one way to hide the `<Calculator>` on a page until a user needs to use it, which will prevent the issue described above.

---

## Show/Hide Calculator

You can use the `<Calculator>` component along with an input field and show/hide the calculator with a button.

After a user calculates the total (by pressing the `=` button), the `Insert` button is enabled. The user can then press that button to insert the total from the calculator into the input field.

If part of the calculator is hidden when it appears in the UI, the screen will scroll up to show the entire calculator. Try scrolling the screen to a point where the input field and button are just above the bottom of the viewport. Now click the calculator button to show the calculator and see what happens.

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
          on:setCalculationResult={event => currencyAmount = event.detail} 
          on:hideCalculator={() => showCalculator = false}
        />
      </div>
    </div>
  {/if}
</div>

<br>

```svelte
<script lang="ts">
  import { Button, Calculator, CurrencyInput } from "@fanny-pack-ui/svelte-kit";
  import Icon from "@iconify/svelte";

  let currencyAmount = 0;
  let showCalculator = false;
</script>

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
          decimalPlaces={2}
          on:setCalculationResult={event => currencyAmount = event.detail} 
          on:hideCalculator={() => showCalculator = false}
        />
      </div>
    </div>
  {/if}
</div>

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
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow-25);
    }
  }
}
```

---

## Keyboard Shortcuts

This `<Calculator>` component is fully keyboard compatible, so users can enter and run calculations directly from their keyboard.

It might not be obvious which calculator buttons correspond to which keyboard keys, so some of the calculator buttons have tooltips that appear when a user hovers over them. The following is a summary of those keyboard shortcuts that have tooltips:

<div class="responsive-table">

| Calculator Button | Keyboard Key | Description |
| ----------------- | ------------ | ----------- |
| `Clear` | `Backspace` or `Delete` | This will clear the most recent entry. |
| `Clear All` | `a` or `A` | This will clear the entire calculation and reset the calculator back to zero. |
| `+/-` | `n` or `N` | This will add or remove a negative sign in front of the number that is being entered. |
| `÷` | `/` | This is self-explanatory. |
| `×` | `*` | This is self-explanatory. |
| `=` & `Insert` | `Enter` | An initial `Enter` key press acts like the `=` button being pressed: It will calculate the entries in the calculator. The `Insert` button will also be enabled.<br><br>When the `Insert` button is enabled (e.g. after the `=` button or the `Enter` key has been pressed), if the user presses the `Enter` key again, then it will be the same as the user clicking the `Insert` button. |
| `Close` | `Esc` (Escape) | When a user clicks the `Esc` button while the calculator has focus, the `hideCalculator` event will be dispatched. This can be used to hide the calculator. See the example above that uses the `on:hideCalculator` listener for more details. |

</div>

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `decimalPlaces` | `number` | Any number | `2` | This prop is used to set the maximum number of decimal places in the calculation result. This prop also enables you to prevent precision loss (see https://javascript.info/number#imprecise-calculations). You can set this to any value you want, but if it is too high then you might run the risk of losing precision. So you should test the number of decimal places in your result against a regular calculator to see if more decimal places still preserves the precision you need. |
| `closeBtn` | `boolean` | `true`, `false` | `true` | You can remove the close button from the calculator. For example, this might be necessary if you are not hiding the calculator behind a toggle button. See the first example above. |
| `insertBtn` | `boolean` | `true`, `false` | `true` | You can remove the insert button from the calculator. |
| `insertBtnText` | `string` | Any string | `"Insert"` | The Insert button (e.g. the `Insert` or `Set` buttons in the examples) is disabled by default. When the user enters at least one number into the calculator and presses either the `=` button or the `Enter` key, then the Insert button will be enabled. When the Insert button is enabled and clicked, it will dispatch the `setCalculationResult` event, which can be used set the value of a variable to equal the result from the calculator. You can pass an empty string to remove the Insert button from the calculator. |

</div>

---

## Events

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:setCalculationResult` | This component emits a `setCalculationResult` event, which can be used set the value of a variable to equal the result from the calculator. |
| `on:hideCalculator` | When a user clicks the `Escape` button while the calculator has focus, the `hideCalculator` event will be dispatched. This can be used to hide the calculator. See the example above that uses the `on:hideCalculator` listener for more details. |

</div>

<style>
  @media (--xs-up) {
    .amount {
      margin-bottom: 10px;
      font-weight: bold;
    }

    .decimal-places-group {

      & .question {
        margin-bottom: 5px;
      }

      & .input {
        width: 70px;
      }
    }

    .calc-group {

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
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow-25);
        }
      }
    }
  }

  @media (--lg-up) {
    .calc-group {
      width: 275px;
    }
  }
</style>
