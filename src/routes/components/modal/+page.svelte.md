<script lang="ts">
  import { Button, Checkbox, Modal } from "/src/lib";
  import LoginForm from "./LoginForm.svelte";

  let showModal = false;
  let showModalBody = false;
  let showLoginModal = false;
  let showLoginModalCode = false;
  let loggingIn = false;
  let savingEdits = false;
  let enableScrollingBody = true;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>


# Modal (popup window)

---

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>
<br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    --custom-modal-header-padding-mobile="5px"
    --custom-modal-header-padding-desktop="15px"
    --custom-modal-footer-padding-mobile="5px"
    --custom-modal-footer-padding-desktop="15px"
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
  >
    <div slot="modalBody" class="modal-body">
      <div>Modal body text goes here...</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div slot="modalFooterLeft">
      <Button
        btnIcon="ion:save-sharp"
        disabled={savingEdits} 
        on:click={handleSaveData}
      >
        Save Data
        <span slot="btnTextDisabled">Saving Data...</span>
      </Button>
      <Button>Another Footer Button</Button>
    </div>
    <div slot="modalFooterRight">
      <Button>Another Footer Button</Button>
      <Button btnIcon="fa-solid:times" disabled={savingEdits} on:click={() => showModal = false}>Close</Button>
    </div>
  </Modal>
{/if}

```svelte
<script>
  import { Button, Checkbox, Modal } from "@fanny-pack-ui/svelte-kit";

  let showModal = false;
  let savingEdits = false;
  let enableScrollingBody = true;

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>

<Button btnIcon="" on:click={() => showModal = true}>Click To Show Modal</Button>
<br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    disabled={savingEdits}
    on:closeModal={() => showModal = false}
    --custom-modal-header-padding-mobile="5px"
    --custom-modal-header-padding-desktop="15px"
    --custom-modal-footer-padding-mobile="5px"
    --custom-modal-footer-padding-desktop="15px"
  >
    <div slot="modalBody" class="modal-body">
      <div>Modal body text goes here...</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </div>
    <div slot="modalFooterLeft">
      <Button
        btnIcon="ion:save-sharp"
        disabled={savingEdits} 
        on:click={handleSaveData}
      >
        Save Data
        <span slot="btnTextDisabled">Saving Data...</span>
      </Button>
    </div>
    <div slot="modalFooterRight">
      <Button>Another Footer Button</Button>
      <Button btnIcon="mdi:close" disabled={savingEdits} on:click={() => showModal = false}>Close</Button>
    </div>
  </Modal>
{/if}

<style>
  @media (--xs-up) {
    .modal-body {
      padding: 5px;
    }
  }

  @media (--lg-up) {
    .modal-body {
      padding: 15px;
    }
  }
</style>
```

---

## Exclude Modal Header or Footer
You can exclude the modal header by leaving out the `title` prop.

You can exclude the modal footer by leaving out the `modalFooterLeft` and `modalFooterRight` slots.

<Button btnIcon="" on:click={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>
<br>

{#if showModalBody}
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody" style="padding: 10px;">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal</p>
    </div>
    <!-- No modalFooterLeft or modalFooterRight slots -->
  </Modal>
{/if}

```svelte
<script>
  import { Button, Modal } from "@fanny-pack-ui/svelte-kit";

  let showModalBody = false;
</script>

<Button btnIcon="" on:click={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>
<br>

{#if showModalBody}
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    on:closeModal={() => showModalBody = false}
  >
    <div slot="modalBody" style="padding: 10px;">
      <div>This modal only has a body (i.e. there is no header or footer included).</div>
      <h3>I can put header tags inside this modal</h3>
      <p id="custom-p">I can put any custom styled content inside this modal</p>
    </div>
    <!-- No `modalFooterLeft` or `modalFooterRight` slots -->
  </Modal>
{/if}

<style>
  #custom-p {
    font-size: 2rem;
    line-height: 2rem;
  }
</style>
```

---

You can put almost anything inside of a modal body:

<Button btnIcon="" on:click={() => showLoginModal = true}>Show Login Modal</Button>
<br>

{#if showLoginModal}
  <Modal
    showCloseButton={false}
    on:closeModal={() => showLoginModal = false}
  >
    <div slot="modalBody">
      <LoginForm 
        on:login={(event) => loggingIn = event.detail} 
        on:authenticated={() => showLoginModal = false}
        on:cancel={() => showLoginModal = false}
      />
    </div>
  </Modal>
{/if}

```svelte
<script>
  import { Button, Modal } from "@fanny-pack-ui/svelte-kit";

  let showLoginModal = false;
  let loggingIn = false;
</script>

<Button btnIcon="" on:click={() => showLoginModal = true}>Show Login Modal</Button>
<br>

{#if showLoginModal}
  <Modal
    showCloseButton={false}
    on:closeModal={() => showLoginModal = false}
  >
    <div slot="modalBody">
      <LoginForm 
        on:login={(event) => loggingIn = event.detail} 
        on:authenticated={() => showLoginModal = false}
        on:cancel={() => showLoginModal = false}
      />
    </div>
  </Modal>
{/if}
```

NOTE: You can dispatch events that will trigger the modal to be closed. For example, in the code above, a `cancel` event is dispatched with `dispatch("cancel")`. The `<LoginForm>` listens for the `on:cancel` event and closes the modal.

---

## Custom Modal Style Props

The content that you pass to the `modalBody` slot can be completely custom - both the content and styles. The modal header and modal footer can also be styled to fit your needs with these style props.

<div class="responsive-table">

| Prop name | Default value | Description |
| --------- | ------------- | ----------- |
| `--custom-modal-header-font-family` | `var(--sans-serif)`<br>Refer to this variable in the `theme.css` file. | Set the font family for the modal header. |
| `--custom-modal-header-font-weight` | `bold` | Set the font weight for the modal header. |
| `--custom-modal-header-font-size-mobile` | `--font-size-xl`<br>Refer to this variable in the `theme.css` file. | Set the header font size for `xs`, `sm`, and `md` media query sizes. |
| `--custom-modal-header-font-size-desktop` | `--font-size-xl`<br>Refer to this variable in the `theme.css` file. | Set the header font size for `lg` media query sizes and up. |
| `--custom-modal-header-bg-color` | `transparent` | Set the header background color. |
| `--custom-modal-header-text-color` | `--text-color-default` | Set the header text color. |
| `--custom-modal-header-padding-mobile` | `5px` | Set the padding around the header on `xs`, `sm`, and `md` media query sizes. |
| `--custom-modal-header-padding-desktop` | `15px` | Set the padding around the header on `lg` media query sizes and up. |
| `--custom-modal-footer-padding-mobile` | `5px` | Set the padding around the footer on `xs`, `sm`, and `md` media query sizes. |
| `--custom-modal-footer-padding-desktop` | `15px` | Set the padding around the footer on `lg` media query sizes and up. |

</div>

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `title` | `string` | Any string | `""` (an empty string) | This prop will set the title of the modal.
| `scrollingBody` | `boolean` | `true`, `false` | `true` | If this prop is set to `true`, then the modal will fill the height of the screen. Also, if the content inside the modal body overflows the available space, then a scrollbar will appear and the modal body content will scroll.
| `disabled` | `boolean` | `true`, `false` | `false` | When this prop is set to `true` then the close button in the top-right corner of the modal will be disabled. You might want to disable the close button in scenarios where a user clicks a button that will save edits to a database and you don't want users to be able to close the modal until after the edits have been saved to a database. |
| `showCloseButton` | `boolean` | `true`, `false` | `true` | You can set `showCloseButton` to `false` for modals where you don't want to show a close button in the top-right corner. |
| `contentBgColor` | `string` | Any CSS color value. | `var(--white)` | Set the background color of the modal to any color you want. If you are displaying dark text against a white background, then you can use the default settings. But if you are displaying something else and if you are using a `border-radius` value higher than `0`, then you might want to set this value to `transparent` so the modal content's background color does not show through at the corners. You could also set this value to a different color if you want a modal with a background color other than white. |
| `headerFooterBorderColor` | `string` | Any CSS color value. | `var(--neutral-3)` | Set the border color between the modal header and the modal body as well as the border color between the modal footer and the modal body to any color you want. |

</div>

<br><br>

## Slots

<div class="responsive-table">

| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| `modalBody` | NA | The content that is passed to this slot will be displayed in the modal body. You can pass any custom content to this slot. See the example under the "Exclude Modal Header or Footer" heading.<br><br>The content that is passed in between the opening `<div slot="modalBody">` and closing `</div>` tags will not have any padding around it. This works great for displaying things like a sign in form, an image, or a chart. But if you want to pass text in between those tags, then you should include some padding styles so the text isn't right up against the border of the `modalBody`. |
| `modalFooterLeft` | NA | The content that is passed to this slot will be displayed in the left side of the modal footer. |
| `modalFooterRight` | NA | The content that is passed to this slot will be displayed in the right side of the modal footer. |

</div>

<br>

**NOTE**: The footer is designed to contain buttons. You can include as many footer buttons as you want as long as they fit the footer space without spilling over.

<br><br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:closeModal` | The `<Modal>` component forwards this custom event, which can be used to hide the modal when a user clicks the modal's close button. |

</div>


<style>
  @media (--xs-up) {
    .modal-body {
      padding: 5px;
    }

    #custom-p {
      font-size: 2rem;
      line-height: 2rem;
    }
  }

  @media (--lg-up) {
    .modal-body {
      padding: 15px;
    }
  }
</style>
