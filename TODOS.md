# TODOS
NOTE: Maybe I could look at how to theme the Carbon components rather than create my own component library. Actually, I don't think I could contribute themable components to that project because that project is based on the Carbon Design System and I want to create components that can be themed to fit other design systems. But maybe I could base my components off of the Carbon components for Svelte, so I could see how they create their components and use some of their ideas.

* High Priority:
    * Convert everything to TypeScript.
    * Write tests for every component and the "Customize Theme" page.

* Low Priority: Look into how to create a dark theme and provide instructions for doing so.


* TODOS for the `get-started.svelte.md` page. 
    * I need to test the Get Started instructions in a new app and import the components into that new app.
    * I need to improve the customization instructions and make them more clear. I might need to show some examples to illustrate these steps more clearly. 
* Convert these components to TypeScript.
* I need to test this: (1) Install this library into a test app. (2) Customize the theme in that app following the instructions from the README. (3) Improve the documentation in the README, if necessary. 
* Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
    * UPDATE: Mimic the docs from Carbon Components Svelte (https://carbon-components-svelte.onrender.com/) and maybe from Semantic UI.
* Create the components and associated tests. See "How to develop new components or edit existing components" in the README.
* Create fallback colors for each CSS variable in the components.
* Figure out how to customize/edit fonts after the component library has been installed.
    * I think I would let users define the fonts they want in their `theme.css` file and they would install those fonts themselves. The components would inherit the fonts that the user had defined.
    * This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work. Maybe I would define fonts style rules in the `utils.css` file. I then need to update all styles that reference either "font-family" or "font-stack".
* Document the media queries and how to use them. The `media-queries.css` file has some examples that I could use in the documentation.

## Customize Theme
* Replace the `<input type="color">` elements with `<ColorPicker>` components after I finish that component. UPDATE: I might not create a custom color picker. I just need users to be able to set their color palettes (without any transparency values) and then I will create transparency values for some of the charts that will use transparent colors (e.g. area charts). If the browser's default color picker is not very easy to use, then I will create a custom color picker.

## Charts

### Area Chart
* Add chart title and x and y-axis titles.
* Add a legend.

## Button Component
* Write more tests.
* Read over the documentation to make sure that I have covered everything.

## Checkbox
* Add usability attributes and features. See the `<SelectMulti>` component for some notes and possible attributes that I could use.
* Create documentation.

## Checkbox Group
* Add usability attributes and features. See the `<SelectMulti>` component for some notes and possible attributes that I could use.

## Date Picker
* Write tests.
    * NOTE: The `input type=date` element does not have any ARIA roles (see https://www.w3.org/TR/html-aria/#docconformance), so there is no reason to try to stick with a native date input element.
* Look at https://fluent-svelte.vercel.app/docs/components/calendarview from some other feature ideas.
* I haven't been able to figure out how to get the `locale` prop to work. I would like to document that in my documentation after I get it figured out.
* Implement the `size` prop in the `Calendar` component and increase or decrease the font sizes based on the `size` prop. The fonts will probably be smaller than 1rem, but I do want to increase or decrease the font-sizes in relation the the `size` prop.

## DropZone
* Add as much accessibility tags as possible.
* Add a file type filter. See https://www.smashingmagazine.com/2022/03/drag-drop-file-uploader-vuejs-3/ under the heading "Possible Improvements" and research how to do this. Do I need to use the `accept` attribute on the file input?

## Input (currency)
* Write tests.
* Work on localization. See the comments at the top of the `CurrencyInput.svelte` component.

## Input (email, text)
* Add documentation for the email input.

## Modal
* Add responsive designs for small and large viewports.
* Look at https://semantic-ui.com/modules/modal.html for some additional features that I should add.
    * Add scrolling content.
* Add more custom style options.

## Select (multi)
* Implement the `size` prop throughout the entire component. I think it is only on the `fp-select-btn` part of the component, but not in the options list part of the component.
* Try to get event forwarding to work for the `change` event. I have everything coded up for this to work, but it won't work. On this page https://svelte.dev/tutorial/multiple-select-bindings I attached an `on:change` listener to the `<select multiple>` element and it worked. However, when I converted the `<select multiple>` element to a reusable component and imported that component into the App.svelte page, the `change` event did not forward (i.e. it didn't trigger anything in the App.svelte page). So maybe the `change` event cannot be forwarded for `<select multiple>` components. If I need to respond to a `change` event, then it might be better to watch for changes in the array that is passed into the `options` prop and respond to those changes somehow. Or I could dispatch an event that carries the `values` array as a payload, similar to what I did with the `<SelectOld>` component.

## Select (single)
* Implement the `disabled` prop.
* Write tests. I will be able to verify if the roles work with the `getByRole()` selector.
* On the "Button" doc page, there are multiple select boxes. If I click on one, it will open up. Then if I click on another without explicitly closing the first, then they will both stay open. So I need to figure out how to close the first select box in that scenario.
* Clean up old code and documentation that no longer applies or that is commented out.
    * There is a TODO in the Select.svelte component that I need to verify. In particular I need to test the part about a user previously selecting an option and saving it to the database.

## Toast
* Should I make the Toast component handle an array of toasts? I will see how this simple version works first.

## Tooltip
* Expose the `tooltipText` prop for every component that includes the `<Label>` component. See the MultiSelect component for an example.
    * Make sure to document the `tooltipText` prop for each component. I should probably figure out a way to change the default `tooltipIcon` in the `<Label>` components.
* Remove the old code that is not related to the Tippy.js version of the tooltip.
* Manually test this component and write automated tests.
