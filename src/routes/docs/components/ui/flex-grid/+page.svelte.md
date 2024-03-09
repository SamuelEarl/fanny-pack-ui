<!--
  * This grid borrows ideas from W3Schools' responsive grid (https://www.w3schools.com/w3css/w3css_grid.asp) and the Carbon Components Svelte Grid (https://carbon-components-svelte.onrender.com/components/Grid).
  * I also used this article as inspiration for creating a grid component system in the first place: https://codyhouse.co/blog/post/css-grid-layout-vs-framework-grid
-->


<script lang="ts">
  import { FlexGrid, FlexRow, FlexCol, TabsContainer, TabBar, Tab, TabPanel } from "/src/components";
</script>


# FlexGrid (layout)

This is a Flexbox-based layout grid.

Why shoud you consider using reusable grid components instead of applying CSS styles (with Flexbox or Grid) to layout your pages? You can certainly use Flexbox or CSS Grid styles to layout elements and components on a page and that will work nicely with small projects. However, when you are working on large projects that have multiple developers you will quickly run into a few important issues.

What should you do when you need to define a grid layout for a new page or a portion of a page? Initially you might create some layout styles somewhere and then copy and paste those layout styles in other places where you need a grid layout. Imagine trying to scale that approach with even a medium sized project. Often times developers end up creating utility classes that they can reuse so they don't have to copy and paste the same CSS grid styles multiple times. However, when using a component-based framework, like Svelte, a better option than using utility classes is using reusable grid components. Reusable grid components can help you prevent code duplication, which greatly simplifies code maintenance.

What about when you are working on a project with multiple developers? Now consistency and standardization become critical. It can be very difficult to standardize on a consistent method for laying out pages using CSS styles alone. Aside from all the duplicated CSS code that happens from copying and pasting CSS layout rules all over the place, some developers might prefer using Flexbox, while others might prefer CSS Grid. Some might be old school and prefer using `float` properties. Even if all the developers on your team agree on a single method for laying out your pages, each developer could implement the layout a little differently. Things can get really messy really quickly. Reusable grid components can help you maintain consistent standards for your page layouts, which also helps with code maintenance. 

Remember that when working with CSS, the main goal is maintainability. So implement standards that make your code easier to maintain.

---

## Example Usage

<!-- <FlexGrid
  colPaddingY={0}
  colPaddingX={20}
  rowMarginsY={0}
  rowMarginsX={-20}
  equalColWidths
  contain
> -->
<FlexGrid
  colGutter={20}
  rowGutter={40}
  equalColWidths
  contain
>
  <FlexRow>
    <FlexCol><div class="cell red">Auto Column</div></FlexCol>
    <FlexCol><div class="cell yellow">Auto Column</div></FlexCol>
    <FlexCol><div class="cell blue">Auto Column</div></FlexCol>
    <FlexCol><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></FlexCol>
  </FlexRow>
  <FlexRow>
    <FlexCol><div class="cell red">Auto Column</div></FlexCol>
    <FlexCol><div class="cell yellow">Auto Column<br><br>This column has more text than the other columns</div></FlexCol>
    <FlexCol><div class="cell blue">Auto Column</div></FlexCol>
    <FlexCol><div class="cell green">Auto Column</div></FlexCol>
  </FlexRow>
</FlexGrid>

<br>

```svelte
<script lang="ts">
  import { FlexGrid, FlexRow, FlexCol } from "@fanny-pack-ui/svelte-kit";
</script>

<FlexGrid
  colPaddingY={0}
  colPaddingX={20}
  rowMarginsY={0}
  rowMarginsX={-20}
  equalColWidths
  contain
>
  <FlexRow>
    <FlexCol><div class="cell red">Auto Column</div></FlexCol>
    <FlexCol><div class="cell yellow">Auto Column</div></FlexCol>
    <FlexCol><div class="cell blue">Auto Column</div></FlexCol>
    <FlexCol><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></FlexCol>
  </FlexRow>
</FlexGrid>

<style>
  .cell {
    height: 100%;
    padding: 10px;
    border: 1px solid var(--white);
    color: var(--white);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--text-color-default);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
```

There are three components: `<FlexGrid>`, `<FlexRow>`, `<FlexCol>`. By default the column widths are not equal, but you can pass the `equalColWidths` prop to the `<FlexGrid>` component to make them be equal widths. You can also set responsive breakpoints for your columns (see below). 

<br>

## Responsive Grid

<FlexGrid
  colGutter={20}
  rowGutter={40}
>
  <FlexRow>
    <FlexCol xs={12} md={6} xl={2}><div class="cell red">1</div></FlexCol>
    <FlexCol xs={12} md={6} xl={6}><div class="cell yellow">2</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell blue">3</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell green">4</div></FlexCol>
  </FlexRow>
  <FlexRow>
    <FlexCol xs={12} md={6} xl={2}><div class="cell red">1</div></FlexCol>
    <FlexCol xs={12} md={6} xl={6}><div class="cell yellow">2</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell blue">3</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell green">4</div></FlexCol>
  </FlexRow>
</FlexGrid>

<br>

```svelte
<FlexGrid
  colPaddingX={10}
  rowMarginsX={-10}
>
  <FlexRow>
    <FlexCol xs={12} md={6} xl={2}><div class="cell red">1</div></FlexCol>
    <FlexCol xs={12} md={6} xl={6}><div class="cell yellow">2</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell blue">3</div></FlexCol>
    <FlexCol xs={12} md={6} xl={2}><div class="cell green">4</div></FlexCol>
  </FlexRow>
</FlexGrid>
```

This `<FlexGrid>` component uses a 12-column layout. That means that for each breakpoint any columns that exceed 12 will wrap to the next row. For example, each of the `xs` values equals `12`, so each `<FlexCol>` will take up the entire row on `xs` screens. Each of the `md` values equals `6`, so each `<FlexCol>` will take up half a row on `md` screens. You can probably do the math for how much space each `<FlexCol>` will take up on `xl` screens and above. You can also resize your screen to see how the columns layout at each of those breakpoints.

<br>

### Column Breakpoints

Fanny Pack UI uses 6 breakpoints:

* `xs`: 0px - 639px (Extra small devices - phones, 600px and smaller)
* `sm`: 640px - 767px (Small devices - portrait tablets and large phones, 601px and larger)
* `md`: 768px - 1023px (Medium devices - landscape tablets, 768px and larger)
* `lg`: 1024px - 1279px (Large devices - laptops, 993px and larger)
* `xl`: 1280px - 1535px (Extra large devices - large laptops and desktops, 1200px and larger)
* `xxl`: 1536px and larger

Just like with any other responsive design system, larger breakpoints will inherit the column values that you set on smaller breakpoints. So, for example, if you only set column values for the `xs` breakpoint, the `xxl` breakpoint will inherit those same column values.

6 breakpoints might seem like a lot to work with, but you don't have to set column values for each breakpoint. One idea you can use is to specify column values for only the `xs`, `md`, and `xl` breakpoints and then allow the other breakpoints to inherit the column values from the breakpoints that are smaller than them (e.g. `sm` will inherit from `xs`, `lg` will inherit from `md`, `xxl` will inherit from `xl`).

Note that the value ranges for each breakpoint can be changed in the `media-queries.css` file.

---

For reference, here are the viewport sizes of some common devices:

* iPhone 8: 375px wide x 667px high (portrait is `xs` range, landscape is `sm` range)
* iPad (in portrait mode): 768px wide x 1024px high (`md` range)
* iPad Pro (in portrait mode): 1024px wide x 1366px high (`lg` range)
* Macbook Pro 15": 1440px wide x 900px high (`xl` range)

<br>

### 12-column Layout
The Fanny Pack `<FlexGrid>` component uses a 12-column layout. A 12-column layout is more versatile than a 16 column layout because it allows developers to implement evenly-spaced 1-, 2-, 3-, 4-, 6-, and 12-column layouts, if necessary.

<br>

## Multiple Rows In A Grid

You can put multiple rows inside a single `<FlexGrid>` component and the `<FlexCol>` components can have different breakpoint values.

<div class="grid-wrapper">
  <FlexGrid
    colPaddingX={20}
    rowMarginsY={20}
    equalColWidths
  >
    <FlexRow>
      <FlexCol><div class="cell red">Auto Column</div></FlexCol>
      <FlexCol><div class="cell yellow">Auto Column</div></FlexCol>
      <FlexCol><div class="cell blue">Auto Column</div></FlexCol>
      <FlexCol><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></FlexCol>
    </FlexRow>
    <hr>
    <FlexRow>
      <FlexCol xs={2} md={4} xl={2}><div class="cell red">1</div></FlexCol>
      <FlexCol xs={4} md={2} xl={6}><div class="cell yellow">2</div></FlexCol>
      <FlexCol xs={4} md={4} xl={2}><div class="cell blue">3</div></FlexCol>
      <FlexCol xs={2} md={2} xl={2}><div class="cell green">4</div></FlexCol>
    </FlexRow>
  </FlexGrid>
</div>

<br>

```svelte
<div class="grid-wrapper">
  <FlexGrid
    colPaddingX={20}
    rowMarginsY={20}
    equalColWidths
  >
    <FlexRow>
      <FlexCol><div class="cell red">Auto Column</div></FlexCol>
      <FlexCol><div class="cell yellow">Auto Column</div></FlexCol>
      <FlexCol><div class="cell blue">Auto Column</div></FlexCol>
      <FlexCol><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></FlexCol>
    </FlexRow>
    <hr>
    <FlexRow>
      <FlexCol xs={2} md={4} xl={2}><div class="cell red">1</div></FlexCol>
      <FlexCol xs={4} md={2} xl={6}><div class="cell yellow">2</div></FlexCol>
      <FlexCol xs={4} md={4} xl={2}><div class="cell blue">3</div></FlexCol>
      <FlexCol xs={2} md={2} xl={2}><div class="cell green">4</div></FlexCol>
    </FlexRow>
  </FlexGrid>
</div>

<style>
  .grid-wrapper {
    border: 1px solid var(--border-color-default);
  }

  ...
</style>
```

Notice that you can even put `<hr>` element in between rows to provide some separation if you want.

<br>

## Offset columns

You can move columns up to 11 columns to the right by passing empty `<FlexCol>` components along with breakpoint props that take up the amount of space you want to offset. Then you can simply pass `<FlexCol>` components that have content.

<div class="grid-wrapper">
  <FlexGrid>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
  </FlexGrid>
</div>

<br>

```svelte
<div class="grid-wrapper">
  <FlexGrid>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
    <FlexRow>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
      <FlexCol xs={3}><div class="cell blue">Column with content</div></FlexCol>
    </FlexRow>
  </FlexGrid>
</div>
```

<hr>

## Props

<TabsContainer>
  <TabBar>
    <Tab>FlexGrid</Tab>
    <Tab>FlexCol</Tab>
  </TabBar>

  <TabPanel>
    <h2>FlexGrid</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `rowMarginsY` | `number` | Any number | `0` | This stands for "row margins y-axis". This will provide top and bottom margins for each `<FlexRow>` in a `<FlexGrid>`. |
    | `rowMarginsX` | `number` | Any number | `0` | This stands for "row margins x-axis". This will provide left and right margins for each `<FlexRow>` in a `<FlexGrid>`. |
    | `colPaddingY` | `number` | Any number | `0` | This stands for "column padding y-axis". This will provide top and bottom padding for each `<FlexCol>` in a `<FlexGrid>`. So this essentially provides top and bottom padding for each cell in a `<FlexGrid>`.
    | `colPaddingX` | `number` | Any number | `0` | This stands for "column padding x-axis". This will provide left and right padding for each `<FlexCol>` in a `<FlexGrid>`. So this essentially provides left and right padding for each cell in a `<FlexGrid>`.
    | `equalColWidths` | `boolean` | `true`, `false` | `false` | If you do not set any column breakpoint values, then the widths of each column will be auto calculated based on the content in each column. However, if you want the column widths to be equal, then you can pass the `equalColWidths` prop to the `<FlexGrid>` component. NOTE: The column breakpoint values will override the `equalColWidths` prop if both are set. |
    | `contain` | `boolean` | `true`, `false` | `false` | The `<FlexGrid>` component references the `.fp-container` class from the `layout.css` utility classes file. The `.fp-container` class sets the `max-width` of an element to `--width-lg` and it centers the content. So if you pass the `contain` prop to a `<FlexGrid>` component, then the content within that `<FlexGrid>` will not spread any wider across the screen than the `--width-lg` value. |
  </TabPanel>

  <TabPanel>
    <h2>FlexCol</h2>

    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `xs`, `sm`, `md`, `lg`, `xl`, `xxl` | `number` | Any number | `0` | Each of these props represents a breakpoint. You can specify the width of each `<FlexCol>` component for the `xs`, `sm`, `md`, `lg`, `xl`, and/or `xxl` breakpoints. Values can be from `1` to `12`.<br><br>This `<FlexGrid>` component uses a 12-column layout. That means that for each breakpoint any columns that exceed 12 will wrap to the next row. See the "Responsive Grid" section above for an explanation and an example of how this works. |
  </TabPanel>
</TabsContainer>


<style>
  .grid-wrapper {
    border: 1px solid var(--border-color-default);
  }

  .cell {
    height: 100%;
    /* padding: 10px; */
    /* border: 1px solid var(--white); */
    color: var(--white);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--text-color-default);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
