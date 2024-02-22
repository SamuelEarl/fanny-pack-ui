<script lang="ts">
  import { Button, Toast, ToastContent } from "/src/components";

  function setInfoToast() {
    ToastContent.set({ type: "info", msg: 'The "info" toast type will show a notification to your users that is intended for informational purposes. This toast uses the default "duration" prop and will automatically close after 7 seconds.' });
  }

  function setSuccessToast() {
    ToastContent.set({ type: "success", msg: 'The "success" toast type is meant to show a notification to your users when an operation executed successfully. This toast is overriding the default "duration" with a custom "duration" of Infinity and will not automatically close. You will need to click the "x" to the right to close this.', duration: Infinity });
  }

  function setWarningToast() {
    ToastContent.set({ type: "warning", msg: 'The "warning" toast type is meant to show a notification to your users when you need to warn them about something. This toast is overriding the default "duration" with a custom "duration" of 3.5 seconds.', duration: 3500 });
  }

  function setErrorToast() {
    ToastContent.set({ type: "error", msg: 'The "error" toast type is meant to show a notification to your users when an error occurred that you want to notify them about. This toast uses the default "duration" prop and will automatically close after 7 seconds.' });
  }
</script>

# Toast (notification pane)

The `<Toast>` component has two parts:
1. The actual `<Toast>` component (i.e. the notification pane).
2. The `ToastContent` store. The object that you pass to the `ToastContent` store will define (1) the type of notification pane that you want to show to your users, (2) the message that will be shown when the toast is displayed, and (3) the length of time that the toast will be displayed. See the `ToastContent.set()` heading toward the bottom of this page for more details.

---

## Example Usage

<Button btnIcon="" on:click={setInfoToast}>Click to show an "info" notification</Button>

<br>

**Step 1**: Import the `<Toast>` component into another component (probably your `/src/routes/+layout.svelte` component) so you can show notifications to your users.

*`/src/routes/+layout.svelte`*
```svelte
<script>
  import { Toast } from "@fanny-pack-ui/svelte-kit";
</script>

<Toast duration={7000} fontSize="1.15rem" />
```

*NOTE: If you want the default `duration` to be `Infinity`, which will keep the toasts displaying indefinitely and will require your users to manually close them by clicking the "x" on the right side of the toasts, then you can set the `duration` prop like this: `<Toast duration={Infinity} />`*

**Step 2**: Import the `ToastContent` store into any component where you want to trigger a toast that will appear for your users.

*`/src/routes/login.svelte`*
```svelte
<script>
  import { Button, ToastContent } from "@fanny-pack-ui/svelte-kit";

  function setInfoToast() {
    ToastContent.set({ 
      type: "info", 
      msg: 'The "info" toast type will show...'
    });
  }
</script>

<Button btnIcon="" on:click={setInfoToast}>Click to show an "info" notification</Button>
```

*NOTE: Since a `duration` property is not passed to `ToastContent.set()` in this example, this toast will use the default duration from the `duration` prop.*

---

<Button btnIcon="" on:click={setSuccessToast}>Click to show a "success" notification</Button>

<br>

```svelte
<script>
  import { Button, ToastContent } from "@fanny-pack-ui/svelte-kit";

  function setSuccessToast() {
    ToastContent.set({ 
      type: "success", 
      msg: 'The "success" toast type is meant...', 
      duration: Infinity
    });
  }
</script>

<Button btnIcon="" on:click={setSuccessToast}>Click to show a "success" notification</Button>
```

*NOTE: This toast is overriding the default `duration` with a custom `duration` of `Infinity`, so the toast will not automatically close.*

---

<Button btnIcon="" on:click={setWarningToast}>Click to show a "warning" notification</Button>

<br>

```svelte
<script>
  import { Button, ToastContent } from "@fanny-pack-ui/svelte-kit";

  function setWarningToast() {
    ToastContent.set({ 
      type: "warning", 
      msg: 'The "warning" toast type is meant...', 
      duration: 3500 
    });
  }
</script>

<Button btnIcon="" on:click={setWarningToast}>Click to show a "success" notification</Button>
```

*NOTE: This toast is overriding the default `duration` with a custom `duration` of 3.5 seconds.*

---

<Button btnIcon="" on:click={setErrorToast}>Click to show an "error" notification</Button>

<br>

```svelte
<script>
  import { Button, ToastContent } from "@fanny-pack-ui/svelte-kit";

  function setErrorToast() {
    ToastContent.set({ 
      type: "error", 
      msg: 'The "error" toast type is meant...' 
    });
  }
</script>

<Button btnIcon="" on:click={setErrorToast}>Click to show an "error" notification</Button>
```

*NOTE: Since a `duration` property is not passed to `ToastContent.set()` in this example, this toast will use the default duration from the `duration` prop.*

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `duration` | `number` | Any number or `Infinity` | `7000` | This prop will be used to set the default length of time that the toasts will be displayed. If the default duration is `Infinity`, then the toast will not automatically close and the user will have to close the toast by clicking the "x". If the default duration is a number other than `Infinity`, then the toast will clear after the `duration` has elapsed. |
| `fontSize` | `string` | Any number followed by a CSS unit length. | `"1.15rem"` | This prop will set the font size property for all the toast messages. |

<br>

## ToastContent.set()

In order to display a toast to the user you need to call `ToastContent.set()` and pass it a content object (as shown in the examples above). You should pass an object with the following structure to `ToastContent.set()`:

```js
{
  type: String,
  msg: String,
  duration: Number
}
```

<br>

| Property name | Type | Possible values | Default value | Description |
| ------------- | ---- | --------------- | ------------- | ----------- |
| `type` | `string` | `info`, `success`, `warning`, `error` | NA | This property defines the type of notification pane that will be displayed to the user. |
| `msg` | `string` | Any string | NA | This property defines the message that will be shown when the toast is displayed. |
| `duration` (optional) | `number` | Any number or `Infinity` | `7000` (i.e. 7 seconds) | This property will override the default `duration` prop that is passed to the `<Toast>` component and define the length of time that the toast will be displayed. This property is not required (so you can leave it out of the content object that you pass to `ToastContent.set()`). If you do not specify a value for this property, then the toast will use the default `duration` prop. If you pass `Infinity` to this property, then the toast will not automatically close and the user will have to close the toast by clicking the "x". If the default duration is a number other than `Infinity`, then the toast will clear after the `duration` has elapsed. |

<br>

You can call `ToastContent.set()` from anywhere. Here are just a few examples of where you might call `ToastContent.set()`:

* If a user has unread messages in their account, then you might want to show an `info` notification. In this case you might call `ToastContent.set()` in an `onMount()` hook after the user logs in.
* After a user updates something in their profile or account, then you might want to show a `success` notification. In this case you might call `ToastContent.set()` when you get a successful response from an API call.
* If a user is approaching the end of a subscription, then you might want to show a `warning` notification. In this case you might call `ToastContent.set()` in an `onMount()` hook after the user logs in.
* If an error occurs during login, then you might want to display a user-friendly `error` message to your users. In this case you might call `ToastContent.set()` from inside a `catch` block.
