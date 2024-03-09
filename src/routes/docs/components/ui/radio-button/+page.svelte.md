<script lang="ts">
  import { RadioButton } from "/src/components";

  let flavors = ["Chocolate", "Caramel", "Oreo", "Peanut Butter Cup", "Vanilla"];
  let selectedFlavor = "";

  let sizes = ["small", "medium", "large"];
  let selectedSize = "large";
</script>

# Radio Button

---

# Example Usage

<p>Select your milkshake flavor:</p>

{#each flavors as flavor}
  <div>
    <RadioButton
      id={flavor}
      bind:group={selectedFlavor} 
      value={flavor} 
      marginBottom="var(--radio-default-margin-bottom)" 
      verticalAlignment="var(--radio-default-vertical-alignment)"
    />
  </div>
{/each}

<p>Selected flavor: {selectedFlavor}</p>


```svelte
<script lang="ts">
  import { RadioButton } from "@fanny-pack-ui/svelte-kit";

  let flavors = ["Chocolate", "Caramel", "Oreo", "Peanut Butter Cup", "Vanilla"];
  let selectedFlavor = "";
</script>


<p>Select your milkshake flavor:</p>

{#each flavors as flavor}
  <div>
    <RadioButton 
      id={flavor}
      bind:group={selectedFlavor} 
      value={flavor} 
      marginBottom="var(--radio-default-margin-bottom)" 
      verticalAlignment="var(--radio-default-vertical-alignment)"
    />
  </div>
{/each}

<p>Selected flavor: {selectedFlavor}</p>
```

### Things to note
* Plain HTML radio buttons are grouped by using the same `name` attribute. In Svelte, you group radio buttons together with the `bind:group` option.
* The `<RadioButton>` components will display inline by default. If you want them to display as block elements (i.e. stack on top of each other), then you will need to wrap them in a block element, like a `<div>`. To create space between stacked radio buttons you can either adjust the `--radio-default-margin-bottom` variable in your `theme.css` file or set a `margin-bottom` value on the `<div>` element that you use to wrap your `<RadioButton>` elements.

---

## How to set a default selection and disable radio buttons

<p>Select your milkshake size <em>(we only have large available at the moment)</em>:</p>

{#each sizes as size}
  <div>
    <RadioButton id={size} bind:group={selectedSize} value={size} disabled={size !== "large"} />
  </div>
{/each}

<p>Selected size: {selectedSize}</p>

```svelte
<script lang="ts">
  import { RadioButton } from "@fanny-pack-ui/svelte-kit";

  let sizes = ["small", "medium", "large"];
  let selectedSize = "large";
</script>


<p>Select your milkshake size <em>(we only have large available at the moment)</em>:</p>

{#each sizes as size}
  <div>
    <RadioButton id={size} bind:group={selectedSize} value={size} disabled={size !== "large"} />
  </div>
{/each}

<p>Selected size: {selectedSize}</p>
```

### Things to note
* The selected radio button will match the `selectedSize` variable. You can set the default selection by setting the variable that is bound to the `group` prop (e.g. `selectedSize` in the example above) to equal one of the options from the array that is used to loop over your radio buttons.
* The example above shows you how to disable radio buttons by passing a boolean or an expression that resolves to a boolean to the `disabled` prop.
* You can accidentally set a radio button to be both (1) `disabled` and (2) to be the default value that is selected, so make sure that you do not do that.

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `id` | `string` | Any string | NA | This is the `id` value of the radio button and will also be used with the `<label>` element's `for` attribute. |
| `bind:group` | `string` | Any string | NA | Plain HTML radio buttons are grouped by using the same `name` attribute. In Svelte, you group radio buttons together with the `bind:group` option. |
| `value` | `string` | Any string | NA | This is the value of the radio button. |
| `label` | `string` | Any string | The same text that is passed to the `value` prop. | This is the label text that will be displayed next to the radio button. If you do not pass any text to this prop, then the text from the `value` prop will be used. If you want to remove the label text, then pass an empty string (`""`) to this prop. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the specified radio button. |
| `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--radio-default-margin-bottom)` | This prop will set the default `margin-bottom` for the radio button.<br><br>The default value for all radio buttons can be changed in the `theme.css` file. |
| `verticalAlignment` | `string` | Any CSS length value or CSS size variable from your `theme.css` file. | `var(--radio-default-vertical-alignment)` | This prop will set the default `top` (position) property for the radio button.<br><br>The default value for all radio buttons can be changed in the `theme.css` file. |

</div>

<br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event. You can attach `on:change={handlerFunction}` to your `<RadioButton>` components, which will call an event handler named `handlerFunction` when a user selects a radio button. |
| `on:input` | This component forwards the `input` event. You can attach `on:input={handlerFunction}` to your `<RadioButton>` components, which will call an event handler named `handlerFunction` when a user selects a radio button. |

</div>
