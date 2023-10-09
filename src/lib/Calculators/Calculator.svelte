<!-- 
  TODOS:
    * Make this mobile friendly in a similar way that I did with the calendar in the <DatePicker> component. UPDATE: This might already be working. The calculator is small enough to fit comfortably on a mobile screen. The developer would simply have to place the calculator where they want it in relation to an input field or a button or some other element/component.
    * This component uses the `<svelte:body on:keydown={handleKeypress} />` component to handle key presses. This prevents a user from using the keyboard for other parts on the screen (e.g. entering data into input fields, using shortcut keys like Ctrl+F). So I want to change this component to use a similar mechanism as the <Calendar> component for handling key presses when the calendar receives focus.
 -->

<!--
  I started with the calculator component from the following codesandbox and 
  then modified it quite a bit to get it to work like a regular calculator:
  * https://codesandbox.io/s/svelte-calculator-9icog
-->

<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { evaluate } from "mathjs";

  export let closeBtn = true;
  export let insertBtn = true;
	export let insertBtnText = "Insert";
	export let decimalPlaces = 2;

	const dispatch = createEventDispatcher();
	let activeCalculator;
	let calculationArr: string[] = [];
	// When the `calculationResult` is a number, then the type will also be a number.
	// But when the `calculationResult` is a mathematical symbol or an error, then the type will be a string.
	let calculationResult: number | string = 0;
	let disableInsertValueBtn = true;
  let dialogMessage = "Number pad can enter calculations";

	let buttons = [
		{ value: "Clear", id: "clear", keyboardInput: "Keyboard Input:\nBackspace or Delete" },
		{ value: "Clear All", id: "clear-all", keyboardInput: "Keyboard Input:\na or A" },
		{ value: "+/-", id: "negative", keyboardInput: "Keyboard Input:\nn or N" },
		{ value: "(", id: "left-paren", keyboardInput: "" },
		{ value: ")", id: "right-paren", keyboardInput: "" },
		{ value: "÷", id: "divide", keyboardInput: "Keyboard Input:\n/" },
		{ value: "×", id: "multiply", keyboardInput: "Keyboard Input:\n*" },
		{ value: "-", id: "minus", keyboardInput: "" },
		{ value: "+", id: "add", keyboardInput: "" },
		{ value: "=", id: "equal", keyboardInput: "Keyboard Input:\nEnter or =" },
		{ value: "1", id: "one", keyboardInput: "" },
		{ value: "2", id: "two", keyboardInput: "" },
		{ value: "3", id: "three", keyboardInput: "" },
		{ value: "4", id: "four", keyboardInput: "" },
		{ value: "5", id: "five", keyboardInput: "" },
		{ value: "6", id: "six", keyboardInput: "" },
		{ value: "7", id: "seven", keyboardInput: "" },
		{ value: "8", id: "eight", keyboardInput: "" },
		{ value: "9", id: "nine", keyboardInput: "" },
		{ value: "0", id: "zero", keyboardInput: "" },
		{ value: ".", id: "decimal", keyboardInput: "" },
	];

	// These are all the possible keys that a user could use to enter data through their keyboard.
	let possibleKeys = [
		"Enter",
		"Escape",
		"Backspace",
		"Delete",
		"a",
		"A",
		"n",
		"N",
		"(",
		")",
		"/",
		"*",
		"-",
		"+",
		"=",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
		".",
	];

	// NOTE: I do not want to hide the calculator when a user clicks outside of it because users might accidentally click outside of the calculator by accident (especially on mobile devices), which would clear their calculations. I don't want their calculations to get cleared before they are able to insert the total into the input field.
	onMount(() => {
		// When this component mounts, give it focus so the keypress events will work according to how they are configured for the calculator. For example, if the calculator does not receive focus, then the "Enter" key will toggle the calculator open and closed.
		// Also, when the activeCalculator receives focus, if there is not enough space for the calculator, then the focus event will cause the the screen to scroll up to show the entire calculator.
		activeCalculator.focus();
	});

	function dispatchCalculationResult() {
		dispatch("setCalculationResult", calculationResult);
	}

	function handleKeypress(event) {
		// Prevent keys like the spacebar from doing strange things in the browser.
		// For example, when a user presses the spacebar it causes the browser to scroll down as if
		// the user pressed the "Page Down" key.
		event.preventDefault();

		let key = event.key;
		// If the user presses a key that is not in the `possibleKeys` array, then return.
		if (!possibleKeys.includes(key)) return;

		if (key === "Enter") {
			// An initial `Enter` key press acts like the `=` button in the calculator: It will calculate the entries in the calculator and it will enable the Insert button, if the Insert button is present in the calculator.
			if (disableInsertValueBtn) {
				key = "=";
			}
			// If the Insert button is present in the calculator: If the user presses the `Enter` key again while the Insert button is enabled, then it will be the same as the user clicking the Insert button in the calculator.
			else {
				dispatchCalculationResult();
				return;
			}
		}
		if (key === "Escape") {
			dispatch("hideCalculator");
		}
		if (key === "Backspace" || key === "Delete") {
			key = "Clear";
		}
		if (key === "a" || key === "A") {
			key = "Clear All";
		}
		if (key === "/") {
			key = "÷";
		}
		if (key === "*") {
			key = "×";
		}
		if (key === "n" || key === "N") {
			key = "+/-";
		}
		handleBtnClick(key);
	}

	function handleCalculate() {
		try {
			let calcArr = [...calculationArr];
			for (let i = 0; i < calculationArr.length; i++) {
				// Convert the divide and multiply icons to their JavaScript mathematical symbols.
				if (calcArr[i] === "÷") {
					calcArr[i] = "/";
				}
				if (calcArr[i] === "×") {
					calcArr[i] = "*";
				}
			}
			// The result of running the calculation with the `evaluate()` function is set to 2 decimal places with
			// `toFixed(2)` to prevent precision loss (see https://javascript.info/number#imprecise-calculations).
			// `toFixed()` returns a string, so that string is then converted to a number type using the unary plus.
			// If the result remained a string, then it would cause an error in the parent transaction's amount field
			// (that field would be $0.00) because numbers cannot be added to strings and return an accurate result.
			calculationResult = +evaluate(calcArr.join("")).toFixed(decimalPlaces);
			// After the user clicks the "=" sign and the calculation is run,
			// the Insert button should be enabled so the user can click it.
			disableInsertValueBtn = false;
		} 
    catch (err) {
			console.error("handleCalculate:", err);
			calculationResult = "Syntax Error";
			// If there is an error, then disable the Insert button.
			disableInsertValueBtn = true;
		}
	}

	function formatCalculationArr() {
		let formattedArray = [];
		// Loop over each element in the `calculationArr`.
		for (let i = 0; i < calculationArr.length; i++) {
			// There is no need to format the first character, so push it into the calculationArr as is.
			if (i === 0) {
				formattedArray.push(calculationArr[i]);
			} else {
				// If the previous element and the current element are both numbers, then combine them into one number in the same element.
				if (!isNaN(calculationArr[i - 1]) && !isNaN(calculationArr[i])) {
					// Create a new number that combines the previous number with the current number.
					let newNumber = formattedArray[formattedArray.length - 1] + calculationArr[i];
					// Format the number. NOTE: Using `toLocaleString` causes errors and calculators don't insert commas. So I won't worry about using this.
					// let formattedNumber = Number(newNumber).toLocaleString("en-US", { maximumSignificantDigits: 12 });
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = newNumber;
				}
				// If the current element is "." and the previous element is a number, then combine them.
				else if (calculationArr[i] === "." && !isNaN(calculationArr[i - 1])) {
					// Create a new number that combines the previous number with a decimal.
					let numWithDecimal = formattedArray[formattedArray.length - 1] + ".";
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = numWithDecimal;
				}
				// If the current element is a number and the previous element ends with a ".", then combine them.
				else if (!isNaN(calculationArr[i]) && calculationArr[i - 1].endsWith(".")) {
					// Create a new number that combines the previous number, which ends with a decimal point, with the current number.
					let decimalNumber = formattedArray[formattedArray.length - 1] + calculationArr[i];
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = decimalNumber;
				}
				// Else, push the element to the `calculationArr` without formatting it.
				else {
					formattedArray.push(calculationArr[i]);
				}
			}
		}
		return formattedArray;
	}

	// The following TODOs might be complete, at least for now until I find more bugs, but I want to check these again.
	// TODO: There are a lot of "if" statements that check for various scenarios. I think everything works, but it is really messy and I need to clean these checks up and combine "if" statements where possible.
	// TODO: I want to make sure that I include `return` statements when necessary in the `if` blocks so that each `if` block is isolated and independent of the others as much as possible. That will cause the code to be less DRY, but it will be clearer and much more explicit about how the code works.
	/**
	 * This function uses `if` blocks for each key/entry to make it explicit which entries are legal and which are not.
	 * The `if` blocks are not very DRY, but that is intentional to make the legal actions explicit.
	 */
	function handleBtnClick(btnVal) {
		// Calculate the total when a user clicks the "=" button.
		if (btnVal === "=") {
			// If there is a least one entry in the calculator, then allow the handleCalculate() function to execute.
			if (calculationArr.length > 0) {
				handleCalculate();
			}
			return;
		}

		// If the user clicks any button other than the "=",
		// then reset disableInsertValueBtn to its default value.
		disableInsertValueBtn = true;

		let lastElementInCalcArr = calculationArr[calculationArr.length - 1];

		if (btnVal === "Clear") {
			// If there are no more elements in calculationArr, then return early.
			if (calculationArr.length === 0) return;
			// Remove the last entry in the calculator.
			// If the last element in the array is multiple characters long...
			if (lastElementInCalcArr.length > 1) {
				// If the last element in the array is 2 characters long and the
				// first character is a negative sign, then remove both characters.
				if (lastElementInCalcArr.length === 2 && lastElementInCalcArr[0] === "-") {
					calculationArr.pop();
				}
				// Else remove the last character only.
				else {
					let lastValueUpdated = lastElementInCalcArr.slice(0, -1);
					calculationArr[calculationArr.length - 1] = lastValueUpdated;
				}
			}
			// If the last element in the array is only one character long, then remove the last element.
			else {
				calculationArr.pop();
			}
			// Reset calculationArr in the UI.
			calculationArr = calculationArr;
			// If there are no more elements in calculationArr, then reset its value to 0.
			if (calculationArr.length === 0) {
				calculationResult = 0;
			}
			// Else set calculationResult to the last value (not the last element) in calculationArr.
			else {
				let lastElement = calculationArr[calculationArr.length - 1];
				// The calculationResult type will be a string in this case.
				calculationResult = lastElement[lastElement.length - 1];
			}
			return;
		}

		if (btnVal === "Clear All") {
			// Clear all the entries in the calculator.
			calculationArr.length = 0;
			calculationResult = 0;
			return;
		}

		// What buttons are allowed to be entered as the first value in the calculator.
		if (calculationArr.length === 0) {
			// If the user clicks the "+/-" button, then return.
			if (btnVal === "+/-") return;

			// If the user clicks the ".", then add a "0." at the beginning of the array.
			if (btnVal === ".") {
				calculationArr.push("0.");
				calculationResult = "0.";
				calculationArr = calculationArr;
				return;
			}

			// Do not allow any leading zeros.
			if (btnVal === "0") return;

			// Do not allow users to enter a mathematical operation as the first entry.
			if (btnVal === "÷" || btnVal === "×" || btnVal === "+" || btnVal === "-") return;

			// Allow users to click the left-paren button as the first entry.
			if (btnVal === "(") {
				calculationArr.push(btnVal);
				calculationResult = btnVal;
				calculationArr = calculationArr;
				return;
			}
		}

		// How to handle "+/-".
		if (btnVal === "+/-") {
			// Do not allow users to enter "+/-" after a mathematical operation.
			if (
				lastElementInCalcArr === "÷" ||
				lastElementInCalcArr === "×" ||
				lastElementInCalcArr === "+" ||
				lastElementInCalcArr === "-"
			)
				return;
			// Remove the negative sign.
			if (lastElementInCalcArr.startsWith("-")) {
				lastElementInCalcArr = lastElementInCalcArr.substring(1);
				let lastValueInElement = lastElementInCalcArr[lastElementInCalcArr.length - 1];
				// Reset calculationResult to the last value (not the last element) in calculationArr.
				calculationResult = lastValueInElement;
			}
			// Add the negative sign.
			else {
				lastElementInCalcArr = "-" + lastElementInCalcArr;
				calculationResult = "-";
			}
			calculationArr[calculationArr.length - 1] = lastElementInCalcArr;
			return;
		}

		// How to handle "(" (left-paren) entries.
		if (btnVal === "(") {
			// If the previous element is a number and the user clicks the "(", then do not allow the user to enter the "(".
			if (!isNaN(lastElementInCalcArr)) {
				return;
			}

			// Allow users to add multiple left-parens to calculationArr.
			if (lastElementInCalcArr === "(") {
				calculationArr.push(btnVal);
				calculationResult = btnVal;
			}

			// Allow users to click the left-paren after a mathematical operator button.
			if (
				lastElementInCalcArr === "÷" ||
				lastElementInCalcArr === "×" ||
				lastElementInCalcArr === "+" ||
				lastElementInCalcArr === "-"
			) {
				calculationArr.push(btnVal);
				calculationResult = btnVal;
			}
		}

		// How to handle ")" (right-paren) entries.
		if (btnVal === ")") {
			// Do not allow users to enter a ")" after a non-numerical value.
			if (isNaN(lastElementInCalcArr)) return;

			// If there aren't matching "(" elements, then do not let the user enter a ")".
			let numberOfLeftParens = 0;
			let numberOfRightParens = 0;

			for (const element of calculationArr) {
				// Total the number of "(" elements.
				if (element === "(") {
					numberOfLeftParens += 1;
				}
				// Total the number of ")" elements.
				if (element === ")") {
					numberOfRightParens += 1;
				}
			}
			// If there are more left parens than right parens, then allow the user to add the ")".
			if (numberOfLeftParens > numberOfRightParens) {
				calculationArr.push(btnVal);
				calculationResult = btnVal;
				calculationArr = calculationArr;
				return;
			} else {
				return;
			}
		}

		// How to handle "." button entries (decimals).
		if (btnVal === ".") {
			// Prevent multiple decimals being added to one number.
			if (lastElementInCalcArr.includes(".")) return;
			// Push "." to calculationArr.
			calculationArr.push(btnVal);
			calculationResult = btnVal;
		}

		// How to handle mathematical operator button entries.
		if (btnVal === "÷" || btnVal === "×" || btnVal === "+" || btnVal === "-") {
			// Do not allow users to enter a mathematical operator after a left-paren.
			if (lastElementInCalcArr === "(") return;
			// Do not allow users to enter a mathetical operator after another mathematical operator.
			if (
				lastElementInCalcArr === "÷" ||
				lastElementInCalcArr === "×" ||
				lastElementInCalcArr === "+" ||
				lastElementInCalcArr === "-"
			)
				return;
			// Otherwise, push the mathematical operator to the calculationArr.
			calculationArr.push(btnVal);
			calculationResult = btnVal;
		}

		// How to handle number entries.
		if (!isNaN(btnVal)) {
			// Set the `calculationResult` to the last button value that was entered.
			calculationResult = btnVal;
			// Push the `btnVal` to `calculationArr`.
			calculationArr.push(btnVal);
		}

		calculationArr = formatCalculationArr();
		// console.log("calculationArr:", calculationArr);
	}
</script>

<div 
  class="calculator"  
  role="dialog"
  aria-modal="true" 
  aria-label="Calculator"
  tabindex="-1"
  bind:this={activeCalculator} 
  on:keydown={handleKeypress}
>
	<div class="display">
		<div class="top-container">
			<div class="top">{calculationArr.join(" ")}</div>
		</div>
		<div class="bottom-container">
			<div class="bottom">{calculationResult}</div>
		</div>
	</div>
  <div class="calculation-btns-container">
    {#each buttons as button}
      <button
        id={button.id}
        aria-label={button.id}
        on:click={() => handleBtnClick(button.value)}
        title={button.keyboardInput}
      >
        {button.value}
      </button>
    {/each}
  </div>
  {#if closeBtn || insertBtn}
    <div class="close-insert-group">
      {#if closeBtn}
        <button
          id="close"
          value="close"
          on:click={() => dispatch("hideCalculator")}
        >
          Close
        </button>
      {/if}
      {#if insertBtn}
        <button
          id="insert"
          aria-label={insertBtnText}
          disabled={disableInsertValueBtn}
          on:click={() => dispatchCalculationResult()}
          title={`Keyboard Input:\nEnter (when button is enabled)`}
        >
          {insertBtnText}
        </button>
      {/if}
    </div>
  {/if}
  <div class="dialog-message" aria-live="polite">{ dialogMessage }</div>
</div>

<!-- TODO: I need to create `--calc-*` CSS variables in the `theme.css` file that allow users to override only the calculator styles and that reference the general CSS theme variables. -->
<style>
	.calculator {
		width: 250px;
		border: 3px solid var(--secondary-color);
		border-radius: var(--border-radius);
		background-color: var(--white);
		color: var(--text-color-default);
		cursor: pointer;
		user-select: none;
		outline: none;

    &:hover {
      outline: 2px solid var(--secondary-color);
    }

    & .display {
      grid-column: 1 / span 4;
      height: 60px;
      padding: 0 5px;
      margin: 7px;
      border: var(--border-default);
      border-radius: var(--border-radius);
      background-color: var(--neutral-2);
      cursor: initial;

      & > div {
        text-align: right;
        box-sizing: border-box;
        height: 50%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
      }

      & .top {
        float: right;
        font-size: 0.9em;
        line-height: 200%;
      }

      & .bottom-container {
        padding-top: 5px;

        & .bottom {
          font-size: 1.2em;
          line-height: 100%;
        }
      }
    }

    & button {
      height: 34px;
      padding: 5px;
      outline: none;
      border: var(--border-default);
      border-radius: var(--border-radius);
      background-color: var(--neutral-2);
      font-weight: 700;
      font-size: 1em;
      cursor: pointer;

      &:disabled {
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        cursor: default;
      }
    }

    & .calculation-btns-container {
      display: grid;
      grid-template-columns: 24% 24% 24% 24%;
      grid-gap: 3px;
      margin: 7px;

      & #clear {
        grid-row: 1 / 2;
        grid-column: 1 / 3;
        margin-bottom: 5px;
      }
      & #clear-all {
        grid-row: 1 / 2;
        grid-column: 3 / 5;
        margin-bottom: 5px;
      }

      & #negative {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
      }
      & #left-paren {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
      }
      & #right-paren {
        grid-row: 2 / 3;
        grid-column: 3 / 4;
      }
      & #divide {
        grid-row: 2 / 3;
        grid-column: 4 / 5;
      }

      & #seven {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
      }
      & #eight {
        grid-row: 3 / 4;
        grid-column: 2 / 3;
      }
      & #nine {
        grid-row: 3 / 4;
        grid-column: 3 / 4;
      }
      & #multiply {
        grid-row: 3 / 4;
        grid-column: 4 / 5;
      }

      & #four {
        grid-row: 4 / 5;
        grid-column: 1 / 2;
      }
      & #five {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
      }
      & #six {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
      }
      & #minus {
        grid-row: 4 / 5;
        grid-column: 4 / 5;
      }

      & #one {
        grid-row: 5 / 6;
        grid-column: 1 / 2;
      }
      & #two {
        grid-row: 5 / 6;
        grid-column: 2 / 3;
      }
      & #three {
        grid-row: 5 / 6;
        grid-column: 3 / 4;
      }
      & #add {
        grid-row: 5 / 6;
        grid-column: 4 / 5;
      }

      & #zero {
        grid-row: 6 / 7;
        grid-column: 1 / 3;
        margin-bottom: 1px;
      }
      & #decimal {
        grid-row: 6 / 7;
        grid-column: 3 / 4;
        margin-bottom: 1px;
      }
      & #equal {
        grid-row: 6 / 7;
        grid-column: 4 / 5;
        margin-bottom: 1px;
      }
    }

    & .close-insert-group {
      display: flex;
      gap: 3px;
      margin: 7px;

      & button {
        flex: 1;
      }
    }

    & .dialog-message {
      padding: 5px 7px 3px 7px;
      margin-top: 8px;
      background-color: var(--secondary-color);
      color: var(--white);
    }
  }
</style>
