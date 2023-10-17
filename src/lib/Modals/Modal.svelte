<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { Button } from "../Buttons";

  export let title = "";
  export let scrollingBody = true;
  export let disabled = false;
  export let showCloseButton = true;
  export let contentBgColor = "var(--white)";
  export let headerPadding = "10px";
  export let footerPadding = "10px";
  export let headerFooterBorderColor = "var(--neutral-3)";

  const dispatch = createEventDispatcher();

  onMount(() => {
    // If scrollingBody = true, then set a static height for the #modal-body and set its overflow property to "auto" so a scrollbar will appear.
    if (scrollingBody) {
      // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      // Get the #modal-content-container and its height.
      let modalContentContainer = document.getElementById("modal-content-container");
      let modalContentContainerHeight = modalContentContainer.getBoundingClientRect().height;
      // Get the #modal-body and its height.
      let modalBody = document.getElementById("modal-body");
      let modalBodyHeight = modalBody.getBoundingClientRect().height;
      // Calculate the height of everything in the #modal-content-container except for the #modal-body.
      let modalTopAndBottomHeights = modalContentContainerHeight - modalBodyHeight;
      // Set the #modal-body height to equal the remaining window space after the modalTopAndBottomHeights have been removed from the remaining window space calculation.
      modalBody.style.height = (windowHeight - modalTopAndBottomHeights) + "px";
      // Now that a static height has been set for the #modal-body, set its overflow property to "auto" so a scrollbar will appear.
      modalBody.style.overflow = "auto";
    }
  });

  let bodyBorderRadius = "";
  // If there is no title, which means there will be no header, then set the top of the body to be rounded.
  if (!title) {
    bodyBorderRadius = "border-radius: var(--border-radius) var(--border-radius) 0 0;";
  }

  // If there is no footer, then set the bottom of the body to be rounded.
  if (!$$slots.modalFooterRight && !$$slots.modalFooterRight) {
    bodyBorderRadius = "border-radius: 0 0 var(--border-radius) var(--border-radius);";
  }

  // If there is no header and no footer, then set all corners of the body to be rounded.
  if (!title && !$$slots.modalFooterRight && !$$slots.modalFooterRight) {
    bodyBorderRadius = "border-radius: var(--border-radius);";
  }
</script>

{#if showCloseButton}
  <div id="close-btn-container">
    <Button
      id="close"
      btnIcon="ic:baseline-close"
      bgColor="transparent"
      borderColor="transparent"
      textColor="white"
      padding="7px"
      fontSize="xl"
      {disabled}
      on:click={() => dispatch("closeModal")}
    ></Button>
  </div>
{/if}

<div id="fp-modal">
  <div id="modal-content-container" class="fp-animatetop">
    <div id="modal-content" style={`background-color: ${contentBgColor};`}>
      {#if title}
        <header
          id="modal-header" 
          style={`padding: ${headerPadding}; border-color: ${headerFooterBorderColor};`}
        >
          {title}
        </header>      
      {/if}
      <!-- If the header and footer are excluded, then set a rounded border-radius on the `modal-body`. -->
      <div id="modal-body" style={`${bodyBorderRadius}`}>
        <slot name="modalBody"></slot>
      </div>
      {#if $$slots.modalFooterLeft || $$slots.modalFooterRight}
        <footer
          id="modal-footer" 
          style={`padding: ${footerPadding}; border-color: ${headerFooterBorderColor};`}
        >
          <div id="modal-footer-left">
            <slot name="modalFooterLeft"></slot>
          </div>
          <div id="modal-footer-right">
            <slot name="modalFooterRight"></slot>
          </div>
        </footer>
      {/if}
    </div>
  </div>
</div>


<style>
  @media (--xs-up) {
    /* Prevent page scrolling when a modal is open:
       https://www.reddit.com/r/css/comments/137kr90/is_there_a_way_to_prevent_scrollthrough_when/ */
    :global(body:has(#fp-modal)) {
      overflow: hidden;
    }

    #close-btn-container {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 1000;
      border-radius: var(--border-radius);
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* The Modal (background) */
    #fp-modal {
      position: fixed; /* Stay in place */
      z-index: 100; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      display: flex; /* This will center the #modal-content-container vertically */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

      & #modal-content-container {
        position: relative;
        width: 100%;
        padding: 3px;
        margin: auto;

        & #modal-header {
          border-bottom: var(--border-default);
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          font-size: var(--font-size-xl);
          font-weight: bold;
        }

        & #modal-content {
          width: 100%;
          /* The `border-radius` style will prevent any `modal-content` background styles from spilling outside of the `modal-body`. */
          border-radius: var(--border-radius);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

          & #modal-footer {
            display: flex;
            flex-direction: column;
            gap: 7px;
            border-top: var(--border-default);
            border-radius: 0 0 var(--border-radius) var(--border-radius);

            & #modal-footer-left, & #modal-footer-right {

              /* The following :global(div) and :global(button) are for elements that are inserted into the `modalFooterLeft` and `modalFooterRight` slots */
              & :global(div) {
                display: flex;
                flex-direction: column;
                gap: 7px;
              }
            }
          }
        }
      }
    }
  }

  /* @media lg */
  @media (--lg-up) {
    #fp-modal {

      & #modal-content-container {
        width: 950px;

        & #modal-content {

          & #modal-footer {
            flex-direction: row;
            justify-content: space-beteen;

            & #modal-footer-left, & #modal-footer-right {

              /* The following :global(div) and :global(button) are for elements that are inserted into the `modalFooterLeft` and `modalFooterRight` slots */
              & :global(div) {
                flex-direction: row;
              }
            }

            & #modal-footer-left {
              /* Push the #modal-footer-right content to the right. */
              flex: auto;

              & :global(div) {
                justify-content: flex-start;
              }
            }

            & #modal-footer-right {

              & :global(div) {
                justify-content: flex-end;
              }
            }
          }
        }
      }
    }
  }
</style>
