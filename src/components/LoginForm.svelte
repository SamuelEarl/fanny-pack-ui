<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Input } from "/src/lib";

  let dispatch = createEventDispatcher();
  let email = "";
  let userIsLoggingIn = false;

  async function login() {
    try {
      dispatch("login", true);
      userIsLoggingIn = true;

      // Login logic would go here instead of a setTimeout function.
      setTimeout(() => {
        // Reset the login back to false so the modal won't be disabled when it is opened again.
        dispatch("login", false);
        // Dispatch the "authenticated" event to hide the modal.
        dispatch("authenticated");
        // Reset the userIsLogginIn variable. This isn't technically necessary because the input field and login button get destroyed, so their states are reset when the modal is shown again.
        userIsLoggingIn = false;
      }, 3000);
    }
    catch (err) {
      console.error("Login Error:", err);
    }
  }
</script>


<div id="login-form">
  <div id="left">
    <div id="logo-container">
      <div>Fanny</div>
      <div>Pack</div>
      <div>UI</div>
    </div>
  </div>

  <div id="right">
    <div id="top">
      <h1 id="welcome">Welcome to</h1>
      <h1 id="title">Fanny Pack UI</h1>
    </div>
    <div id="bottom">
      <p>This login form won't actually log you into anything</p>
      <p>It's just for demonstration purposes</p>
      <br>
      <form on:submit|preventDefault={login}>
        <div>
          <Input
            type="email"
            bind:value={email}
            size="lg"
            placeholder="Enter your email"
            disabled={userIsLoggingIn}
          />
        </div>
        <br>
        <Button type="submit" btnIcon="ri:login-circle-line" width="full" size="lg" disabled={userIsLoggingIn}>Login</Button>
      </form>
    </div>
  </div>
</div>


<style>
  #login-form {
    display: flex;
    height: 500px;

    & #left, & #right {
      display: flex;
      padding: 40px;
    }

    & #left {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      border-radius: 20px 0 0 20px;
      background-color: var(--dark-purple);
      font-family: var(--cursive);
      font-size: 3rem;
      line-height: 1.5;
      color: var(--white);

      & #logo-container {
        text-align: center;
      }
    }

    & #right {
      flex: 3;
      height: 100%;
      flex-direction: column;
      border-radius: 0 20px 20px 0;
      background-color: var(--white);

      & #top {
        flex: 1;
        display: flex;
        flex-direction: column;

        & h1 {
          font-weight: 100;
          text-align: center;

          &#welcome {
            margin: 0;
            font-size: 1.5rem;
          }

          &#title {
            margin-top: 0;
            font-size: 2.5rem;
          }
        }
      }
      & #bottom {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
