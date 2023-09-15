# Grid (layout)

Users should create their own grid components or their own utility classes to lay their pages out according to their unique layout needs.

For example, a simple `<Grid>` component that displays `<Card>` components might look something like this:

```svelte
<div class="grid">
  <slot />
</div>

<style>
  /* <Card> components are laid out vertically from xs screens up through md screens
  and each <Card> only takes up the vertical space it needs at each breakpoint.
  Each <Card> has a thumbnail image at the top and text on the bottom. */
  @media (--xs-up) {
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  @media (--sm-up) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (--md-up) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  /* <Card> components are laid out horizontally on lg screens and up
  and each <Card> takes up the full width of the screen.
  Each <Card> has a thumbnail image on the left and text on the right. */
  @media (--lg-up) {
    .grid {
      grid-template-columns: 1fr;
    }    
  }
</style>
```
