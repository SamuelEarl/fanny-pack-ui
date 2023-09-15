// This is technically not a component. It is a Svelte action.

// See this tutorial for more details about how to use this action:
// https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94

// Refer to the Tippy.js documentation for details about how to customize the tooltips:
// https://atomiks.github.io/tippyjs/

/**
 * Example Usage:
 
  import tooltip from "/src/components/ui/tooltip.js";

  <span use:tooltip={{ content: `This is multi-line content.

    The line breaks will be preserved because of the .tippy-content style rules in the _base.scss file.` }}>
    <Icon icon="entypo:info-with-circle" />
  </span>


  <button use:tooltip title="Title text!">With "title"</button>
	
	<button use:tooltip aria-label="Aria label!">With "aria-label"</button>
	
  <button use:tooltip={{ content: "Custom content!" }}>Custom content</button>
	
	<button use:tooltip={{ theme: "light" }} title="This is a light tooltip!">Light theme</button>

	<button use:tooltip={{ theme: "light-border" }} title="This is a light bordered tooltip!">Light border theme</button>
 */


  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  
  export default function tooltip(node, params = {}) {
    const custom = params.content;
    const title = node.title;
    const label = node.getAttribute("aria-label");
    // Determine the content that will be displayed in the tooltip.
    // The following line will treat the custom content (`custom`) as the preferred tooltip text (if it exists), then the HTML title attribute (`title`) will be the second preference, then the aria-label (`label`) will be the third preference, in that order.
    const content = custom || title || label;
  
    // Make sure the "aria-label" attribute is set so our element is accessible:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
    if (!label) node.setAttribute("aria-label", content);
  
    // Clear out the HTML title attribute since we don't want the default behavior of it showing up on hover.
    node.title = "";
  
    // Support any of the Tippy props by forwarding all "params":
    // https://atomiks.github.io/tippyjs/v6/all-props/
    const tip = tippy(node, {
      content,
      ...params,
    });
  
    return {
      // If the props change, then update the Tippy instance:
      update: (newParams) => tip.setProps({ content, ...params }),
  
      // Clean up the Tippy instance on unmount:
      destroy: () => tip.destroy(),
    };
  };
  