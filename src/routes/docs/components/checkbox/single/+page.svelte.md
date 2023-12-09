<script lang="ts">
  import { Checkbox } from "/src/lib";

  let haveRead = false;
  let checkboxLabel = "I have read the terms and conditions.";
</script>

# Checkbox
This component will create a single checkbox. If you want to create multiple checkboxes that are part of the same group, then look at the [Checkbox Group](/docs/components/checkbox-group) component.

---

## Example Usage

<Checkbox
  id="terms-and-conditions"
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
/>

<p>Your selection: <strong>{haveRead}</strong></p>

```svelte
<script>
  import { Checkbox } from "@fanny-pack-ui/svelte-kit";

  let haveRead = false;
  let checkboxLabel = "I have read the terms and conditions.";
</script>

<Checkbox
  id="terms-and-conditions"
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
/>

<p>Your selection: <strong>{haveRead}</strong></p>
```

You can use the `on:change` or `on:input` event like this:

```svelte
<script>
  ...

  function handleChange() {
    alert("Checkbox has been changed");
  }
</script>

<Checkbox
  id="terms-and-conditions"
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
  on:change={handleChange}
/>
```

<hr>

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `id` | `string` | Any string | NA | This is the `id` value of the checkbox and will also be used with the `<label>` element's `for` attribute. |
| `bind:checked` | `boolean` | `true`, `false` | NA | In order for the checkbox to be checked and unchecked, this component's `checked` property needs to be bound to a `boolean` variable. |
| `label` | `string` | Any string | NA | This is the text that will be displayed next to the checkbox. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the checkbox. |
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
