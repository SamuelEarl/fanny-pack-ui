<script lang="ts">
  import { AccordionGroup, Accordion, TabsContainer, TabBar, Tab, TabPanel } from "/src/components";
</script>


# Accordion

---

## Example Usage

<AccordionGroup
  border={true} 
  groupPadding="var(--accordion-default-group-padding)" 
  accordionTitlePadding="var(--accordion-default-title-padding)" 
  fontSize="var(--accordion-default-font-size)" 
  spaceBetweenAccordions="var(--accordion-default-space-between-accordions)"
>
  <Accordion id="123" title="Accordion 1" open={true}>
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>

<br>

```svelte
<script>
  import { AccordionGroup, Accordion } from "@fanny-pack-ui/svelte-kit";
</script>

<AccordionGroup
  border={true} 
  groupPadding="var(--accordion-default-group-padding)" 
  accordionTitlePadding="var(--accordion-default-title-padding)" 
  fontSize="var(--accordion-default-font-size)" 
  spaceBetweenAccordions="var(--accordion-default-space-between-accordions)"
>
  <Accordion id="123" title="Accordion 1" open={true}>
    <p>This accordion panel is open by default</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<hr>

Setting `border={true}` on the `<AccordionGroup>` adds a border around a group of accordion menus to give the group a unified appearance. But you can also use the `<Accordion>` components without a border:

<br>

<AccordionGroup border={false} groupPadding="25px">
  <Accordion title="Accordion 1">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>

<br>

```svelte
<script>
  import { Accordion } from "@fanny-pack-ui/svelte-kit";
</script>

<AccordionGroup border={false} groupPadding="25px">
  <Accordion title="Accordion 1">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 2">
    <p>Accordion content</p>
  </Accordion>

  <Accordion title="Accordion 3">
    <p>Accordion content</p>
  </Accordion>
</AccordionGroup>
```

<br>

Note that you can set the `groupPadding` prop to zero to have the accordions stretch to the edges of their parent element.

<br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <!-- <div></div> -->

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `border`<br>*(optional)* | `boolean` | `true`, `false` | `true` | Add a border around a group of accordion menus to give the group a unified appearance. |
    | `groupPadding`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--accordion-default-group-padding)` | The value that is passed to this prop will be applied as the padding between the border and the accordions. |
    | `accordionTitlePadding`<br>*(optional)* | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--accordion-default-title-padding)` | Alter the padding of the accordion buttons. |
    | `fontSize`<br>*(optional)* | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--accordion-default-font-size)` | Alter the font size of the accordion panels. |
    | `spaceBetweenAccordions`<br>*(optional)* | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--accordion-default-space-between-accordions)` | The value that is passed to this prop will be applied as the margin below each of the accordion buttons. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <!-- <div></div> -->

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `title` | `string` | Any string | NA | This prop will provide the title text for the `<Accordion>` component's button. |
    | `open`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will cause the `<Accordion>` component's panel to either be open or closed by default. |
    | `id`<br>*(optional)* | `string` | Any string | `""` (empty string) | You can give your `<Accordion>` components an `id` value that will appear on the `<Accordion>` component's button. |

    </div>
  </TabPanel>
</TabsContainer>

<br><br>

## Slots

<TabsContainer>
  <TabBar>
    <Tab>AccordionGroup</Tab>
    <Tab>Accordion</Tab>
  </TabBar>

  <TabPanel>
    <h2>AccordionGroup</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <!-- <div></div> -->

    <div class="responsive-table">

    | Slot name | Default value | Description |
    | --------- | ------------- | ----------- |
    | Default slot | NA | You can nest as many `<Accordion>` components as you want in between the opening `<AccordionGroup>` and closing `</AccordionGroup>` tags. |

    </div>
  </TabPanel>

  <TabPanel>
    <h2>Accordion</h2>
    
    <!-- <div></div> -->

    <div class="responsive-table">

    | Slot name | Default value | Description |
    | --------- | ------------- | ----------- |
    | Default slot | NA | The elements you nest in between the opening `<Accordion>` and closing `</Accordion>` tags will appear as the `<Accordion>` component's panel content. You can nest any elements you want in between the opening `<Accordion>` and closing `</Accordion>` tags. |

    </div>
  </TabPanel>
</TabsContainer>
