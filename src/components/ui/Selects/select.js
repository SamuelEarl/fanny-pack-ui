// This is the original JavaScript code from this tutorial: https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/.
// I ported it over to Svelte for my new Select.svelte component.

/* Features to make the selectCustom work for mouse users.

- Toggle custom select visibility when clicking the "box"
- Update custom select value when clicking in a option
- Navigate through options when using keyboard up/down
- Pressing Enter or Space selects the current hovered option
- Close the select when clicking outside of it
- Sync both selects values when selecting a option. (native or custom)

*/

const elSelectNative = document.getElementsByClassName("js-selectNative")[0];
const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
const elSelectCustomBox = elSelectCustom.children[0];
const elSelectCustomOpts = elSelectCustom.children[1];
const customOptsList = Array.from(elSelectCustomOpts.children);
const optionsCount = customOptsList.length;
const defaultLabel = elSelectCustomBox.getAttribute("data-value");

// optionChecked will equal the `value` property of the currently selected option.
let optionChecked = "";
let optionHoveredIndex = -1;

// Toggle custom select visibility when clicking the box
elSelectCustomBox.addEventListener("click", (e) => {
  const isClosed = !elSelectCustom.classList.contains("isActive");

  if (isClosed) {
    openSelectCustom();
  } else {
    closeSelectCustom();
  }
});

function openSelectCustom() {
  // Add the "isActive" class to elSelectCustom element. 
  // This will give the elSelectCustom element a raised looked to appear active when the select box is open.
  elSelectCustom.classList.add("isActive");
  // Remove aria-hidden in case this was opened by a user
  // who uses AT (e.g. Screen Reader) and a mouse at the same time.
  elSelectCustom.setAttribute("aria-hidden", false);

  // If an option has been selected...
  if (optionChecked) {
    // ...get the index of the option that has been selected...
    const optionCheckedIndex = customOptsList.findIndex(
      (el) => el.getAttribute("data-value") === optionChecked
    );
    // ...and update the "hovered" appearance of the selected option.
    updateCustomSelectHovered(optionCheckedIndex);
  }

  // Add related event listeners
  document.addEventListener("click", watchClickOutside);
  document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeSelectCustom() {
  elSelectCustom.classList.remove("isActive");

  elSelectCustom.setAttribute("aria-hidden", true);

  updateCustomSelectHovered(-1);

  // Remove related event listeners
  document.removeEventListener("click", watchClickOutside);
  document.removeEventListener("keydown", supportKeyboardNavigation);
}

// This function will give the currently selected option the same appearance as the hovered options.
function updateCustomSelectHovered(newIndex) {
  // Set prevOption to the previously selected option.
  const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
  // Set option to the currently selected option.
  const option = elSelectCustomOpts.children[newIndex];

  // If there was a previously selected option, the remove the "isHover" class.
  if (prevOption) {
    prevOption.classList.remove("isHover");
  }
  // If there is a currently selected option, then add the "isHover" class.
  // This will give the currently selected option the same appearance as the hovered options.
  if (option) {
    option.classList.add("isHover");
  }

  // Set the selected option to equal the newly selected option.
  optionHoveredIndex = newIndex;
}

function updateCustomSelectChecked(value, text) {
  // Set the previous value.
  const prevValue = optionChecked;

  // Set the option that was previously selected.
  const elPrevOption = elSelectCustomOpts.querySelector(
    `[data-value="${prevValue}"`
  );

  // Set the currently selected option.
  const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

  // If there was a previously selected option, then remove the "isActive" class from the previous option.
  if (elPrevOption) {
    elPrevOption.classList.remove("isActive");
  }

  // Add the "isActive" class to the currently selected option.
  if (elOption) {
    elOption.classList.add("isActive");
  }

  // Set the textContent of the custombox to be the text of the currently selected option.
  elSelectCustomBox.textContent = text;
  // Set optionChecked to the value of the currently selected option.
  optionChecked = value;
}

function watchClickOutside(e) {
  const didClickedOutside = !elSelectCustom.contains(e.target);
  if (didClickedOutside) {
    closeSelectCustom();
  }
}

function supportKeyboardNavigation(e) {
  // press down -> go next
  if (e.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    e.preventDefault(); // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex + 1);
  }

  // press up -> go previous
  if (e.keyCode === 38 && optionHoveredIndex > 0) {
    e.preventDefault(); // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex - 1);
  }

  // press Enter or space -> select the option
  if (e.keyCode === 13 || e.keyCode === 32) {
    e.preventDefault();

    const option = elSelectCustomOpts.children[optionHoveredIndex];
    const value = option && option.getAttribute("data-value");

    if (value) {
      elSelectNative.value = value;
      updateCustomSelectChecked(value, option.textContent);
    }
    closeSelectCustom();
  }

  // press ESC -> close selectCustom
  if (e.keyCode === 27) {
    closeSelectCustom();
  }
}

// Update selectCustom value when selectNative is changed.
elSelectNative.addEventListener("change", (e) => {
  const value = e.target.value;
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
    `[data-value="${value}"]`
  )[0];

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

// Update selectCustom value when an option is clicked or hovered
customOptsList.forEach(function (elOption, index) {
  elOption.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    // Sync native select to have the same value
    elSelectNative.value = value;
    updateCustomSelectChecked(value, e.target.textContent);
    closeSelectCustom();
  });

  elOption.addEventListener("mouseenter", (e) => {
    updateCustomSelectHovered(index);
  });

  // TODO: Toggle these event listeners based on selectCustom visibility
});
