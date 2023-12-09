<script lang="ts">
  import { Checkbox, CheckboxGroup } from "/src/lib";

  const suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [suvOptions[0]];

  const suvOptionsObjects = [
    { displayText: "Oversized Wheels", value: "oversizedWheels" },
    { displayText: "Mud Tires", value: "mudTires" },
    { displayText: "Mud Guards", value: "mudGuards" },
    { displayText: "Trail Running Boards", value: "trailRunningBoards" },
    { displayText: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [];
</script>

# Checkbox Group
This component will create multiple checkboxes that are part of the same group. In a checkbox group, the selected values will populate a single array that could then be sent to the backend for storage or processing. 

The `<CheckboxGroup>` component might be useful in a scenario where you are working with a dynamic array of data and you don't know what values are in the dynamic array (so you wouldn't know what checkbox values would be needed when you are coding the form). In that kind of scenario the `<CheckboxGroup>` component could be used to display one checkbox for each element in the array. 

You can read more about this component under the "Plain HTML vs Svelte Checkboxes" heading toward the bottom of this page.

---

## Example Usage

### `checkboxGroupValues` elements with primitive data type

<p>Select any of the following options for your SUV:</p>

<CheckboxGroup
  checkboxGroupValues={suvOptions}
  bind:selectedValues={selectedSuvOptions}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>


```svelte
<script>
  import { CheckboxGroup } from "@fanny-pack-ui/svelte-kit";

  const suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [suvOptions[0]];
</script>

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptions}
  bind:selectedValues={selectedSuvOptions}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

<br>

### `checkboxGroupValues` elements with object data type

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptionsObjects}
  valueLabel="displayText"
  bind:selectedValues={selectedSuvOptionsObjects}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptionsObjects</code>: <code>{JSON.stringify(selectedSuvOptionsObjects)}</code></div>

```svelte
<script>
  import { CheckboxGroup } from "@fanny-pack-ui/svelte-kit";

  const suvOptionsObjects = [
    { displayText: "Oversized Wheels", value: "oversizedWheels" },
    { displayText: "Mud Tires", value: "mudTires" },
    { displayText: "Mud Guards", value: "mudGuards" },
    { displayText: "Trail Running Boards", value: "trailRunningBoards" },
    { displayText: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [];
</script>

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptionsObjects}
  valueLabel="displayText"
  bind:selectedValues={selectedSuvOptionsObjects}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

Note that if you pass an array of objects to the `optionsArray` prop, then each object inside the array should have `label` and `value` properties.

<hr>

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `checkboxGroupValues` | `array` | Any array | NA | The array that is passed to this prop is the array of values that will be looped over to create the checkboxes. |
| `valueLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `checkboxGroupValues` array | `null` | When the `valueLabel` prop is used with an array of objects (which are passed to the `checkboxGroupValues` prop), the `valueLabel` prop will provide the property name that will be used as the label text for the `<CheckboxGroup>` component's values. |
| `bind:selectedValues` | `array` | Any array | `[]` (an empty array) | The array that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `checkboxGroupValues` array. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable all the checkboxes in the group. |
| `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--checkbox-default-margin-bottom)` | This prop will set the default `margin-bottom` for the checkbox.<br><br>The default value for all checkboxes can be changed in the `theme.css` file. |
| `verticalAlignment` | `string` | Any CSS length value or CSS size variable from your `theme.css` file. | `var(--checkbox-default-vertical-alignment)` | This prop will set the default `top` (position) property for the checkbox.<br><br>The default value for all checkboxes can be changed in the `theme.css` file. |

</div>

<br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler with `on:change={handlerFunction}` when a user checks this `<Checkbox>` component. |
| `on:input` | This component forwards the `input` event, so you can call an event handler with `on:input={handlerFunction}` when a user checks this `<Checkbox>` component. |

</div>

<br>

## Plain HTML vs Svelte Checkboxes

### Plain HTML Checkboxes
In plain HTML, checkboxes are typically defined with `name`/`value` pairs inside a `<form>` element, like this:

```html
<form action="http://www.example.com" method="POST">
  <label>
  	<input type="checkbox" name="oversized wheels" value=true> Oversized Wheels
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud tires" value=true> Mud Tires
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud guards" value=true> Mud Guards
  </label>
  <br>
  <input type="submit" value="Submit">
</form>
```

Notice that each checkbox is independent of the others. In other words, there is no `group` attribute or option.

When the form is submitted, the request will include the `name`/`value` pairs in the `request body`, which would look like this (assuming the first two checkboxes were checked):

```
oversized wheels=true&mud tires=true 
```

### Svelte Checkboxes
In Svelte, you can also create individual checkboxes, similar to how you would in plain HTML. (The [`<Checkbox>`](/docs/components/checkbox) component is an example of this.) But Svelte also gives you a `bind:group` option. The `bind:group` option allows you to group a set of checkboxes together and the selected values from those checkboxes will populate a single array that could then be sent to the backend for storage or processing. So instead of a set of `name`/`value` pairs for each checkbox, the request `body` would include an array that contains the values from all the checkboxes that the user selected.

So the `bind:group` option for Svelte checkboxes is a nice add-on feature that does not exist in plain HTML. So when working with Svelte checkboxes, you could use either regular checkboxes or "grouped" checkboxes.

### Could I loop over a regular `<Checkbox>` component to create a group of checkboxes?
When creating "grouped" checkboxes, you could create them using regular `<Checkbox>` components inside an `{#each}` loop, but you might not get the results you want. This is one example of what that might look like in code:

```svelte
<script>
  const suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [suvOptions[0]];
</script>

<p>Select any of the following options for your SUV:</p>
{#each suvOptions as option, index}
  <Checkbox bind:checked={selectedSuvOptions[index]} label={option} />
{/each}
<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

But this is how the above code would actually work:

<p>Select any of the following options for your SUV:</p>
{#each suvOptions as option, index}
  <Checkbox bind:checked={selectedSuvOptions[index]} label={option} />
{/each}
<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>

<br>

You can see that the `selectedSuvOptions` array gets populated, but it gets populated with `true`, `false`, and `null` values instead of the value of the checkbox that was selected. This may or may not work for your situation. Also, binding default checked values might not work. There are other ways to work with "grouped" checkboxes and you can read more about this issue here: https://github.com/sveltejs/svelte/issues/2308.)

In most cases it would probably be best to either create a series of regular `<Checkbox>` components and bind each one to its own variable or use this `<CheckboxGroup>` component, which will bind the checkbox values to an array.
