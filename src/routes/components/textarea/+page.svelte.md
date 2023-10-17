<script lang="ts">
  import { Textarea } from "/src/lib";

  let textValue = "Change this text";
  let isDisabled = false;
</script>


# Textarea

---

## Example Usage

<div style="margin-bottom:20px">
  <Textarea
    label="Textarea label"
    id="textarea-id"
    bind:value={textValue}
    padding="var(--textarea-default-padding)"
    fontSize="var(--textarea-default-font-size)"
    placeholder="Enter description"
    disabled={isDisabled}
    on:keyup={() => console.log("EVENT FIRED")}
  />
</div>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Textarea } from "@fanny-pack-ui/svelte-kit";

  let textValue = "Change this text";
  let isDisabled = false;
</script>

<div style="margin-bottom:20px">
  <Textarea
    label="Textarea label"
    id="textarea-id"
    bind:value={textValue}
    padding="var(--textarea-default-padding)"
    fontSize="var(--textarea-default-font-size)"
    placeholder="Enter description"
    disabled={isDisabled}
    on:keyup={() => console.log("EVENT FIRED")}
  />
</div>
```

---

## Custom Textarea Style Props

The original intention for these custom styles was to set `--custom-textarea-bg-color="transparent"` so the `<Textarea>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:

* `--custom-textarea-bg-color`
* `--custom-textarea-border-color`
* `--custom-textarea-text-color`
* `--custom-textarea-placeholder-text-color`

<div style="margin-bottom:20px">
  <Textarea
    bind:value={textValue}
    placeholder="Write a note"
    --custom-textarea-bg-color="pink"
    --custom-textarea-border-color="darkred"
    --custom-textarea-text-color="darkred"
    --custom-textarea-placeholder-text-color="var(--white)"
  />
</div>

```svelte
<Textarea
  bind:value={textValue}
  placeholder="Write a note"
  --custom-textarea-bg-color="pink"
  --custom-textarea-border-color="darkred"
  --custom-textarea-text-color="darkred"
  --custom-textarea-placeholder-text-color="var(--white)"
/>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | This prop will provide a label for the `textarea` field. If no `label` prop is provided, then the label will not be displayed. |
| `id` (optional) | `string` | Any string | `""` (empty string) | You can give your `<Textarea>` components an id value, if necessary, just like you can with regular `<textarea>` elements. |
| `bind:value` | `string` | Any string | `""` (empty string) | In order for the `textarea` field to be updated with a string value, this component’s value property needs to be bound to a string variable. |
| `padding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--textarea-default-padding)` | This prop will set the padding for the input field.<br><br>The default value can be changed in the `theme.css` file. |
| `fontSize` | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--textarea-default-font-size)` | This prop will set the font size for the input field.<br><br>The default value can be changed in the `theme.css` file. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the `textarea` field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `textarea` field. |
| `{...restProps}` | NA | Any attribute that you can pass to a `<textarea>` element. | NA | This component does not specify every possible attribute that you can pass to a `<textarea>` element. However, `restProps` allows you to pass any attributes to this `<Textarea />` component that you could normally pass to a `<textarea>` element. For example, if you want to specify a taller `<Textarea>` component, then you could pass the `rows` prop, like this: `rows="10"` |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the `textarea` field. |
| `on:keyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
| `on:blur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
