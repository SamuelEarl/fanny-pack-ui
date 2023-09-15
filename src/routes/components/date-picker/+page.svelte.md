<script lang="ts">
  import { DatePicker, TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";

  let date = new Date();
  let dateIsValid = false;

  let isoDate = getISODate(new Date());
  let isoDateIsValid = false;

  /**
   * Accept a date object and return a date string in ISO format (YYYY-MM-DD).
   */
  function getISODate(date) {
    // Get the current date in US format, which also pads the dates with leading zeros when necessary.
    // See https://stackoverflow.com/a/47160545/9453009
    const localeDateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return `${localeDateString.slice(6)}-${localeDateString.slice(0, 2)}-${localeDateString.slice(3, 5)}`;
  }
  
  // I would have used this to easily format the date to ISO format, but it sometimes returns tomorrow's date due to timezone differences.
  // let currentDateISOString = new Date().toISOString().slice(0, 10);

  /**
   * Accept a date string in US format (MM/DD/YYYY) and return a date string in ISO format (YYYY-MM-DD).
   */
  function formatUStoISO(date) {
    return `${date.slice(6)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
  }

  // Get the current date in US format, which also pads the dates with leading zeros when necessary.
  // See https://stackoverflow.com/a/47160545/9453009
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  console.log("currentDate:", currentDate);
  let currentDateISOString = formatUStoISO(currentDate);
  let newDateObject = new Date("2023-09-13");
</script>


# Date Picker

<!-- The code for this component was taken from this great [date picker component](https://github.com/probablykasper/date-picker-svelte) and has been modified to make it more themable. -->

This `<DatePicker/>` component takes an ISO date string in the form `YYYY-MM-DD` and returns a date string of the same form.

---

## Example Usage

<div class="date-wrapper">
  <DatePicker
    label="Date"
    bind:value={isoDate}
    bind:isValid={isoDateIsValid}
    paddingV="10px"
    paddingH="20px"
    fontSize="24px"
    placeholder="YYYY-MM-DD"
    btnIcon="mdi:calendar"
    btnIconSize={30}
    disabled={false}
  />
  {#if !isoDateIsValid}
    <div class="invalid-error-wrapper">
      <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
    </div>
  {/if}
</div>

```svelte
<script lang="ts">
  import { DatePicker } from "@fanny-pack-ui/svelte-kit";

  let isoDate = getISODate(new Date());
  let isoDateIsValid = false;

  /**
   * Accept a date object and return a date string in ISO format (YYYY-MM-DD).
   */
  function getISODate(date) {
    // Get the current date in US format, which also pads the dates with leading zeros when necessary.
    const localeDateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return `${localeDateString.slice(6)}-${localeDateString.slice(0, 2)}-${localeDateString.slice(3, 5)}`;
  }
</script>

<div class="date-wrapper">
  <DatePicker
    label="Date"
    bind:value={isoDate}
    bind:isValid={isoDateIsValid}
    paddingV="10px"
    paddingH="20px"
    fontSize="24px"
    placeholder="YYYY-MM-DD"
    btnIcon="mdi:calendar"
    btnIconSize={30}
    disabled={false}
  />
  {#if !isoDateIsValid}
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

* Be careful about the date string that you pass to this component.
    * The value that is returned from this component is a `string` in ISO date format. For example: <code>{isoDate}</code>
    * You can pass an ISO date string to a `new Date()` constructor to create a Date object, like this:  `new Date("2023-09-13")`. That will create a date object like this:<br><code>{newDateObject}</code>
    * Keep in mind that the actual date that is returned from the `new Date("YYYY-MM-DD")` constructor will vary depending on your timezone. So passing an ISO date string to the `new Date()` constructor may not give you the result you are expecting. See [JavaScript Date Formats](https://www.w3schools.com/js/js_date_formats.asp) for details. 
    * **If you want to set the default value to today's date, then it is recommended to use a function like the one in the example above.**
* This `<DatePicker/>` component is designed to fill the entire width of its parent element. So, for example, you can put a wrapper `<div>` element around the `<DatePicker/>` component and put a `width` on the `<div>` and the `<DatePicker/>` component will be as wide as the `<div>` wrapper. See the example above.


<!-- ## Example Usage

### Date input field with calendar
* You can directly enter a date value into the input field or select a date from the calendar that pops up. 
* If a user enters a date into the input field that does not match the `YYYY-MM-DD` format, then a validation error is triggered.

<div class="date-wrapper">
  {#if !dateIsValid}
    <div class="invalid-error-wrapper">
      <span class="invalid-error-msg">Invalid Date</span>
    </div>
  {/if}
  <DateInput
    bind:value={date}
    bind:valid={dateIsValid}
    label="Set a date"
    padding="10px"
    fontSize="var(--date-picker-default-font-size)"
    showCalendar={false}
    min={new Date(2022, 2, 5)}
    max={new Date(2032, 4, 15)}
    closeOnSelection={true}
    placeholder="Enter a date"
    dateInputIcon="mdi:calendar"
    disabled={false}
  />
</div>

Value that is returned from this component (which can be saved to the database): {date}

Note that the value that is returned is a JavaScript Date object.

```svelte
<script>
  import { DateInput } from "@fanny-pack-ui/svelte-kit";

  let date = new Date();
  let dateIsValid = false;
</script>

<div class="date-wrapper">
  {#if !dateIsValid}
    <div class="invalid-error-wrapper">
      <span class="invalid-error-msg">Invalid Date</span>
    </div>
  {/if}
  <DateInput
    bind:value={date}
    bind:valid={dateIsValid}
    label="Set a date"
    padding="10px"
    fontSize="var(--date-picker-default-font-size)"
    showCalendar={false}
    min={new Date(2022, 2, 5)}
    max={new Date(2032, 4, 15)}
    closeOnSelection={true}
    placeholder="Enter a date"
    dateInputIcon="mdi:calendar"
    disabled={false}
  />
</div>

<style>
  .date-wrapper {
    width: 300px;
    margin-bottom: 20px;
  }

  .invalid-error-wrapper {
    margin-top: 5px;
  }
  
  .invalid {
    padding: 5px;
    border: 1px solid darkred;
    background-color: pink;
    color: darkred;
  }
</style>
```

<br>

### Calendar only

<div style="margin-bottom:20px">
  <Calendar
    bind:value={date}
    label="Select a date"
    min={new Date(2022, 2, 5)}
    max={new Date(2032, 4, 15)}
  />
</div>

```svelte
<script>
  import { Calendar } from "@fanny-pack-ui/svelte-kit";

  let date = new Date();
</script>

<div style="margin-bottom:20px">
  <Calendar
    bind:value={date}
    label="Select a date"
    min={new Date(2022, 2, 5)}
    max={new Date(2032, 4, 15)}
  />
</div>
``` -->

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
  bind:value={isoDate}
  bind:isValid={isoDateIsValid}
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
  bind:value={isoDate}
  bind:isValid={isoDateIsValid}
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
| `bind:isValid`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly. The variable that is bound to this prop will be set to `true` if the date is valid and `false` otherwise. This can be used to display an error message if the date that was entered is not valid, as shown in the first example.<br><br>Note that if you bind the `value` prop to a variable that equals a valid date, for example `let isoDate = getISODate(new Date())`, then the date that is initially entered into the `<DatePicker/>` input field will be a valid date. That also means that the date will be valid initially, even if you set the variable that is bound to the `isValid` prop to equal `false`.<br><br>NOTE: Although this will validate the text that is entered into the `<DatePicker/>` input field, it would probably be preferable to run all your validations through a validation library, like Superstruct, Zod, or Yup. |
| `paddingV`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--date-picker-input-default-padding-v)` | This prop will set the top and bottom padding for the `<DatePicker/>` input field and the padding on all sides of the `<DatePicker/>` button.<br><br>You can change the default size in the `theme.css` file. |
| `paddingH`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--date-picker-input-default-padding-h)` | This prop will set the left and right padding for the `<DatePicker/>` input field.<br><br>You can change the default size in the `theme.css` file. |
| `fontSize`<br>*(optional)* | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--date-picker-input-default-font-size)` | This prop will set the text size of the `<DatePicker/>` input field.<br><br>You can change the default size in the `theme.css` file. |
| `placeholder`<br>*(optional)* | `string` | Any string | `YYYY-MM-DD` | This prop will set the placeholder when the date value is an empty string (`""`). |
| `btnIcon` | `string` | Any icon name from the Iconify library. | `"mdi:calendar"` | This prop will set the icon that is displayed in the `<DatePicker/>` button. |
| `btnIconSize` | `number` | Any number | The same as the `fontSize` value | This prop will set the size of the icon that is displayd in the `<DatePicker/>` button. Note that the default `btnIconSize` is the same as the `fontSize` value, but the `btnIconSize` is a number data type and the `fontSize` is a string data type with a CSS length unit as the suffix of the string. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<DatePicker/>` component. |

</div>

<!--
<TabsContainer>
  <TabBar>
    <Tab>DateInput</Tab>
    <Tab>Calendar</Tab>
  </TabBar>

  <TabPanel>
    <h2>DateInput</h2>

    See the comment in the Tabs component props for an explanation of these empty divs.
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `label`<br>*(optional)* | `string` | Any string | `""` (an empty string) | The text for the `<label>` element. If this prop is not provided, then no label will be displayed. |
    | `bind:value` | `Date` or `null` (`null` if the input field is empty) | Any date | You can define `let date = new Date();` and today's date will be the default value. See the first example above. | The date that is selected will be bound to the variable that is passed to this prop. |
    | `bind:valid`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly. The variable that is bound to this prop will be set to `true` if the date is valid and `false` otherwise. This can be used to display an error message if the date that was entered is not valid, as shown in the example above.<br><br>Note that if you bind the `value` prop to a variable that equals a valid date, for example `new Date()`, then the date that is initially entered into the `<DateInput />` field will be a valid date. That also means that the date will be valid initially even if you set the variable that is bound to `valid` to equal `false`.<br><br>NOTE: Although this will validate the text that is entered into the `<DateInput />` field, it would probably be preferable to run all your validations through a validation library, like Yup. |
    | `padding`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--date-picker-default-padding)` | This prop will set the padding for the input field and input field button.<br><br>You can change the default size in the `theme.css` file. |
    | `fontSize`<br>*(optional)* | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--date-picker-default-font-size)` | This prop will set the text size and button icon size.<br><br>You can change the default size in the `theme.css` file. |
    | `showCalendar`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will allow you to either show or hide the calendar. If you are using the `<DateInput />` component, then clicking the button will toggle the calendar to be shown or hidden. |
    | `min`<br>*(optional)* | `Date` | any Date with `year`, `month`, and `day` arguments | 01 Jan, 10 years before the current year. | This prop defines the earliest date that a user can select. Keep in mind that January is represented with a `0`. |
    | `max`<br>*(optional)* | `Date` | any Date with `year`, `month`, and `day` arguments | 31 Dec, 10 years after the current year. | This prop defines the latest date that a user can select. Keep in mind that January is represented with a `0`. |
    | `closeOnSelection`<br>*(optional)* | `boolean` | `true`, `false` | `true` | This prop allows you to close the calendar when a date is selected or leave it open. |
    | `locale`<br>*(optional)* | | | | See the docs for [date-picker-svelte](https://date-picker-svelte.kasper.space/docs).<br><br>*NOTE: The `weekStartsOn` property represents the day that the week starts on. `0` = Sunday. The default value in this component is `0`.* |
    | `placeholder`<br>*(optional)* | `string` | Any string | `YYYY-MM-DD` | This prop will act as the placeholder when the date value is null (i.e. when the input field is empty). |
    | `dateInputIcon`<br>*(optional)* | `string` | Any icon name from the Iconify library. | `"mdi:calendar"` | The icon that is passed to this prop is used is displayed in the input field. |
    | `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<DateInput>` component. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Calendar</h2>

    See the comment in the Tabs component props for an explanation of these empty divs.
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `label`<br>*(optional)* | See the `label` prop under the DateInput tab. |
    | `bind:value` | See the `bind:value` prop under the DateInput tab. |
    | `min`<br>*(optional)* | See the `min` prop under the DateInput tab. |
    | `max`<br>*(optional)* | See the `max` prop under the DateInput tab. |
    | `locale`<br>*(optional)* | See the `locale` prop under the DateInput tab. |

    </div>
  </TabPanel>
</TabsContainer>
-->


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
