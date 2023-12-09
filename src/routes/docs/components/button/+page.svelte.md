<script lang="ts">
  import Icon from "@iconify/svelte";
  // import Prism from "prismjs";
  // // Svelte code highlighting: https://github.com/pngwn/prism-svelte
  // import "prism-svelte";
  import { Button, Input, Select, Textarea, Tooltip } from "/src/lib";

  let creatingAccount = false;
  let savingData = false;

  let sendingForm = false;
  let name = "";
  let subject = "";
  let email = "";
  let message = "";
  $: checkValidation = () => {
    let isInvalid = true;
    if (name && subject && email && message) {
      isInvalid = false;
    }
    return isInvalid;
  }

  function handleSubmit() {
    sendingForm = true;
    setTimeout(() => {
      sendingForm = false;
      name = "";
      subject = "";
      email = "";
      message = "";
    }, 3000);
  }

  const colorOptions = [
    "var(--primary-color)",
    "var(--secondary-color)",
    "var(--tertiary-color)",
    "var(--white)",
    "var(--black)",
    "transparent"
  ];
  const fontSizeOptions = ["8px","12px","16px","20px","24px"];
  const paddingSizeOptions = ["0px 5px","5px 10px","10px 15px","15px 20px","20px 25px"];
  let selectedBgColor = "var(--primary-color)";
  let selectedBorderColor = "var(--primary-color)";
  let selectedTextColor = "var(--white)";
  let selectedBtnPadding = "10px 15px";
  let selectedBtnFontSize = "16px";
  let selectedBtnWidth = "auto";
  let showInteractiveButtons = true;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }

  function handleRefreshInteractiveBtns() {
    showInteractiveButtons = false;
    setTimeout(() => {
      showInteractiveButtons = true;
    }, 0);
  }
</script>


# Button

---

## Example Usage

<Button
  id="some-id"
  type="button"
  bgColor="var(--btn-default-bg-color)"
  borderColor="var(--btn-default-border-color)"
  textColor="var(--btn-default-text-color)"
  padding="var(--btn-default-padding)"
  fontSize="var(--btn-default-font-size)"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabledShouldSpin={true}
  btnIconSide="right"
  on:click={handleCreateAccount}
  rotateBtnIcon="45deg"
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

<br>

```
<script>
  import { Button } from "@fanny-pack-ui/svelte-kit";

  let creatingAccount = false;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>

<Button
  id="some-id"
  type="button"
  bgColor="var(--btn-default-bg-color)"
  borderColor="var(--btn-default-border-color)"
  textColor="var(--btn-default-text-color)"
  padding="var(--btn-default-padding)"
  fontSize="var(--btn-default-font-size)"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabledShouldSpin={true}
  btnIconSide="right"
  on:click={handleCreateAccount}
  rotateBtnIcon="45deg"
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>
```

---

## How to use as the submit button in a `<form>`

<form method="POST" on:submit|preventDefault={handleSubmit}>
  <div class="form-field">
    <Input type="text" bind:value={name} label="Your Name" />
  </div>
  <div class="form-field">
    <Input type="text" bind:value={subject} label="Subject" />
  </div>
  <div class="form-field">
    <Input type="text" bind:value={email} label="Your Email Address" />
  </div>
  <div class="form-field">
    <Textarea bind:value={message} label="Message" rows="5" />
  </div>
  <div class="form-field">
    <Button type="submit" disabled={sendingForm} formIsInvalid={checkValidation()} btnIcon="fa:send">
      Send
    </Button>
  </div>
</form>

<br><br>

```
<script>
  let sendingForm = false;
  let name = "";
  let subject = "";
  let email = "";
  let message = "";

  // Not an actual form validation.
  $: checkValidation = () => {
    let isInvalid = true;
    if (name && subject && email && message) {
      isInvalid = false;
    }
    return isInvalid;
  }

  async function handleSubmit(event) {
    sendingForm = true;

    // Custom event listener goes here.
    // See https://kit.svelte.dev/docs/form-actions#progressive-enhancement-custom-event-listener
  }
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
  <Input type="text" bind:value={name} label="Your Name" />
  <Input type="text" bind:value={subject} label="Subject" />
  <Input type="text" bind:value={email} label="Your Email Address" />
  <Textarea bind:value={message} label="Message" rows="5" />
  <Button type="submit" disabled={sendingForm} formIsInvalid={checkValidation()} btnIcon="fa:send">
    Send
  </Button>
</form>
```

---

## Interactive Example

<div class="interactive-example">
  <div class="light-bg">
    {#if showInteractiveButtons}
      <Button
        bgColor={selectedBgColor}
        borderColor={selectedBorderColor}
        textColor={selectedTextColor}
        padding={selectedBtnPadding}
        fontSize={selectedBtnFontSize}
        width={selectedBtnWidth}
        disabled={creatingAccount}
        btnIcon="bi:person-plus-fill"
        btnIconDisabled="bi:gear-wide-connected"
        btnIconDisabledShouldSpin={true}
        btnIconSide="right"
        on:click={handleCreateAccount}
      >
        Create Account
        <span slot="btnTextDisabled">Creating Account...</span>
      </Button>
    {/if}
  </div>

  <div class="dark-bg">
    {#if showInteractiveButtons}
      <Button
        bgColor={selectedBgColor}
        borderColor={selectedBorderColor}
        textColor={selectedTextColor}
        padding={selectedBtnPadding}
        fontSize={selectedBtnFontSize}
        width={selectedBtnWidth}
        disabled={creatingAccount}
        btnIcon="bi:person-plus-fill"
        btnIconDisabled="bi:gear-wide-connected"
        btnIconDisabledShouldSpin={true}
        btnIconSide="right"
        on:click={handleCreateAccount}
      >
        Create Account
        <span slot="btnTextDisabled">Creating Account...</span>
      </Button>
    {/if}
  </div>
</div>

<br>

<div class="grid">
  <div>
    <Select
      label="Background Color"
      options={colorOptions}
      bind:value={selectedBgColor}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
  <div>
    <Select
      label="Font Size"
      options={fontSizeOptions}
      bind:value={selectedBtnFontSize}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
  <div>
    <Select
      label="Border Color"
      options={colorOptions}
      bind:value={selectedBorderColor}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
  <div>
    <Select
      label="Padding"
      options={paddingSizeOptions}
      bind:value={selectedBtnPadding}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
  <div>
    <Select
      label="Text Color"
      options={colorOptions}
      bind:value={selectedTextColor}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
  <div>
    <Select
      label="Width"
      options={["auto","full"]}
      bind:value={selectedBtnWidth}
      on:change={handleRefreshInteractiveBtns}
    />
  </div>
</div>

---

## Icon Buttons
You can create buttons that have only icons (i.e. no text). Do not pass any slots in between the opening `<Button>` and closing `</Button>` tags and provide the `btnIcon` and/or `btnIconDisabled` props.

<Button
  btnIcon="ion:save-sharp" 
  padding="10px"
  fontSize="24px"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
></Button>

<br>

```
<script>
  let savingData = false;

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }
</script>

<Button
  btnIcon="ion:save-sharp" 
  padding="10px"
  fontSize="24px"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
></Button>
```

<br>

Another option for creating icon buttons is to pass an Iconify icon component to the default slot:

<Button
  btnIcon=""
  padding="10px 20px"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
>
  <Icon icon="ion:save-sharp" width=40 />
  <span slot="btnTextDisabled">
    <Icon icon="icomoon-free:spinner2" class="fp-spin" width=40 />
  </span>
</Button>

<br>

```
<script>
  import Icon from "@iconify/svelte";

  let savingData = false;

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }
</script>

<Button
  btnIcon=""
  padding="10px 20px"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
>
  <Icon icon="ion:save-sharp" width=40 />
  <span slot="btnTextDisabled">
    <Icon icon="icomoon-free:spinner2" class="fp-spin" width=40 />
  </span>
</Button>
```

**NOTES:**

* You need to set `btnIcon=""` to remove any other icons that would be displayed as part of this `<Button>` component's props.
* You can pass another icon to the `btnTextDisabled` slot if you want to display a disabled state.
* The nice thing about this option is that you can set any Iconify props on the `<Icon>` component (e.g. the `width` prop in the example above.)

---

## Custom Button Style Props

There are situations where you might want to tweak (or even completely overhaul) the look of a button. For example, you might need uniquely styled buttons when creating a login page that has buttons for different authentication providers or maybe you want to make some minor modifications to the styles of buttons in your header or footer.

You can customize these buttons almost infinitely by passing different values to the `bgColor`, `borderColor`, `textColor`, `padding`, and `fontSize` props. You can also change or remove the button icons.

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `type` | `string` | `button`, `submit`, `reset` | `button` | Specify the type of button. |
| `bgColor` | `string` | Any CSS color value or CSS color variable from your `theme.css` file. | `var(--btn-default-bg-color)` | This prop is for the button's `background-color`. The default value can be set in the `theme.css` file. |
| `borderColor` | `string` | Any CSS color value or CSS color variable from your `theme.css` file. | `var(--btn-default-border-color)` | This prop is for the button's `border-color`. The default value can be set in the `theme.css` file. |
| `textColor` | `string` | Any CSS color value or CSS color variable from your `theme.css` file. | `var(--btn-default-text-color)` | This prop is for the button's `color`. The default value can be set in the `theme.css` file. |
| `padding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--btn-default-padding)` | Alter the padding of the button. The default value can be set in the `theme.css` file. |
| `fontSize` | `string` | Any CSS font size value or CSS font size variable from your `theme.css` file. | `var(--btn-default-font-size)` | Alter the font size of the button. The default value can be set in the `theme.css` file. |
| `width` | `string` | `auto`, `full` | `auto` | `auto` will be wide enough to fit the contents of the button. `full` will fill the width of the button's parent element. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the button and display the `btnTextDisabled` text and the `btnIconDisabled` (if it has been set). |
| `formIsInvalid` | `boolean` | `true`, `false` | `false` | This only applies to `submit` buttons (`<Button type="submit" />`). If `formIsInvalid=true`, then the button will be disabled, but it will NOT show the disabled icon or text. It will just prevent the user from submitting the form. |
| `btnIcon` | `string` | Any icon name from the Iconify library. | `""` (no icon) | You can pass an empty string to remove the button icon. If either the `btnIcon` or `btnIconDisabled` is set to an empty string, then no button icons or disabled button icons will be displayed with the button. This is intentional by design because it could look strange if you have a button icon during a regular state and then no icon during a disabled state or vice versa. If you don't want icons on your buttons, but would like to change the button text when a button is disabled, then refer to the `btnTextDisabled` slot below. |
| `btnIconDisabled` | `string` | See `btnIcon` | `"icomoon-free:spinner2"` | See `btnIcon` |
| `btnIconDisabledShouldSpin` | `boolean` | `true`, `false` | `true` | A value of `true` will cause the icon on a disabled button to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of `false` will prevent the icon on a disabled button from spinning. |
| `btnIconSide` | `string` | `left`, `right` | `right` | This sets the icon to either the left or right side of the button. |
| `rotateBtnIcon` (optional) | `string` | Any number with `deg` appended to the end. | `"0deg"` (i.e. no rotation) | You can pass a rotate value to this prop and the icon will be rotated according to the value you pass. For example, `"45deg"` will rotate the icon 45 degrees. |
| `rotateBtnIconDisabled` (optional) | `string` | See `rotateBtnIcon` | See `rotateBtnIcon` | This will rotate the disabled button icon (`btnIconDisabled`). See `rotateBtnIcon` for details. |

</div>

<br><br>

## Slots

<div class="responsive-table">

| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot (optional) | `Button Text` | The text that will be displayed in the button. |
| `btnTextDisabled` (optional) | `Disabled Button Text` | This is the text that will appear when the button is in a disabled state. If the `btnTextDisabled` slot is not provided, then the text that is passed through the default slot will be used if/when the button is disabled. |

</div>

<br><br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `on:click` | This component forwards the `click` event, so you can call an event handler when a user clicks this `<Button>` component. |

</div>

<br><br>

## Style Notes
Depending on the colors that you use as your `primary`, `secondary`, and `tertiary` colors, you might need to change the values for the button text colors in your `theme.css` file. These are the class names that you need to look at:

```
"text-color-for-primary-bg"
"text-color-for-secondary-bg"
"text-color-for-tertiary-bg"
```

<style>
  @media (--xs-up) {
    .form-field {
      margin-bottom: 15px;
    }

    .interactive-example {
      display: flex;
      flex-direction: column;

      & div {
        flex: 1;
        min-height: 150px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 20px;
      }

      & .light-bg {
        background-color: var(--neutral-2);
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }

      & .dark-bg {
        background-color: var(--neutral-12);
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }
    }
  }

  @media (--lg-up) {
    .interactive-example {
      flex-direction: row;
    }
  }
</style>
