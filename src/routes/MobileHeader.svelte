<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import Icon from "@iconify/svelte";
  import { Button } from "/src/lib";
  import MainNav from "./MainNav.svelte";

  let showMainNav = false;

  // On mobile clear the MainNav after a user navigates so it
  // is not still displaying after a user has clicked a link.
  afterNavigate(async (params) => {
    showMainNav = false;
  });
</script>

<div class="mobile-header-nav-wrapper">
  <header>
    <div class="mobile-main-nav-btn-wrapper">
      {#if showMainNav}
        <Button
          btnIcon=""
          padding="0px"
          bgColor="transparent"
          borderColor="transparent"
          on:click={() => showMainNav = false}
        >
          <Icon icon="mdi:close" width=40 color="var(--white)" />
        </Button>
      {:else}
        <Button
          btnIcon=""
          padding="0px"
          bgColor="transparent"
          borderColor="transparent"
          on:click={() => showMainNav = true}
        >
          <Icon icon="mdi:menu" width=40 color="var(--white)" />
        </Button>
      {/if}
    </div>
    <!-- <div class="logo-wrapper">
      <a href="/"><img src={Logo} class="logo" alt="logo" /></a>
    </div> -->
    <div class="title-wrapper">
      <a href="/">Fanny Pack UI</a>
    </div>
    <!-- I might use this <div class="spacer"> element until I am ready to include the login button for the app. -->
    <!-- TODO: At that point I will delete this <div class="spacer"> element. -->
    <div class="spacer">
      <Icon icon="mdi:menu" width=40 color="transparent" />
    </div>
  </header>

  {#if showMainNav}
    <div class="main-nav-wrapper">
      <MainNav />
    </div>
  {/if}
</div>

<style>
  @media (--xs-up) {
    .mobile-header-nav-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;

      & header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: var(--secondary-color);
        box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.5);

        & .title-wrapper a {
          font-family: var(--cursive);
          font-size: 1.5rem;
          line-height: 1.5;
          border-bottom: none;
          color: var(--white);
        }
      }
    }
  }
</style>
