import { render, fireEvent } from "@testing-library/svelte";
import Button from "./Button.svelte";

// For the button component I will probably be testing that the props and event forwarding work properly. I will probably be using the component options object to test the props (https://testing-library.com/docs/svelte-testing-library/api/#component-options).
  // I need to test that styles are being applied correctly when certain props are passed to the component.
// This is how to test slots: https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component/
// I can create component interaction and/or user journey tests for the pages in the `/routes/` folder.

describe("Button.svelte", () => {
  // To see how to test event forwarding, read "Testing component events" on this page: https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component/.
  // If I remove the `on:click` event forwarding code from the Button component, then this test will fail, which means that the event forwarding is working properly.
  test("Event forwarding works for the click event when the button is clicked", async () => {
    // Setup
    const { getByRole, component } = render(Button);
    const mock = jest.fn();

    // Execute
    let button = getByRole("button");
    // You can provide an event handler to a component event via a component's `.$on` method.
    // See https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component/
    await component.$on("click", mock);
    await fireEvent.click(button);

    // Verify
    expect(mock).toHaveBeenCalled();
  });

  test("Default props render correct classes", async () => {
    // Setup
    const { getByRole } = render(Button);

    // Execute
    let button = getByRole("button");

    // Verify
    expect(button).toHaveClass("primary md auto-width");
  });

  /**
   * Trying to test CSS styles with the toHaveStyle matcher doesn't work in many situations.
   * See
   * * https://stackoverflow.com/a/67677245/9453009
   * * https://stackoverflow.com/questions/64638498/how-to-test-styling-using-jest
   */
  test("Passing the prop `disabled={true}` will set the `disabled` attribute", async () => {
    // Setup
    const { getByRole } = render(Button, {
      props: {
        disabled: true,
      }
    });

    // Execute
    let button = getByRole("button");

    // Verify
    expect(button).toBeDisabled();
  });

  // NOTE: This test is broken/does not work.
  // I need to use the Red-Green-Refactor method when implementing this test to make sure that this test actually tests the correct things. 
  // I found out that if I pass an icon name as the `btnIcon` prop, then no SVG image is rendered. But I want to test for the SVG image element specifically to ensure that it is getting inserted into the DOM. So I will have to figure out how to test for that properly.
  test("No button icons are displayed if the `btnIcon` prop is an empty string", async () => {
    // Setup
    const { getByRole } = render(Button, {
      props: {
        btnIcon: ""
      }
    });

    // Execute
    let button = getByRole("button");
    // let svgBtnIcon = getByRole("graphics-document");

    // Verify
    expect(button).not.toContainElement(getByRole("graphics-document"));

    // Execute
    await fireEvent.click(button);

    // Verify
    expect(getByRole("graphics-document")).not.toBeInTheDocument();
  });

  // test("No button icons are displayed if the `btnIconDisabled` prop is an empty string", async () => {
  //   // Setup
  //   const { getByRole } = render(Button, {
  //     props: {
  //       btnIconDisabled: ""
  //     }
  //   });

  //   // Execute
  //   let button = getByRole("button");

  //   // Verify
  // });

  // test("Button icons are updated when an icon string is passed", async () => {
  //   // Setup
  //   const { getByRole } = render(Button, {
  //     props: {
  //       btnIcon: "bi:person-plus-fill",
  //       btnIconDisabled: "bi:gear-wide-connected",
  //     }
  //   });

  //   // Execute
  //   let button = getByRole("button");

  //   // Verify

  // });
});
