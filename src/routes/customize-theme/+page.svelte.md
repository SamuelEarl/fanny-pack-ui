<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";
  // import Colorpicker from "@budibase/colorpicker";
  import { Button, Checkbox, Input, Modal, Select, TabsContainer, TabBar, Tab, TabPanel, ToastContent } from "/src/components";
  import themeFile from "/src/assets/styles/theme.css";

  const neutralColors = [
    { label: "--neutral-50", value: "#f9f8f9" },
    { label: "--neutral-100", value: "#f1edf0" },
    { label: "--neutral-200", value: "#e8e2e7" },
    { label: "--neutral-300", value: "#d6ccd4" },
    { label: "--neutral-400", value: "#bcacb9" },
    { label: "--neutral-500", value: "#998095" },
    { label: "--neutral-600", value: "#7c6377" },
    { label: "--neutral-700", value: "#5b4957" },
    { label: "--neutral-800", value: "#3a2f38" },
    { label: "--neutral-900", value: "#1a1419" },
  ];

  let theme = {
    fpNonNeutralColors: [],
    fpNeutralColors: [],
    grayscaleNeutralColors: [],
    customNonNeutralColors: [],
    customNeutralColors: [],
    mainColors: [],
    sizes: [],
  };

  let includedColorSets = {
    fpNonNeutralColors: false,
    fpNeutralColors: false,
    grayscaleNeutralColors: false,
    customNonNeutralColors: false,
    customNeutralColors: false,
  };

  // The `referenceVariables` array is used to populate the select boxes in the "Main color variables" section.
  let referenceVariables = [];

  // let units = ["px", "%", "rem", "em"];
  let showColorPaletteModal = false;

  onMount(() => {
    parseThemeFile();
  });

  /**
   * This function will take the name of a block of CSS variables (as defined in the `theme.css` file),
   * find that block in the `themeFile`, and return all the variables that are defined in that block.
   */
  function findMatchingVariableBlock(blockName) {
    try {
      // Find the text between "/* Block Name */" (e.g. /* FP Non-Neutral Colors */) and the closing `}`.
      // See https://stackoverflow.com/a/40782646
      let regex = new RegExp(`(?<=\/\\* ${blockName} \\*\/\\s*).*?(?=\\s*})`, "gs");
      let matchingVariableBlock = themeFile.match(regex)[0];
      return matchingVariableBlock;
    }
    catch(err) {
      console.error("findMatchingVariableBlock:", err);
    }
  }

  /**
   * This function will:
   * (1) match the CSS variable name within the matchingVariableBlock, 
   * (2) remove the colon from the end of the CSS variable name, 
   * (3) populate the theme object by pushing an object of the form 
   * `{ label: varName, value: "" }` to each `theme[themePropertyName]` array.
   */
  function setCssVariableName(matchingVariableBlock, themePropertyName, namePrefix, nameSuffix) {
    try {
      // Match strings that begin with a specific prefix and end with specific suffix: https://stackoverflow.com/a/20169897
      let nameRegex = new RegExp(namePrefix + "[A-Za-z0-9\-\]*" + nameSuffix, "gi");
      // String.matchAll(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll#regexp.exec_and_matchall.
      let matchingNamesIterator = matchingVariableBlock.matchAll(nameRegex);
      for (const matchingVarName of matchingNamesIterator) {
        // Remove the colon (:) from the end of each CSS variable `name` and push the variable object into the array that matches the theme property name that is passed into this function.
        let varNameWithoutColon = matchingVarName[0].slice(0, -1);
        theme[themePropertyName].push({ label: varNameWithoutColon, value: "" });
      }
    }
    catch(err) {
      console.error("setCssVariableName:", err);
    }
  }

  /**
   * This function will:
   * (1) match the CSS variable value within the matchingVariableBlock,
   * (2) remove the semicolon from the end of the CSS variable name, 
   * (3) replace the empty color value in the theme object with the matching color value.
   */
  function setCssVariableValue(matchingVariableBlock, themePropertyName) {
    try {
      // `valueRegex` will match any of the following types of strings:
        // (1) HEXa values - strings that begin with "#" and end with ";"
        // (2) RGBa values - strings that begin with "rgba?\(" and end with "\);" - The "a" in rgba is optional and numbers, periods, commas, and spaces (\s) can be anywhere between the prefix "rgba?\(" and the suffix "\);" of the regex.
        // (3) var() values - strings that begin with "var\(" and end with "\);"
        // (4) CSS length/size values (e.g. 10px, 20%).
      let valueRegex = /#[A-Fa-f0-9]*;|rgba?\([0-9.,\s]*\);|var\([A-Za-z0-9\-]*\);|[0-9a-z\%]*;/gi;
      // let valueRegex = /#[A-Fa-f0-9]*;/gi;
      // let valueRegex = /var\([A-Za-z0-9\-]*\);/gi;
      let matchingValuesIterator = matchingVariableBlock.matchAll(valueRegex);
      let matchingValuesIndex = 0;
      for (const matchingVarValue of matchingValuesIterator) {
        // Remove the semicolon (;) from the end of each `value`.
        let varValueWithoutSemicolon = matchingVarValue[0].slice(0, -1);
        // Replace the empty color value in the theme object with the matching color value.
        theme[themePropertyName][matchingValuesIndex].value = varValueWithoutSemicolon;
        matchingValuesIndex++;
      }
    }
    catch(err) {
      console.error("setCssVariableValue:", err);
    }
  }

  /**
   * This function will parse the `theme.css` file and create a `theme` object based on the CSS variables in that file.
   * This will allow me to work with a single source of truth (the `theme.css` file) for the theme. 
   * This way, when I add new components or change something in the theme, I only need to make changes in the `theme.css`
   * file and both the components and this "Customize Theme" page will be updated.
   */
  function parseThemeFile() {
    try {
      let regexPrefix = "--";
      let regexSuffix = ":";

      let blockName = "FP Non-Neutral Colors";
      let themePropertyName = "fpNonNeutralColors";
      let matchingVariableBlock = findMatchingVariableBlock(blockName);
      setCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      setCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "FP Neutral Colors";
      themePropertyName = "fpNeutralColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      setCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      setCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "Grayscale Neutral Colors";
      themePropertyName = "grayscaleNeutralColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      setCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      setCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "Main Colors";
      themePropertyName = "mainColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      setCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      setCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "SIZE VARIABLES";
      themePropertyName = "sizes";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      setCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      setCssVariableValue(matchingVariableBlock, themePropertyName);
    }
    catch(err) {
      console.error("parseThemeFile:", err);
    }
  }

  function addColor(colorSet) {
    try {
      // Push a new color array to the `colors` array.
      theme[colorSet].push({ label: "--variable-name", value: "#000000" });
      theme = theme;
    }
    catch(err) {
      console.error("addColor", err);
    }
  }

  function removeColor(colorSet, index) {
    try {
      theme[colorSet].splice(index, 1);
      theme = theme;
    }
    catch(err) {
      console.error("removeColor", err);
    }
  }

  /**
   * Update the values of the CSS variables when the user changes them in the UI.
   * See https://www.w3schools.com/css/css3_variables_javascript.asp
   */
  function updateCssVariable(variableType, variableName, variableValue) {
    // Get the root element
    let root = document.querySelector(":root");
    // Set the value of the CSS variable to the selected value.
    root.style.setProperty(variableName, variableValue);
  }

  function includeColorSet() {
    // Clear the `referenceVariables` array so no variables get duplicated.
    referenceVariables.length = 0;
    // Loop through the `includedColorSets` object and see which color sets have been set to `true`.
    for (const colorSet in includedColorSets) {
      // If a color set has been set to `true`, then push the variable values from that color set into the `referenceVariables` array.
      if (includedColorSets[colorSet]) {
        for (let i = 0; i < theme[colorSet].length; i++) {
          referenceVariables.push(`var(${theme[colorSet][i].label})`);
        }
      }
    }
  }

  // NOTE: Neither the hexToRgb nor the rgbToHex functions are being used, but I am keeping them around in case I do need to use them later.
  /**
   * The <input type="color"> elements can only read hex values as input. So I need to convert rgb values to hex and then pass the result to the bound <input type="color"> elements.
   * See https://stackoverflow.com/a/13070198 and https://stackoverflow.com/a/5624139
   */
  function componentToHex(c) {
    let hex = parseInt(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function rgbToHex(rgbVal) {
    let stringOfNumbers = rgbVal.split("(")[1].split(")")[0];
    let arrayOfNumbers = stringOfNumbers.split(",");
    console.log("arrayOfNumbers:", arrayOfNumbers);

    console.log("componentToHex:", componentToHex(arrayOfNumbers[0]), componentToHex(arrayOfNumbers[1]), componentToHex(arrayOfNumbers[2]));
    return "#" + componentToHex(arrayOfNumbers[0]) + componentToHex(arrayOfNumbers[1]) + componentToHex(arrayOfNumbers[2]);
  }

  // NOTE: Neither the hexToRgb nor the rgbToHex functions are being used, but I am keeping them around in case I do need to use them later.
  /**
   * When a user enters a color value through a default color picker element, the color value is return as a hex value.
   * But I want to define color values in RGBA format in order to preserve alpha values for things like fill colors in a line/area chart. 
   * https://stackoverflow.com/a/47201559/9453009
   */
  function hexToRgb(hex: string, alpha: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      console.log("rgba:", rgba);
      return rgba;
    }

    let rgb = `rgb(${r}, ${g}, ${b})`;
    console.log("rgb:", rgb);
    return rgb;
  }

  function downloadTheme() {
    try {
      // TODOS (for the download theme function):
      // * UPDATE: I don't need to convert hex to RGBa or vice versa because the color picker that I am using supports HEXa values. As I loop through the `value` object in the `theme`, convert hex values to RGB: hexToRgb("#fbafff"); This will preserve alpha values for things like fill colors in a line/area chart.

      let colorsAndSizesContent = [];

      // (1) Create the variable blocks for the selected colors and the size variables.
      for (const prop in includedColorSets) {
        // If "fpNonNeutralColors" has been selected to be included in the theme, then create a content array for this variable block.
        if (prop === "fpNonNeutralColors" && includedColorSets[prop]) {
          let fpNonNeutralColorsContent = [
            `/* FP Non-Neutral Colors */\n`,
            `:root {\n`,    
          ];
          for (let i = 0; theme[prop].length > i; i++) {
            fpNonNeutralColorsContent.push("  " + theme[prop][i].label + ": " + theme[prop][i].value + ";\n");
          }
          fpNonNeutralColorsContent.push("}");
          fpNonNeutralColorsContent.push("\n\n");
          colorsAndSizesContent = [...colorsAndSizesContent, ...fpNonNeutralColorsContent];
        }

        if (prop === "fpNeutralColors" && includedColorSets[prop]) {
          let fpNeutralColorsContent = [
            `/* FP Neutral Colors */\n`,
            `:root {\n`,    
          ];
          for (let i = 0; theme[prop].length > i; i++) {
            fpNeutralColorsContent.push("  " + theme[prop][i].label + ": " + theme[prop][i].value + ";\n");
          }
          fpNeutralColorsContent.push("}");
          fpNeutralColorsContent.push("\n\n");
          colorsAndSizesContent = [...colorsAndSizesContent, ...fpNeutralColorsContent];
        }

        if (prop === "grayscaleNeutralColors" && includedColorSets[prop]) {
          let grayscaleNeutralColorsContent = [
            `/* Grayscale Neutral Colors */\n`,
            `:root {\n`,    
          ];
          for (let i = 0; theme[prop].length > i; i++) {
            grayscaleNeutralColorsContent.push("  " + theme[prop][i].label + ": " + theme[prop][i].value + ";\n");
          }
          grayscaleNeutralColorsContent.push("}");
          grayscaleNeutralColorsContent.push("\n\n");
          colorsAndSizesContent = [...colorsAndSizesContent, ...grayscaleNeutralColorsContent];
        }

        if (prop === "customNonNeutralColors" && includedColorSets[prop]) {
          let customNonNeutralColorsContent = [
            `/* Custom Non-Neutral Colors */\n`,
            `:root {\n`,    
          ];
          for (let i = 0; theme[prop].length > i; i++) {
            customNonNeutralColorsContent.push("  " + theme[prop][i].label + ": " + theme[prop][i].value + ";\n");
          }
          customNonNeutralColorsContent.push("}");
          customNonNeutralColorsContent.push("\n\n");
          colorsAndSizesContent = [...colorsAndSizesContent, ...customNonNeutralColorsContent];
        }

        if (prop === "customNeutralColors" && includedColorSets[prop]) {
          let customNeutralColorsContent = [
            `/* Custom Neutral Colors */\n`,
            `:root {\n`,    
          ];
          for (let i = 0; theme[prop].length > i; i++) {
            customNeutralColorsContent.push("  " + theme[prop][i].label + ": " + theme[prop][i].value + ";\n");
          }
          customNeutralColorsContent.push("}");
          customNeutralColorsContent.push("\n\n");
          colorsAndSizesContent = [...colorsAndSizesContent, ...customNeutralColorsContent];
        }
      }

      // (2) Create the Main Colors variable block.
      let mainColorsContent = [
        `/* Main Colors */\n`,
        `:root {\n`,    
      ];
      for (let i = 0; theme.mainColors.length > i; i++) {
        mainColorsContent.push("  " + theme.mainColors[i].label + ": " + theme.mainColors[i].value + ";\n");
      }
      mainColorsContent.push("}");
      mainColorsContent.push("\n\n");
      colorsAndSizesContent = [...colorsAndSizesContent, ...mainColorsContent];

      // (3) Create the Size Variables block.
      let sizesContent = [
        `/* SIZE VARIABLES */\n`,
        `/* -------------- */\n`,
        `:root {\n`,
        `  /* The padding values are used to provide the sizes for elements like buttons, input fields, etc. */\n`,
      ];
      for (let i = 0; theme.sizes.length > i; i++) {
        sizesContent.push("  " + theme.sizes[i].label + ": " + theme.sizes[i].value + ";\n");
      }
      sizesContent.push("}");
      colorsAndSizesContent = [...colorsAndSizesContent, ...sizesContent];

      // (4) Get the text before and after the color and size variable blocks, then create a `themeContent` array that puts all the code for the theme file together.
      // Find the text between "/* REGEX TOP START */" and "/* REGEX TOP END */".
      // See https://stackoverflow.com/a/40782646
      let topRegex = new RegExp(`(?<=\/\\* REGEX TOP START \\*\/\\s*).*?(?=\\s*/\\* REGEX TOP END \\*\/)`, "gs");
      let matchingTopText = themeFile.match(topRegex)[0];

      // Find the text between "/* REGEX BOTTOM START */" and "/* REGEX BOTTOM END */".
      let bottomRegex = new RegExp(`(?<=\/\\* REGEX BOTTOM START \\*\/\\s*).*?(?=\\s*/\\* REGEX BOTTOM END \\*\/)`, "gs");
      let matchingBottomText = themeFile.match(bottomRegex)[0];

      let themeContent = [
        matchingTopText,
        "\n",
        ...colorsAndSizesContent,
        "\n\n",
        matchingBottomText,
      ];

      // (5) Create the downloadable theme file.
      const a = document.createElement("a"); // Create "a" element
      const blob = new Blob(themeContent, {type: "text/css"}) // Create a blob (file-like object)
      const url = URL.createObjectURL(blob); // Create an object URL from blob
      a.setAttribute("href", url); // Set "a" element link
      a.setAttribute("download", "theme.css"); // Set download filename
      a.click(); // Start downloading
    }
    catch(err) {
      console.error("downloadTheme:", err);
    }
  }
</script>


# Customize Theme

***This page is a work in progress.***

---

How to customize your theme:

1. Follow the instructions below to customize your theme.
2. Download your `theme.css` file. (The download button is at the bottom of this page.)
3. Place your `theme.css` file in your project. (See the [Get Started](/get-started) page for details).

<br>

FYI: The Fanny Pack UI color palette borrows colors from the <a href="https://www.w3schools.com/w3css/w3css_color_metro.asp" target="_blank">Metro UI</a> color palette. The neutral colors in the Fanny Pack UI color palette are shades and tints of <a href="https://www.colorhexa.com/50404d" target="_blank">purple taupe</a>).

---

## Color palette
You can use any or all of the pre-defined color sets below or create your own custom color sets. When creating custom color variables, the names of those variables need to follow the [CSS variable naming convention](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#basic_usage) &ndash; i.e. the name needs to begin with double hyphens (`--`) and each word in the name should be separated by a hyphen.

In the "Main color variables" section (after this "Color palette" section) you will use your color palette to define your main component colors, including the neutral colors, which are used throughout the components. The Fanny Pack UI color palette uses seven neutral colors (black, white, and five shades and tints of <a href="https://www.colorhexa.com/50404d" target="_blank">purple taupe</a>), so you will need to have at least seven neutral colors in your color palette. Click the button below to read some ideas on how to create your set of neutral colors.

<Button
  btnIcon=""
  on:click={() => showColorPaletteModal = true}
>Click to read</Button>

<br><br>

{#if showColorPaletteModal}
  <Modal
    title="Ideas for creating your set of neutral colors"
    on:closeModal={() => showColorPaletteModal = false}
  >
    <div slot="modalBody" style="padding:20px">
      <p>The Fanny Pack UI color palette uses seven neutral colors (black, white, and five shades and tints of <a href="https://www.colorhexa.com/50404d" target="_blank">purple taupe</a>), so you will need to have at least seven neutral colors in your color palette. That might seem like a lot of neutral colors, but it is actually pretty easy to come up with that many. You can either use the neutral colors from the "FP Neutral Colors" or the "Grayscale Neutral Colors" tabs or you can create your own set of custom neutral colors. Here is one idea to create your own set of neutral colors:</p>
      <ol>
        <li>Go to <a href="https://www.colorhexa.com/" target="_blank">ColorHexa</a>.</li>
        <li>Take your primary color, enter it into the search bar, and press Enter.</li>
        <li>Once you are on the page for your primary color, scroll down until you find the heading "Tones of [your primary color]". </li>
        <li>Find a tone that has a good amount of gray in it - maybe one of the first two or three tones on the left side of the spectrum. Click on that tone.</li>
        <li>Once you are on the new page for that tone, scroll down to the heading "Shades and Tints of [the tone you selected]".</li>
        <li>Select a shade or tint to use as your "medium" neutral color - maybe the 3rd, 4th, or 5th color from the left in the tint spectrum.</li>
        <li>Once you have selected your "medium" neutral color you can pick two neutral colors that are darker than your "medium" neutral color and two that are lighter than your "medium" neutral color. You might want to pick colors that are about three or four shades/tints away from each other to give enough contrast between each neutral color, but you decide what looks best for your color palette.</li>
        <li>That will give you five neutral colors. If you use black (`#000000`) and white (`#ffffff`) as your darkest and lightest neutral colors, respectively, (or shades/tints that are close to black and white) then you will have the seven neutral colors you need.</li>
      </ol>
    </div>
    <div slot="modalFooterRight">
      <Button btnIcon="mdi:close" on:click={() => showColorPaletteModal = false}>Close</Button>
    </div>
  </Modal>
{/if}

<br>

<TabsContainer padding="lg">
  <TabBar>
    <Tab>FP Non-Neutral Colors</Tab>
    <Tab>FP Neutral Colors</Tab>
    <Tab>Grayscale Neutral Colors</Tab>
    <Tab>Custom Non-Neutral Colors</Tab>
    <Tab>Custom Neutral Colors</Tab>
  </TabBar>

  <TabPanel>
    <div id="non-neutral-colors" class="color-set responsive-table">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.fpNonNeutralColors as color, index}
            <tr>
              <td>{color.label}</td>
      <!-- UPDATE: I might not create a custom colorpicker. I just need users to be able to set their color palettes (without any transparency values) and then I will create transparency values for some of the charts the will use transparent colors. -->
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" value={color.value} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </TabPanel>

  <TabPanel>
    <div id="fp-neutral-colors" class="color-set responsive-table">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th style="display:flex; justify-content:center;">Color value</th>
          </tr>
        </thead>
        <tbody>
          <!-- {#each theme.fpNeutralColors as color, index} -->
          {#each neutralColors as color, index}
            <tr>
              <td>{color.label}</td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td style="display:flex; justify-content:center;"><input type="color" value={color.value} style="width:75px; height:30px;" /></td>
              <!-- <td><div style={`width:100px; height:50px; background-color:${color.value}`}></div></td> -->
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </TabPanel>

  <TabPanel>
    <div id="grayscale-neutral-colors" class="color-set responsive-table">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.grayscaleNeutralColors as color, index}
            <tr>
              <td>{color.label}</td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" value={color.value} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </TabPanel>

  <TabPanel>
    <div id="custom-non-neutral-colors" class="color-set responsive-table">
      <p>Create your own custom set of non-neutral colors.</p>
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.customNonNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("customNonNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("customNonNeutralColors")}>
        Add color
      </Button>
    </div>
  </TabPanel>

  <TabPanel>
    <div id="custom-neutral-colors" class="color-set responsive-table">
      <p>Create your own custom set of neutral colors.</p>
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.customNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("customNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("customNeutralColors")}>
        Add color
      </Button>
    </div>
  </TabPanel>
</TabsContainer>

<br><br>

## Main color variables
These styles are used throughout the Fanny Pack UI components. Updating these variables will handle almost all of your theme customizations. If you want to customize individual components, then you can change the values for any of the individual components in the `theme.css` file that you download at the bottom of this page.

To set your main color variables:

1. Select the color sets that you want to include in your `theme.css` file.
2. In the table below, set the main colors that you want to use throughout your theme. (You can then browse to the different component pages to see how the components will look with your theme.)

*NOTE: After you select your color sets you will see that the main colors below are initially set to the Fanny Pack main colors. That is intentional to provide an example for you to follow.*

<br>

<Checkbox
  bind:checked={includedColorSets.fpNonNeutralColors}
  label="FP Non-Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.fpNeutralColors}
  label="FP Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.grayscaleNeutralColors}
  label="Grayscale Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.customNonNeutralColors}
  label="Custom Non-Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.customNeutralColors}
  label="Custom Neutral Colors"
  on:change={includeColorSet}
/>

<br>

<div class="table-container responsive-table">
  <table>
    <thead>
      <tr>
        <th>Variable name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {#each theme.mainColors as mainColor, index (mainColor.label)}
        <tr>
          <td>{mainColor.label}</td>
          <td>
            {#if referenceVariables.length > 0}
              <!-- NOTE: When this page first loads, the `parseThemeFile()` function will populate the `theme` object based on the color and size CSS variables that are defined in the `theme.css` file. So the `theme.mainColors` array will contain the Main Color variables from the `theme.css` file. Since each of the following <Select> components is bound to `theme.mainColors[i].value`, the initial value of each of these <Select> components will be the corresponding Main Color value from the `theme.css` file. -->
              <Select
                options={referenceVariables}
                size="sm"
                bind:value={mainColor.value}
                on:change={(event) => updateCssVariable("color", mainColor.label, event.detail)}
              />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<br><br>

## Size variables
The size variables are used to set values for things like padding (for buttons and other elements), the roundness or squareness of borders (i.e. `border-radius`), font sizes, etc. You are welcome to keep the default sizes for each of the following variables or change them however you want.

<br>

<div class="table-container responsive-table">
  <table>
    <thead>
      <tr>
        <th>Size variable name</th>
        <th>Size value</th>
        <!-- <th>Unit</th> -->
      </tr>
    </thead>
    <tbody>
      {#each theme.sizes as size, index}
        <tr>
          <td>{size.label}</td>
          <td>
            <Input
              id={`size-input-${index}`}
              type="text"
              size="sm"
              bind:value={size.value}
              on:keyup={(event) => {
                if (event && (event.key === "Enter" || event.key === "Escape")) {
                  document.getElementById(`size-input-${index}`).blur();
                }
              }}
              on:blur={() => updateCssVariable("size", size.label, event.target.value)}
            />
          </td>
          <!-- If there is a unit specified for the size variable, then show a <Select> component with the unit options. -->
          <!-- {#if size.unit}
            <td>
              <Select
                options={units}
                bind:value={size.unit}
                size="sm"
                on:change={(event) => updateCssVariable("size", size.label, size.value, event.detail)}
              />
            </td>
          {/if} -->
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<br><br><br><br>

{#if referenceVariables.length === 0}
  <p class="download-error">You need to select and set your main colors before you can download your theme</p>
  <Button
    btnIconDisabled="mi:document-download"
    width="full"
    size="lg"
    disabled={true}
    btnIconDisabledShouldSpin={false}
  >
    Download theme
  </Button>
{:else}
  <Button
    btnColor="secondary"
    btnIcon="mi:document-download"
    width="full"
    size="lg"
    on:click={downloadTheme}
  >
    Download theme
  </Button>
{/if}


<style>
  .tab-bar {
    display: flex;
    border: 10px solid var(--secondary-color);
    border-bottom: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background-color: var(--secondary-color);
    color: var(--white);

    & .tab {
      padding: 10px 15px 15px 15px;
      cursor: pointer;

      &.active {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        background-color: var(--white);
        color: var(--secondary-color);
      }
    }
  }

  .color-set {
    padding-top: 20px;
  }

  .download-error {
    text-align: center;
    padding: 15px;
    border-radius: var(--border-radius);
    background-color: var(--error-color);
    color: var(--white);
  }
</style>
