<script lang="ts">
  import { CurrencyInput } from "/src/components";

  let locale = "en-US";
  let currency = "USD";
  let amount = 0;
  let amount1 = 0;
  let amount2 = 0;
  $: total = amount1 + amount2;
</script>


# Currency Input

---

## Example Usage

<div style="margin-bottom:20px">
  <CurrencyInput
    bind:value={amount}
    valAlign="right"
    locale={locale}
    currency={currency}
    label="Enter a dollar amount"
    labelAlign="right"
    padding="var(--input-default-padding)"
    fontSize="var(--input-default-font-size)"
    placeholder="Type right here"
    disabled={false}
  />
</div>

```svelte
<script>
  import { CurrencyInput } from "@fanny-pack-ui/svelte-kit";

  let amount = 0;
</script>

<div style="margin-bottom:20px">
  <CurrencyInput
    bind:value={amount}
    valAlign="right"
    locale={locale}
    currency={currency}
    label="Enter a dollar amount"
    labelAlign="right"
    padding="var(--input-default-padding)"
    fontSize="var(--input-default-font-size)"
    placeholder="Type right here"
    disabled={false}
  />
</div>
```

<hr>

## Return Value Demo

<div id="return-value-demo">
  <div id="currency">
    <div id="curr-title">Currency Input Components</div>
    <div id="curr1">
      <CurrencyInput
        bind:value={amount1}
        locale={locale}
        currency={currency}
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-plus">+</div>
    <div id="curr2">
      <CurrencyInput
        bind:value={amount2}
        locale={locale}
        currency={currency}
        placeholder="Type right here"
        disabled={false}
      />
    </div>
    <div id="curr-total">{new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(total)}</div>
  </div>

  <div id="return-value">
    <div id="rv-title">Return Value</div>
    <div id="rv1">{amount1}</div>
    <div id="rv-plus">+</div>
    <div id="rv2">{amount2}</div>
    <div id="rv-total">{total}</div>
  </div>
</div>

<br>

*NOTE: The **Return Value** example above shows the value that is returned from this component. This is the value that you would use to run calculations or that you would send to the backend for processing or to store in a database. This value is a `number` data type.*

---

## Custom Input Style Props

The original intention for these custom styles was to set `--custom-input-bg-color="transparent"` so the `<CurrencyInput>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-input-bg-color`
* `--custom-input-border-color`
* `--custom-input-text-color`
* `--custom-input-placeholder-text-color`

<div style="margin:20px 0">
  <CurrencyInput
    bind:value={amount}
    placeholder="Enter an amount"
    --custom-input-bg-color="pink"
    --custom-input-border-color="darkred"
    --custom-input-text-color="darkred"
    --custom-input-placeholder-text-color="var(--neutral-7)"
  />
</div>

```svelte
<div style="margin:20px 0">
  <CurrencyInput
    bind:value={amount}
    placeholder="Enter an amount"
    --custom-input-bg-color="pink"
    --custom-input-border-color="darkred"
    --custom-input-text-color="darkred"
    --custom-input-placeholder-text-color="var(--neutral-7)"
  />
</div>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | This prop will provide a label for the input field. If nothing is passed to this prop, then no label will be displayed. |
| `labelAlign` | `string` | `left`, `right` | `right` | This prop will align the label for the input field either to left or the right side of the input field. |
| `bind:value` | `number` | any number | `0` | This component's `value` prop needs to be bound to a variable that has a `number` data type.<br><br>It is important to understand that the data type of `value` is `number` (not `string`). In other words, the variable that is bound to the `value` prop is a `number` and it is simply formatted as a `string` using the [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) before it is displayed in the browser.<br><br>That also means that when you store the value that is bound to the `value` prop (e.g. in a database), the data type of that value will be `number` (not `string`). JavaScript's `number` data type automatically removes any insignificant trailing zeros after the decimal point. So if you are trying to store a number like `10.0`, `10.00`, `10.50`, or `10.550`, JavaScript will remove the insignificant zeros from the end of those numbers and return `10`, `10`, `10.5`, and `10.55`, respectively. So when storing these values in a database, it might be best to store them as floating point numbers (e.g. `doubles`) in order to handle both integers and floats. |
| `valAlign` | `string` | `left`, `right` | `right` | This prop will align the value in the input field either to left or the right side of the input field. |
| `locale` | `string` | Any locale identifier string. See [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) for more details. | `en-US` | This prop is the locale identifier string that will format the currency value to the correct format. |
| `currency` | `string` | Any acceptable currency string. See [Intl.NumberFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for more details. | `USD` | This prop is the currency to use in currency formatting. |
| `padding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--input-default-padding)` | This prop will set the padding for the input field.<br><br>The default value can be changed in the `theme.css` file. |
| `fontSize` | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--input-default-font-size)` | This prop will set the font size for the input field.<br><br>The default value can be changed in the `theme.css` file. |
| `placeholder` (optional) | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |

<br>
<br>
<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `on:blur` | This component dispatches a custom `blur` event rather than forwarding the `blur` DOM event. This is because the `blur` event is used internally in this component so the `blur` event cannot be forwarded. The main difference when listening for and handling the `blur` event in this component is that, since the `blur` event is dispatched, you will find the `blur` event on the `event.detail` object rather than the `event` object. For example:<br><br>`function handlerFunction(event) {`<br>`&nbsp;&nbsp;console.log("Blur Event:", event.detail)};`<br>`}`<br><br>`<CurrencyInput on:blur={handlerFunction} />` |


<style>
  #return-value-demo {
    display: flex;

    & #currency {
      margin-right: 150px;

      & #curr-total {
        padding-right: 11px;
      }
    }

    & #rv1, & #rv2 {
      padding-bottom: 11px;
    }

    & #currency, & #return-value {
      display: grid;
      align-items: end;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr 1fr;

      & #curr-title, & #rv-title {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
      }
      & #curr1, & #rv1 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        text-align: right;
        margin-bottom: 5px;
      }
      & #curr-plus, & #rv-plus {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        padding-right: 25px;
        padding-bottom: 11px;
      }
      & #curr2, & #rv2 {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        text-align: right;
      }
      & #curr-total, & #rv-total {
        grid-column: 1 / 3;
        grid-row: 4 / 5;
        width: 100%;
        text-align: right;
        padding-top: 10px;
        border-top: var(--border-default);
        margin-top: 10px;
      }
    }
  }
</style>
