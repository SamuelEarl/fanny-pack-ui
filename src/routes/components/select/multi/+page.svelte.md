<script lang="ts">
  import { SelectMulti } from "/src/lib";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = ["mud tires"];

  let suvOptionsObjects = [
    { displayText: "Oversized Wheels", value: "oversizedWheels" },
    { displayText: "Mud Tires", value: "mudTires" },
    { displayText: "Mud Guards", value: "mudGuards" },
    { displayText: "Trail Running Boards", value: "trailRunningBoards" },
    { displayText: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [suvOptionsObjects[1]];

  function handleChange(event) {
    console.log("handleChange");
  }
</script>


# Select (multi)

NOTE: I am going to create a new implementation of this component that uses checkboxes inside of a modal. Everything needs to be accessible too. Look at this for ideas: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/.

<!-- 
I need to study accessibility:
* https://developer.mozilla.org/en-US/docs/Web/Accessibility
* https://a11y-101.com/
-->


Because of the different ways of selecting options (depending on the browser), and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead of a `<select>` element with the `multiple` attribute. See https://www.w3schools.com/tags/att_select_multiple.asp.

This component is essentially the [`<CheckboxGroup>`](/components/checkbox-group) component inside a dropdown menu.

---

## Example Usage

### `options` elements with primitive data type

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="{`Select as many \n\n as you want`}"
  options={suvOptions}
  bind:values={selectedSuvOptions}
  on:change={(event) => handleChange(event)}
/>

<br>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>

```svelte
<script>
  import { SelectMulti } from "@fanny-pack-ui/svelte-kit";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack" ];
  let selectedSuvOptions = ["mud tires"];
</script>

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="{`Select as many \n\n as you want`}"
  options={suvOptions}
  bind:values={selectedSuvOptions}
/>
```

*NOTE: This component will preserve the order in which a user selects options. This feature can come in handy in certain types of applications and use cases.*

<br>

### `options` elements with object data type

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="Select as many as you want"
  options={suvOptionsObjects}
  optionLabel="displayText"
  bind:values={selectedSuvOptionsObjects}
/>

<br>

<div>Value of <code>selectedSuvOptionsObjects</code>: <code>{JSON.stringify(selectedSuvOptionsObjects)}</code></div>

```svelte
<script>
  import { SelectMulti } from "@fanny-pack-ui/svelte-kit";

  let suvOptionsObjects = [
    { displayText: "Oversized Wheels", value: "oversizedWheels" },
    { displayText: "Mud Tires", value: "mudTires" },
    { displayText: "Mud Guards", value: "mudGuards" },
    { displayText: "Trail Running Boards", value: "trailRunningBoards" },
    { displayText: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [suvOptionsObjects[1]];
</script>

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="Select as many as you want"
  options={suvOptionsObjects}
  optionLabel="displayText"
  bind:values={selectedSuvOptionsObjects}
/>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `tooltipText` (optional) | `string` | Any string | NA | This prop accepts a string argument that will act as the tooltip text when a user hovers over the tooltip element. Multi-line strings can be created with newline characters that are inside of backticks, which are inside of curly braces. (See the [Tooltip](/components/tooltip) component for code examples.) If no `tooltipText` is provided, then no tooltip will be displayed. |
| `options` | `array` | Any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<option>` elements in the `<SelectMulti />` component's dropdown list. |
| `optionLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | When the `optionLabel` prop is used with an array of objects (which are passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for the `<Select>` component's options. |
| `bind:values` | `array` | A collection of elements from the `options` array | `undefined` | The array variable that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `options` array. |
| `id` | `string` | Any string | `""` (an empty string) | You can give your `<SelectMulti />` components an `id` attribute. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for your `<SelectMulti />` component to give the appearance of a larger or smaller `<SelectMulti />` component. The text size will also increase or decrease based on this `size` prop. |

<!-- ---

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user selects a value in the `<Select />` component. | -->
