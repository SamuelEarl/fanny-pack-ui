<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { Toast } from "/src/components";
  import MobileHeader from "./MobileHeader.svelte";
  import Sidebar from "./Sidebar.svelte";
  import "/src/assets/styles/main.css";

  /**
   * Reset the page scroll position to the top on navigation.
   * The following GitHub issue explains that using `height:100vh` along with `overflow:auto` creates a scenario in the CSS that prevents the page from setting the page scroll position to the top when a user navigates to a new page: https://github.com/sveltejs/kit/issues/2733
   * One of the comments in that issue mentioned using the `afterNavigate` (https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate) hook to reset the scroll position. Since the layout that I am using requires the scroll position in the <main> element to be reset, then I am referencing the <main> element in the `afterNavigate` hook and setting its scroll position to 0.
   */
  afterNavigate(({to}) => {
    const main = document.getElementById("main");
    // If the user clicks a bookmark link, then the `to` object will include a hash. But if a user clicks a regular page link, then there won't be a hash. So if a user navigates to a new page by clicking on a page link (not a bookmark link), then make sure the page is scrolled to the top.
    if (main && !to.url.hash) {
      main.scrollTop = 0;
    }
  });
</script>


<svelte:head>
	<title>Fanny Pack UI Components | Components built with and for SvelteKit</title>
</svelte:head>

<Toast duration={7000} />

<div class="layout">
  <div class="mobile-header-wrapper">
    <MobileHeader />
  </div>
  <div class="sidebar-wrapper">
    <Sidebar />
  </div>
  <main id="main">
    <slot />
  </main>
</div>


<style>
  @media (--xs-up) {
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      & .sidebar-wrapper {
        display: none;
      }

      & main {
        flex: 1;
        height: 100vh;
        padding: 15px;
        padding-top: 80px;
        overflow-y: auto;
      }
    }
  }

  @media (--lg-up) {
    .layout {
      flex-direction: row;

      & .mobile-header-wrapper {
        display: none; 
      }

      & .sidebar-wrapper {
        display: block;
        width: 20%;
        height: 100vh;
        overflow-y: auto;
      }

      & main {
        padding-top: 20px;
      }
    }
  }
</style>
