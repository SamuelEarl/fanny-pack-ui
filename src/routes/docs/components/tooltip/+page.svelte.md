<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Button, Tooltip } from "/src/lib";
</script>

# Tooltip

This component uses [Tippy.js](https://atomiks.github.io/tippyjs/) to create tooltips.

---

## Example Usage

<p>Hover over the icon at the end of this sentence to see the tooltip.
  <Tooltip tooltipText="{`You can easily create \n\n tooltips that have \n\n multi-line content.`}">
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</p>

<div style="margin-bottom:20px">
  <Tooltip tooltipText="This button displays a tooltip">
    <Button>
      Hover over this button
    </Button>
  </Tooltip>
</div>

```svelte
<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Button, Tooltip } from "@fanny-pack-ui/svelte-kit";
</script>

<p>Hover over the icon at the end of this sentence to see the tooltip.
  <Tooltip tooltipText="{`You can easily create \n\n tooltips that have \n\n multi-line content.`}">
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</p>

<div style="margin-bottom:20px">
  <Tooltip tooltipText="This button displays a tooltip">
    <Button>
      Hover over this button
    </Button>
  </Tooltip>
</div>
```

You can wrap a `<Tooltip>` component around any DOM element or any other component you want. All you need to do is pass the tooltip text that you want to appear when a user hovers over the tooltip.


---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `tooltipText` | `string` | Any string | NA | This prop accepts a string argument that will act as the tooltip text when a user hovers over the tooltip element. Multi-line strings can be created with newline characters that are inside of backticks, which are inside of curly braces. See the code examples above. |

<br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot | NA | This slot is the DOM element or component that you will wrap with the `<Tooltip>` opening and closing tags. |
