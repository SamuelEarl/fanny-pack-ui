<script lang="ts">
  import { SelectCustom, CurrencyInput } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { shortMonth: "Jan", longMonth: "January" },
    { shortMonth: "Feb", longMonth: "February" },
    { shortMonth: "Mar", longMonth: "March" },
    { shortMonth: "Apr", longMonth: "April" },
    { shortMonth: "May", longMonth: "May" },
    { shortMonth: "Jun", longMonth: "June" },
    { shortMonth: "Jul", longMonth: "July" },
    { shortMonth: "Aug", longMonth: "August" },
    { shortMonth: "Sep", longMonth: "September" },
    { shortMonth: "Oct", longMonth: "October" },
    { shortMonth: "Nov", longMonth: "November" },
    { shortMonth: "Dec", longMonth: "December" },
  ];
  let selectedMonthObject = monthObjects[6];

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");

  function handleChange() {
    console.log("Changed");
  }

  let categories = [
    "Uncategorized",
    "Split Transaction",
    "Food",
    "Housing",
    "Insurance",
  ];
  let selectedCategory = "Food";

  let value = 0;
</script>


# Custom Select (single)

---

## Example Usage

### `options` elements with primitive data type

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={months}  
    bind:value={selectedMonth}
    id="id-for-select-box"
    on:change={handleChange}
    disabled={false}
    padding="sm"
    fontSize="md"
  />
</div>

Value of `selectedMonth`: <code>{selectedMonth}</code>

```svelte
<script>
  import { SelectCustom } from "@fanny-pack-ui/svelte-kit";

  let months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  let selectedMonth = "July";

  function handleChange() {
    console.log("Changed");
  }
</script>

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={months}  
    bind:value={selectedMonth}
    id="id-for-select-box"
    on:change={handleChange}
    disabled={false}
    padding="sm"
    fontSize="md"
  />
</div>
```

---

### `options` elements with "object" data type

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={monthObjects}
    optionLabel="shortMonth"
    bind:value={selectedMonthObject}
    id="object-options-id"
  />
</div>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>

```svelte
<script>
  import { SelectCustom } from "@fanny-pack-ui/svelte-kit";

  let monthObjects = [
    { shortMonth: "Jan", longMonth: "January" },
    { shortMonth: "Feb", longMonth: "February" },
    { shortMonth: "Mar", longMonth: "March" },
    { shortMonth: "Apr", longMonth: "April" },
    { shortMonth: "May", longMonth: "May" },
    { shortMonth: "Jun", longMonth: "June" },
    { shortMonth: "Jul", longMonth: "July" },
    { shortMonth: "Aug", longMonth: "August" },
    { shortMonth: "Sep", longMonth: "September" },
    { shortMonth: "Oct", longMonth: "October" },
    { shortMonth: "Nov", longMonth: "November" },
    { shortMonth: "Dec", longMonth: "December" },
  ];

  let selectedMonthObject = monthObjects[6];
</script>

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={monthObjects}
    optionLabel="shortMonth"
    bind:value={selectedMonthObject}
    id="object-options-id"
  />
</div>
```

---

## Option Groups

You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values.

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={dinosaurObjects}
    optionLabel="name"
    optgroup="group"
    bind:value={selectedDinosaurObject}
    id="object-optgroups-id"
  />
</div>

Value of `selectedDinosaurObject`: <code>{JSON.stringify(selectedDinosaurObject)}</code>

```svelte
<script>
  import { SelectCustom } from "@fanny-pack-ui/svelte-kit";

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];

  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");
</script>

<div style="margin-bottom:20px">
  <SelectCustom
    label="Select an option"
    options={dinosaurObjects}
    optionLabel="name"
    optgroup="group"
    bind:value={selectedDinosaurObject}
    id="object-optgroups-id"
  />
</div>
```

Note that the `optgroup`s within the `<SelectCustom>` component will be sorted based on the first appearance of the property that is passed to the `optgroup` prop. For example, in the `dinosaurObjects` array shown above, the `group` property is passed to the `optgroup` prop, so the `dinosaurObjects` array will be sorted based the `group` property. The first `group` property that appears in the `dinosaurObjects` array has a value of `Theropods`, so that will be the first `optgroup` listed in the `<SelectCustom>` component's options list. The second `group` property that appears has a value of `Sauropods`, so that will be the second `optgroup` listed in the `<SelectCustom>` component's options list. And so on.

---

## Notes
* The `<SelectCustom />` component will fill the width of its parent element. So if you want a `<SelectCustom />` component to be narrower, then you will have to set its parent element to be narrower.
* It is recommended to set the width of this component's parent element to a reasonable width to fit the text of the options in the dropdown list. If the text for any of the options is too long, then it will be cut off. But the user can still hover over the option and the entire text will be displayed in a popup tooltip.

---

## Customize SelectCustom Style Props

The original intention for these custom styles was to set `--custom-select-bg-color="transparent"` so the `<SelectCustom>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-select-bg-color`
* `--custom-select-border-color`
* `--custom-select-text-color`

<div style="margin-bottom:20px">
  <div class="alt-background">
    <SelectCustom
      options={months}  
      bind:value={selectedMonth}
      id="id-for-select-box"
      --custom-select-bg-color="transparent"
      --custom-select-border-color="white"
      --custom-select-text-color="white"
    />
  </div>
</div>

```svelte
<SelectCustom
  options={months}  
  bind:value={selectedMonth}
  id="id-for-select-box"
  --custom-select-bg-color="transparent"
  --custom-select-border-color="white"
  --custom-select-text-color="white"
/>
```

---


## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `options` | `Array` | Any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<option>` elements in the `<SelectCustom />` component's dropdown list. |
| `optionLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | When the `optionLabel` prop is used with an array of objects (which are passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for the `<SelectCustom>` component's options. |
| `optgroup` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values. |
| `bind:value` | `string`, `number`, `boolean`, `object` | Any element from the `options` array | NA<br><br>There is no default value for this prop. However, you should set `bind:value` to equal a value from the array that you pass to the `options` prop. The value that `bind:value` is equal to will be the default value displayed in the select box. | When a user selects an option from the `<SelectCustom />` component, that option will be bound to the variable that is passed to this prop.
| `id` | `string` | Any string | `""` (an empty string) | You can give your `<SelectCustom />` components an `id` attribute. |
| `padding` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `sm` | This prop will set the padding for the `<SelectCustom />` component.<br><br>The default value can be changed in the `/src/fp-env-vars/.env` file. |
| `fontSize` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | This prop will set the font size for the `<SelectCustom />` component.<br><br>The default value can be changed in the `/src/fp-env-vars/.env` file. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<SelectCustom>` component. |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user selects a value in the `<SelectCustom />` component. |


<style>
  .alt-background {
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
  }
</style>
