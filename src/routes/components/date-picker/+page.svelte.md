<script lang="ts">
  import { DatePicker, getISODate, TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";

  let date = getISODate(new Date());
  let dateIsValid = false;

  let newDateObject = new Date("2023-09-13");
</script>


# Date Picker

The `<DatePicker/>` component has two exports:

1. The `<DatePicker/>` component, which takes an ISO date string in the form `YYYY-MM-DD` and returns a date string of the same form.
2. The `getISODate()` function, which takes a `new Date()` object and can be used to set the initial/default value of the `<DatePicker/>` component.

---

## Example Usage

<div class="date-wrapper">
  <DatePicker
    label="Date"
    bind:value={date}
    bind:isValid={dateIsValid}
    paddingV="10px"
    paddingH="20px"
    fontSize="24px"
    placeholder="YYYY-MM-DD"
    btnIcon="mdi:calendar"
    btnIconSize={30}
    disabled={false}
  />
  {#if !dateIsValid}
    <div class="invalid-error-wrapper">
      <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
    </div>
  {/if}
</div>

This is the value that is returned from this component (it is a string data type): <code>{date}</code>

```svelte
<script lang="ts">
  import { DatePicker, getISODate } from "@fanny-pack-ui/svelte-kit";

  let date = getISODate(new Date());
  let dateIsValid = false;
</script>

<div class="date-wrapper">
  <DatePicker
    label="Date"
    bind:value={date}
    bind:isValid={dateIsValid}
    paddingV="10px"
    paddingH="20px"
    fontSize="24px"
    placeholder="YYYY-MM-DD"
    btnIcon="mdi:calendar"
    btnIconSize={30}
    disabled={false}
  />
  {#if !dateIsValid}
    <div class="invalid-error-wrapper">
      <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
    </div>
  {/if}
</div>

<style>
  .date-wrapper {
    width: 350px;
    margin-bottom: 20px;
  }

  .invalid-error-wrapper {
    margin-top: 7px;
  }
    
  .invalid-error-msg {
    padding: 5px 10px;
    border-radius: 3px;
    background-color: var(--dark-red);
    color: var(--white);
    font-weight: bold;
  }
</style>
```

<br>

NOTES:

* Users can directly enter a date value into the input field or select a date from the calendar that pops up. 
* If a user enters a date into the input field that does not match the `YYYY-MM-DD` format, then a validation error is triggered.
* **If you want to set the initial/default value to today's date, then use the `getISODate()` function that is exported along with this component and pass a `new Date()` object to it. See the example above for details.**
    * Be careful about the date string that you pass to this component to give it an initial/default value.
    * The value that is returned from this component is a `string` in ISO date format. For example: <code>{date}</code>
    * You can pass an ISO date string to a `new Date()` constructor to create a Date object, like this:  `new Date("2023-09-13")`. That will create a date object like this:<br><code>{newDateObject}</code>
    * Keep in mind that the actual date that is returned from the `new Date("YYYY-MM-DD")` constructor will vary depending on your timezone. So passing an ISO date string to the `new Date()` constructor may not give you the result you are expecting. See [JavaScript Date Formats](https://www.w3schools.com/js/js_date_formats.asp) for details. 
* This `<DatePicker/>` component is designed to fill the entire width of its parent element. So, for example, you can put a wrapper `<div>` element around the `<DatePicker/>` component and put a `width` on the `<div>` and the `<DatePicker/>` component will be as wide as the `<div>` wrapper. See the example above.

---

## Custom DatePicker Styles
The original intention for these custom styles was to set `--custom-date-picker-input-bg-color="transparent"` so the `<DatePicker>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.

You can set the following custom variables:
* `--custom-date-picker-border-color`
* `--custom-date-picker-input-bg-color`
* `--custom-date-picker-input-text-color`
* `--custom-date-picker-input-placeholder-text-color`
* `--custom-date-picker-btn-bg-color`
* `--custom-date-picker-btn-icon-color`
* `--custom-date-picker-btn-separator-color`

<br>

<DatePicker
  bind:value={date}
  bind:isValid={dateIsValid}
  placeholder="Enter a date"
  --custom-date-picker-border-color="var(--secondary-color)"
  --custom-date-picker-input-bg-color="var(--secondary-color)"
  --custom-date-picker-input-text-color="var(--white)"
  --custom-date-picker-input-placeholder-text-color="var(--neutral-4)"
  --custom-date-picker-btn-bg-color="var(--secondary-color)"
  --custom-date-picker-btn-icon-color="var(--white)"
  --custom-date-picker-btn-separator-color="var(--white)"
/>

<br>
<br>

```svelte
<DatePicker
  bind:value={date}
  bind:isValid={dateIsValid}
  placeholder="Enter a date"
  --custom-date-picker-border-color="var(--secondary-color)"
  --custom-date-picker-input-bg-color="var(--secondary-color)"
  --custom-date-picker-input-text-color="var(--white)"
  --custom-date-picker-input-placeholder-text-color="var(--neutral-4)"
  --custom-date-picker-btn-bg-color="var(--secondary-color)"
  --custom-date-picker-btn-icon-color="var(--white)"
  --custom-date-picker-btn-separator-color="var(--white)"
/>
```

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>*(optional)* | `string` | Any string | `""` (an empty string) | The text for the `<label>` element. If this prop is not provided, then no label will be displayed. |
| `bind:value` | `string` | A string with in ISO date format (`YYYY-MM-DD`) or an empty string (`""`) | Today's date in ISO string format (`YYYY-MM-DD`) | The date that is entered into the input field or that is selected in the calendar will be bound to the variable that is passed to this prop.<br><br>Look at the first example for one way to set the default value to today's date. |
| `bind:isValid`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly. The variable that is bound to this prop will be set to `true` if the date is valid and `false` otherwise. This can be used to display an error message if the date that was entered is not valid, as shown in the first example.<br><br>Note that if you bind the `value` prop to a variable that equals a valid date, for example `let date = getISODate(new Date())`, then the date that is initially entered into the `<DatePicker/>` input field will be a valid date. That also means that the date will be valid initially, even if you set the variable that is bound to the `isValid` prop to equal `false`.<br><br>NOTE: Although this will validate the text that is entered into the `<DatePicker/>` input field, it would probably be preferable to run all your validations through a validation library, like Superstruct, Zod, or Yup. |
| `paddingV`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--date-picker-input-default-padding-v)` | This prop will set the top and bottom padding for the `<DatePicker/>` input field and the padding on all sides of the `<DatePicker/>` button.<br><br>You can change the default size in the `theme.css` file. |
| `paddingH`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--date-picker-input-default-padding-h)` | This prop will set the left and right padding for the `<DatePicker/>` input field.<br><br>You can change the default size in the `theme.css` file. |
| `fontSize`<br>*(optional)* | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--date-picker-input-default-font-size)` | This prop will set the text size of the `<DatePicker/>` input field.<br><br>You can change the default size in the `theme.css` file. |
| `placeholder`<br>*(optional)* | `string` | Any string | `YYYY-MM-DD` | This prop will set the placeholder when the date value is an empty string (`""`). |
| `btnIcon` | `string` | Any icon name from the Iconify library. | `"mdi:calendar"` | This prop will set the icon that is displayed in the `<DatePicker/>` button. |
| `btnIconSize` | `number` | Any number | The same as the `fontSize` value | This prop will set the size of the icon that is displayd in the `<DatePicker/>` button. Note that the default `btnIconSize` is the same as the `fontSize` value, but the `btnIconSize` is a number data type and the `fontSize` is a string data type with a CSS length unit as the suffix of the string. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<DatePicker/>` component. |

</div>


<style>
  .date-wrapper {
    width: 350px;
    margin-bottom: 20px;

    & .invalid-error-wrapper {
      margin-top: 7px;
    
      & .invalid-error-msg {
        padding: 5px 10px;
        border-radius: 3px;
        background-color: var(--dark-red);
        color: var(--white);
        font-weight: bold;
      }
    }
  }
</style>
