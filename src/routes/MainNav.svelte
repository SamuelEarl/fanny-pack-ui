<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  // import { screenWidth } from "/src/components/utils/index.svelte";

  $: currentPath = $page.url.pathname;

  // const mainNav = mainNavContext;
  const mainNav = [
    {
      sectionHeading: "",
      sectionUrlPrefix: "",
      sectionItems: [
        {
          icon: "carbon:home",
          label: "Overview",
          url: "/",
        },
        {
          icon: "carbon:play",
          label: "Get Started",
          url: "/get-started",
        },
        // {
        //   icon: "material-symbols:style-outline-sharp",
        //   label: "Customize Theme",
        //   url: "/customize-theme",
        // },
        {
          icon: "ic:baseline-update",
          label: "Update To Latest Version",
          url: "/update-to-latest-version",
        },
      ],
    },
    {
      sectionHeading: "Components",
      sectionUrlPrefix: "/docs/components",
      sectionItems: [
        {
          icon: "carbon:account",
          label: "Accordion",
          url: "/accordion",
        },
        {
          icon: "carbon:button-centered",
          label: "Button",
          url: "/button",
        },
        {
          icon: "bx:calculator",
          label: "Calculator",
          url: "/calculator",
        },
        {
          icon: "carbon:checkbox-checked",
          label: "Checkbox (single)",
          url: "/checkbox/single",
        },
        {
          icon: "carbon:list-boxes",
          label: "Checkbox (group)",
          url: "/checkbox/group",
        },
        {
          icon: "carbon:calendar",
          label: "Date Picker",
          url: "/date-picker",
        },
        // See my comment about a color picker component in the TODOS.md file.
        // {
        //   icon: "clarity:color-picker-solid",
        //   label: "Color Picker",
        //   url: "/color-picker",
        // },
        {
          icon: "pixelarticons:drop-area",
          label: "Drop Zone (file upload)",
          url: "/drop-zone",
        },
        // {
        //   icon: "ph:layout-light",
        //   label: "FlexGrid (layout)",
        //   url: "/flex-grid",
        // },
        {
          icon: "ph:layout-light",
          label: "Grid (layout)",
          url: "/grid",
        },
        {
          icon: "carbon:currency-dollar",
          label: "Input (currency)",
          url: "/input/currency",
        },
        {
          icon: "radix-icons:input",
          label: "Input (text, number, email, password)",
          url: "/input/misc",
        },
        {
          icon: "carbon:popup",
          label: "Modal (popup window)",
          url: "/modal",
        },
        {
          icon: "carbon:radio-button-checked",
          label: "Radio Button",
          url: "/radio-button",
        },
        {
          icon: "icon-park-outline:list-view",
          label: "Select (single)",
          url: "/select/single",
        },
        {
          icon: "fluent:multiselect-ltr-20-filled",
          label: "Select (multi)",
          url: "/select/multi",
        },
        {
          icon: "ic:outline-tab",
          label: "Tabs (tabbed content)",
          url: "/tabs",
        },
        {
          icon: "bi:textarea-resize",
          label: "Textarea",
          url: "/textarea",
        },
        {
          icon: "carbon:information-square",
          label: "Toast (notification pane)",
          url: "/toast",
        },
        {
          icon: "carbon:chat",
          label: "Tooltip",
          url: "/tooltip",
        },
      ],
    },
    {
      sectionHeading: "Data Viz",
      sectionUrlPrefix: "/docs/data-viz",
      sectionItems: [
        {
          icon: "tabler:chart-area-line",
          label: "Area Chart",
          url: "/area-chart",
        },
        {
          icon: "bi:bar-chart",
          iconRotate: "90deg",
          label: "Bar Chart (horizontal)",
          url: "/bar-chart/horizontal",
        },
        {
          icon: "bi:bar-chart",
          label: "Bar Chart (vertical)",
          url: "/bar-chart/vertical",
        },
        {
          icon: "carbon:chart-bubble",
          label: "Bubble Chart",
          url: "/bubble-chart",
        },
        {
          icon: "gis:world-map-alt",
          label: "Geospatial Chart",
          url: "/geospatial-chart",
        },
        {
          icon: "fluent:data-histogram-24-regular",
          label: "Histogram",
          url: "/histogram",
        },
        {
          icon: "mdi:chart-line-variant",
          label: "Line Chart",
          url: "/line-chart",
        },
        {
          icon: "carbon:chart-scatter",
          label: "Scatterplot",
          url: "/scatterplot",
        },
      ],
    },
    {
      sectionHeading: "Utility Classes",
      sectionUrlPrefix: "/docs/utility-classes",
      sectionItems: [
        {
          icon: "bx:show",
          label: "Visibility",
          url: "/visibility",
        },
      ],
    },
  ];
</script>

<!-- 
  If I use an {#if} block here, then the mobile-nav will not transition
  into and out of the DOM. So I am using a `display: none` style rule instead. 
-->
<!-- {#if screenWidth < 1024} -->
  <nav class="main-nav" transition:fly>
    <ul class="main-nav-list">
      {#each mainNav as section}
        <li class="section-heading">{section.sectionHeading}
          <ul class="section-items-list">
            {#each section.sectionItems as item}
              <li class="section-item">
                <a href={`${section.sectionUrlPrefix}${item.url}`} class:active={currentPath === `${section.sectionUrlPrefix}${item.url}`}>
                  <Icon icon={item.icon} rotate={item.iconRotate} /> 
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>
<!-- {/if} -->

<style>
  @media (--xs-up) {
    nav {
      border-top: 2px solid var(--neutral-12);

      & ul {
        margin: 0;
        list-style: none;

        & li {
          margin: 0;
        }
      }

      & .main-nav-list {
        /* The height of the mobile nav menu is 100vh minus the height of the header. */
        height: calc(100vh - 64px);
        display: flex;
        flex-direction: column;
        padding: 0;
        padding-top: 5px;
        overflow-y: auto;
        background-color: var(--secondary-color);

        & .section-heading {
          padding-left: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          color: var(--white);

          & .section-items-list {
            padding-left: 0;
            margin-left: -15px;
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 1rem;
            font-weight: normal;

            & .section-item {

              & a {
                display: flex;
                align-items: center;
                padding: 12px;
                padding-left: 30px;
                border-bottom: none;
                color: var(--white);

                & :global(.iconify) {
                  margin-right: 10px;
                }

                &:hover {
                  background-color: var(--primary-color);
                }

                &.active {
                  background-color: var(--primary-color);
                }
              }
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {
    nav {

      & .main-nav-list {
        height: auto;
      }
    }
  }
</style>
