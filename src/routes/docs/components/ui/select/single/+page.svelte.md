<script lang="ts">
  import { Select, Checkbox } from "/src/components";

  const jobOptionsStrings = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
	];
  let selectedJobOptionString = jobOptionsStrings[0];

  let needVacation = false;

  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
	];

  const optionValue = "roleVal";
  const optionLabel = "roleLabel";
  let selectedValuePropertyFromJobOptionsObject = jobOptionsObjects[0][optionValue];

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  function handleChange(event) {
    console.log("Selected Value:", event.target.value);
  }

  const dinoObjects = [
    { dinoGroup: "Theropods", dinoValue: "tyrannosaurus", dinoLabel: "Tyrannosaurus" },
    { dinoGroup: "Theropods", dinoValue: "velociraptor", dinoLabel: "Velociraptor" },
    { dinoGroup: "Sauropods", dinoValue: "diplodocus", dinoLabel: "Diplodocus" },
    { dinoGroup: "Sauropods", dinoValue: "saltasaurus", dinoLabel: "Saltasaurus" },
    { dinoGroup: "Theropods", dinoValue: "deinonychus", dinoLabel: "Deinonychus" },
    { dinoGroup: "Sauropods", dinoValue: "apatosaurus", dinoLabel: "Apatosaurus" },
  ];
  let selectedDinoValue = dinoObjects.find(obj => obj.dinoValue === "diplodocus")["dinoValue"];

  let textValue = "Hello there";
</script>


# Select (single)

`<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown as is provided natively by the browser.

---

## Example Usage

### `options` elements with "primitive" data type

Most `<Select />` components will probably just use a simple array of string values as in this example:

<div style="margin-bottom:20px;">
  <Select 
    label="What Job Are You Interested In?"
    options={jobOptionsStrings}
    bind:value={selectedJobOptionString}
    padding="var(--select-default-padding)"
    fontSize="var(--select-default-font-size)"
    disabled={needVacation}
    on:change={handleChange}
  />
</div>

<Checkbox
  bind:checked={needVacation}
  label="I need a vacation instead of a job"
/>

<br>

```
<script>
  import { Select, Checkbox } from "@fanny-pack-ui/svelte-kit";

  const jobOptionsStrings = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
  ];
  let selectedJobOptionString = jobOptionsStrings[0];
  let needVacation = false;

  function handleChange(event) {
    console.log("Selected Value:", event.target.value);
  }
</script>

<div style="margin-bottom:20px;">
  <Select 
    label="What Job Are You Interested In?"
    options={jobOptionsStrings}
    bind:value={selectedJobOptionString}
    padding="var(--select-default-padding)"
    fontSize="var(--select-default-font-size)"
    disabled={needVacation}
    on:change={handleChange}
  />
</div>

<Checkbox
  bind:checked={needVacation}
  label="I need a vacation instead of a job"
/>
```

Value of `selectedJobOptionString`: <code>{selectedJobOptionString}</code>

---

### `options` elements with "object" data type

What if you want each option in your `<Select />` component to have values that are different from their labels? Take the following native select element as an example. The code for it is below.

<div style="margin-bottom:20px;">
  <select>
    <option value="">-- Select role --</option>
    <option value="ds">UI/UX Designer</option>
    <option value="fe">Frontend Engineer</option>
    <option value="be">Backend Engineer</option>
    <option value="qa">QA Engineer</option>
    <option value="un">Unicorn</option>
  </select>
</div>

```
<select>
  <option value="">-- Select Role --</option>
  <option value="ds">UI/UX Designer</option>
  <option value="fe">Frontend Engineer</option>
  <option value="be">Backend Engineer</option>
  <option value="qa">QA Engineer</option>
  <option value="un">Unicorn</option>
</select>
```

Notice how the values for each option are different from their labels? You would probably have to pass an array of objects that looked something like this to the select element:

```
const jobOptionsObjects = [
  { roleVal: "", roleLabel: "-- Select Role --" },
  { roleVal: "ds", roleLabel: "UI/UX Designer" },
  { roleVal: "fe", roleLabel: "Frontend Engineer" },
  { roleVal: "be", roleLabel: "Backend Engineer" },
  { roleVal: "qa", roleLabel: "QA Engineer" },
  { roleVal: "un", roleLabel: "Unicorn" },
];
```

The problem is that native select elements can only handle primitive data types, so you might have to pass an array of strings to your Svelte select element (as in the first example) and just live with that. No separate values or labels. Bummer. However, you can pass an object to a native select element written with Svelte and just make a few adjustments to your Svelte code, which would look like this:

<div style="margin-bottom:20px;">
  <select bind:value={selectedValuePropertyFromJobOptionsObject}>
    {#each jobOptionsObjects as option}
      <option value={option[optionValue]}>{option[optionLabel]}</option>
    {/each}
  </select>
</div>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

```
<script>
  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
  ];

  let selectedValuePropertyFromJobOptionsObject = jobOptionsObjects[0]["roleVal"];
</script>

<select bind:value={selectedValuePropertyFromJobOptionsObject}>
  {#each jobOptionsObjects as option}
    <option value={option["roleVal"]}>{option["roleLabel"]}</option>
  {/each}
</select>
```

You can do the same with this Fanny Pack `<Select />` component. You just have to specify which properties in your data objects should be used as the option values and which should be the option labels:

<div style="margin-bottom:20px;">
  <Select 
    label="What Job Are You Interested In?"
    options={jobOptionsObjects}
    optionValue="roleVal"
    optionLabel="roleLabel"
    bind:value={selectedValuePropertyFromJobOptionsObject}
  />
</div>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

```
<script>
  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
  ];

  let selectedValuePropertyFromJobOptionsObject = jobOptionsObjects[0]["roleVal"];
</script>

<Select 
  label="What Job Are You Interested In?"
  options={jobOptionsObjects}
  optionValue="roleVal"
  optionLabel="roleLabel"
  bind:value={selectedValuePropertyFromJobOptionsObject}
/>
```

### Option Groups

You can group your options using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values.

<div style="margin-bottom:20px;">
  <Select
    label="Select an option"
    options={dinoObjects}
    optionValue="dinoValue"
    optionLabel="dinoLabel"
    optgroup="dinoGroup"
    bind:value={selectedDinoValue}
  />
</div>

Value of `selectedDinoValue`: <code>{selectedDinoValue}</code>

```
<script>
  const dinoObjects = [
    { dinoGroup: "Theropods", dinoValue: "tyrannosaurus", dinoLabel: "Tyrannosaurus" },
    { dinoGroup: "Theropods", dinoValue: "velociraptor", dinoLabel: "Velociraptor" },
    { dinoGroup: "Sauropods", dinoValue: "diplodocus", dinoLabel: "Diplodocus" },
    { dinoGroup: "Sauropods", dinoValue: "saltasaurus", dinoLabel: "Saltasaurus" },
    { dinoGroup: "Theropods", dinoValue: "deinonychus", dinoLabel: "Deinonychus" },
    { dinoGroup: "Sauropods", dinoValue: "apatosaurus", dinoLabel: "Apatosaurus" },
  ];

  let selectedDinoValue = dinoObjects.find(obj => obj.dinoValue === "diplodocus")["dinoValue"];
</script>

<Select
  label="Select an option"
  options={dinoObjects}
  optgroup="dinoGroup"
  optionValue="dinoValue"
  optionLabel="dinoLabel"
  bind:value={selectedDinoValue}
/>

Value of `selectedDinoValue`: <code>{selectedDinoValue}</code>
```

Note that the `optgroup`s within the `<Select />` component will be sorted based on the first appearance of the property that is passed to the `optgroup` prop. For example, in the `dinoObjects` array shown above, the `dinoGroup` property is passed to the `optgroup` prop, so the `dinoObjects` array will be sorted based the `dinoGroup` property. The first `dinoGroup` property that appears in the `dinoObjects` array has a value of `Theropods`, so that will be the first `optgroup` listed in the `<Select />` component's options list. The second `dinoGroup` property that appears has a value of `Sauropods`, so that will be the second `optgroup` listed in the `<Select />` component's options list. And so on.

---

## Note
* The `<Select />` component will fill the width of its parent element. So if you want a `<Select />` component to be narrower, then you will have to set its parent element to be narrower.

---

## Customize Select Style Props

The original intention for these custom styles was to set `--custom-select-bg-color="transparent"` so the `<Select />` component would blend into the background. A few extra custom style rules have been provided for even more customizability.

You can set the following custom variables:

* `--custom-select-bg-color`
* `--custom-select-border-color`
* `--custom-select-text-color`
* `--custom-option-text-color`

<div style="margin-bottom:20px" class="alt-background">
  <Select
    options={months}  
    bind:value={selectedMonth}
    --custom-select-bg-color="transparent"
    --custom-select-border-color="white"
    --custom-select-text-color="white"
    --custom-option-text-color="var(--secondary-color)"
  />
</div>

```
<div style="margin-bottom:20px" class="alt-background">
  <Select
    options={months}  
    bind:value={selectedMonth}
    --custom-select-bg-color="transparent"
    --custom-select-border-color="white"
    --custom-select-text-color="white"
    --custom-option-text-color="var(--secondary-color)"
  />
</div>

<style>
  .alt-background {
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
  }
</style>

```

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `options` | `Array` | Any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<option>` elements in the `<Select />` component's dropdown list. |
| `optionValue` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | When the `optionValue` prop is used with an array of objects (which are passed to the `options` prop), the `optionValue` prop will provide the property name that will be used as the value for each of the options in the `<Select />` component. |
| `optionLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | When the `optionLabel` prop is used with an array of objects (which are passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for each of the options in the `<Select />` component. |
| `optgroup` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | You can group your options using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values. |
| `bind:value` | `string`, `number`, `boolean`, `object` | Any element from the `options` array | NA<br><br>There is no default value for this prop. However, you should set `bind:value` to equal a value from the array that you pass to the `options` prop. The value that `bind:value` is equal to will be the default value displayed in the select box. | When a user selects an option from the `<Select />` component, that option will be bound to the variable that is passed to this prop.
| `fontSize` | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--select-default-font-size)` | This prop will set the font size for the `<Select />` component.<br><br>The default value can be changed in the `theme.css` file. |
| `padding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--select-default-padding)` | This prop will set the padding for the `<Select />` component.<br><br>The default value can be changed in the `theme.css` file. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<Select />` component. |
| `{...restProps}` | NA | Any attribute that you can pass to a `<select>` element. | NA | This component does not specify every possible attribute that you can pass to a `<select>` element. However, `restProps` allows you to pass any attributes to this `<select />` component that you could normally pass to a `<select>` element. For example, if you want to specify an `id` for this `<Select>` component, then you could pass the `id` prop, like this: `id="some-id"`. |

</div>

---

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user selects a value in the `<Select />` component. |

</div>

<style>
  select {
    padding: 10px;
    border-radius: var(--border-radius);
    background-color: var(--bg-color-element-default);
  }

  .alt-background {
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
  }
</style>
