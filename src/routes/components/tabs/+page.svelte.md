<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
</script>


# Tabs (tabbed content)

This tabs component is borrowed from this great component in the Svelte REPL: [Tabs](https://svelte.dev/repl/8e68120858e5322272dc9136c4bb79cc?version=3.7.0).

I have simply restyled that component to match the rest of the Fanny Pack UI components.

---

## Example Usage

<TabsContainer
  border={true} 
  containerPadding="var(--tabs-default-container-padding)" 
  tabPadding="var(--tabs-default-tab-padding)"  
  tabFontSize="var(--tabs-default-tab-font-size)"
  panelPadding="var(--tabs-default-panel-padding)"
>
  <TabBar
    tabStyle="line" 
    marginBottom="var(--tabs-default-tab-bar-margin-bottom)"
  >
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "@fanny-pack-ui/svelte-kit";  
</script>

<TabsContainer
  border={true} 
  containerPadding="var(--tabs-default-container-padding)" 
  tabPadding="var(--tabs-default-tab-padding)"  
  tabFontSize="var(--tabs-default-tab-font-size)"
  panelPadding="var(--tabs-default-panel-padding)"
>
  <TabBar
    tabStyle="line" 
    marginBottom="var(--tabs-default-tab-bar-margin-bottom)"
  >
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br>

The order of the `<Tab>` and `<TabPanel>` components matters. The first `<Tab>` is associated with the first `<TabPanel>`, the second `<Tab>` is associated with the second `<TabPanel>`, and so on.

There are two different tab styles: `fill` and `line`. The default style is `line`.

<br>

This is how a `line` tab style looks without a border:

<TabsContainer border={false} containerPadding="20px">
  <TabBar tabStyle="line">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="20px">
  ...
</TabsContainer>
```

<br>

The next example shows how to set the tab style to `fill` with the `tabStyle` prop.

<br>

<TabsContainer border={true} containerPadding="10px">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "@fanny-pack-ui/svelte-kit";
</script>

<TabsContainer border={true} containerPadding="10px">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br>

This is how a `fill` tab style looks without a border:

<br>

<TabsContainer border={false} containerPadding="0">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="0">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>
  ...
</TabsContainer>
```

<br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>TabsContainer</Tab>
    <Tab>TabBar</Tab>
    <Tab>Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>TabsContainer</h2>

    <!-- I don't why, but inserting an element above the markdown table causes the markdown to convert to an HTML table. So, if I remove the following empty <div>, then the markdown table will display as a string of characters instead of a table. Hmmm. -->
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `border` | `boolean` | `true`, `false` | `true` | This prop will add a border around the tab bar and the tab panels. |
    | `containerPadding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--tabs-default-container-padding)` | The value that is passed to this prop will be applied as the padding between the border and the tab contents. The default value can be set in the `theme.css` file. |
    | `tabPadding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--tabs-default-tab-padding)` | The value that is passed to this prop will be applied as the padding for each tab. The default value can be set in the `theme.css` file. |
    | `tabFontSize` | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--tabs-default-tab-font-size)` | The value that is passed to this prop will set the font size for the tabs. The default value can be set in the `theme.css` file.<br><br>Note that this will not change the font size inside the panels because you can change the font yourself depending on the elements that you pass in between the `<TabPanel>` and `</TabPanel>` components. |
    | `panelPadding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--tabs-default-panel-padding)` | The value that is passed to this prop will be applied as the padding for each panel. The default value can be set in the `theme.css` file. |

    </div>

    ---

    *NOTE: You can also wrap your tab components in a `<div>` and apply your own border and padding values. The above props are just for convenience.*
  </TabPanel>

  <TabPanel>
    <h2>TabBar</h2>
    
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `tabStyle` | `string` | `fill`, `line` | `line` | This prop sets the style of the tab bar and the tabs. |
    | `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--tabs-default-tab-bar-margin-bottom)`	| This prop allows you to set a margin below the `<TabBar>` to give some space between the `<TabBar>` and the `<TabPanel>`s. The default value can be set in the `theme.css` file. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Tab</h2>

    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `{...restProps}` | NA | Any attribute that you might want to pass to a `<Tab>` component, for example an `id` attribute. | NA | This component does not normally have attributes, but if you want to pass something like an `id` attribute to this component, then `restProps` allows you to do that. |
  </TabPanel>
</TabsContainer>
