#!/usr/bin/env node

// ==========================================
// Fanny Pack UI is a theme starter kit. It contains the following:
// * Pre-built UI components that can be customized to your heart's content.
// * An `assets` folder with subfolders for `fonts`, `images`, and `styles` (for CSS).
// * A `docs` folder to document your customizations. 
// Instead of npm installing this package into your project, this `npx` script will copy the necessary files from the Fanny Pack UI repo to your project. You can use this theme starter and customize things as much as you want. No need to worry about submitting pull requests to get something updated the way you need. Since the code is copied to your project, you have full access to the code&mdash;like any other local components. So you can make any changes or improvements whenever you want. What if this project gets abandoned and is no longer maintained? That doesn't matter because all the code is in your own repo and you are the maintainer of it from the beginning. The code is well-documented and the `docs` folder details how to implement the code. It should be easy enough to customize these components and make them your own.
// ==========================================
// HOW TO USE THIS CLI
// ------------------------------------------
// IMPORTANT: Create a new branch before you copy this theme starter kit to your project.

// Navigate to your project's root directory, execute the npx command, and pass the filepaths to each option:

// `npx @fanny-pack-ui/svelte-kit --components src/components --assets src/assets --docs src/routes/docs`

// NOTE: This command will only copy files and folders into empty folders. That also means that this command will NOT overwrite any existing files or folders. If you get an error that says the destination directory is not empty, then you will have to specify a different directory to copy these files to and then you can manually drag and drop these files into the location where you want them.

// See the command line help docs: `npx @fanny-pack-ui/svelte-kit --help`
// ==========================================


// TODOS:
// * Read or watch tutorials about the Yargs package to create CLI tools. UPDATE: I don't know if I need to do that anymore. Maybe I do, but maybe I don't.
// * Explain that if this command isn't working, then you might need to run `npx clear-npx-cache`. See https://stackoverflow.com/a/75815920/9453009. This should probably be included in the "Get Started" page under a "Troubleshooting" section.
//     * Also, if I make changes to the npx script, then I will also need to run `npx clear-npx-cache` in order for those changes to work.
// * Update the "Get Started" docs in this repo once I get everything working properly.
// * Update the "Overview" page in this repo, where necessary, once I have finished changing this from a traditional npm package to a theme starter kit.


import path from "path";
import { promises as fsPromises } from "fs";
// How to get working directory with ES Modules: https://stackoverflow.com/a/75041053/9453009
import { fileURLToPath } from "url";
import { dirname } from "path";
import degit from "degit";
import yargs from "yargs";

// This script should take the following arguments:
// (1) The path to a folder where the components should be stored. Defaults to "src/components".
// (2) The path to a folder where the assets files should be stored. Defaults to "src/assets".
// (3) The path to a folder where the docs will be located. Defaults to "src/routes/docs".
// TODO: Look at other possible arguments that I want to use based on the Get Started instructions (https://fanny-pack-ui.pages.dev/get-started).
// * How to npm install packages through this npx script like Iconify and others that are dependencies of Fanny Pack?

// const argv = yargs(process.argv.slice(2)).options({
//   a: { type: "boolean", default: false },
//   b: { type: "string", demandOption: true },
//   c: { type: "number", alias: "chill" },
//   d: { type: "array" },
//   e: { type: "count" },
//   f: { choices: ["1", "2", "3"] }
// }).argv;

const argv = yargs(process.argv.slice(2)).options({
  c: { type: "string", alias: "components", default: "src/components" },
  a: { type: "string", alias: "assets", default: "src/assets" },
  d: { type: "string", alias: "docs", default: "src/routes/docs" }
}).argv;

console.log("CLI Arguments:", argv);

// fs.cp(
//   "/src/components", "/src/components", 
//   { recursive: true }, 
//   (err) => {
//     if(err) {
//       console.error("Copy Error:", err);
//     }
//   }
// );

console.log("CWD:", process.cwd());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentsSrcFolder = "https://github.com/SamuelEarl/fanny-pack-ui/src/components";
console.log("componentsSrcFolder:", componentsSrcFolder);
// const componentsDestFolder = path.join(__dirname, argv.components);
const componentsDestFolder = argv.components;
console.log("componentsDestFolder:", componentsDestFolder);

// The /src/assets/styles/ folder should include the following folders and files:
// utility-classes/
// base.css
// fonts.css
// main.css
// media-queries.css
// preflight.css
// theme.css
// utility-classes.css
const assetsSrcFolder = "https://github.com/SamuelEarl/fanny-pack-ui/src/assets";
console.log("assetsSrcFolder:", assetsSrcFolder);
// const assetsDestFolder = path.join(__dirname, argv.assets);
const assetsDestFolder = argv.assets;
console.log("assetsDestFolder:", assetsDestFolder);

const docsSrcFolder = "https://github.com/SamuelEarl/fanny-pack-ui/src/routes/docs";
console.log("docsSrcFolder:", docsSrcFolder);
// const docsDestFolder = path.join(__dirname, argv.docs);
const docsDestFolder = argv.docs;
console.log("docsDestFolder:", docsDestFolder);


(async function () {
  try {
    // TODO: If I end up using fsPromises, then check Node.js version for fsPromises support.

    const componentEmitter = degit(componentsSrcFolder);
    const assetsEmitter = degit(assetsSrcFolder);
    const docsEmitter = degit(docsSrcFolder);
    
    await componentEmitter.clone(componentsDestFolder);
    await assetsEmitter.clone(assetsDestFolder);
    await docsEmitter.clone(docsDestFolder);

    console.log("\x1B[1mSUCCESS! Fanny Pack UI starter files have been copied to your project!\x1B[22m");
  }
  catch(err) {
    console.error("COPY ERROR:", err);
  }

  // try {
  //   const result = await fsPromises.cp(componentsSrcFolder, componentsDestFolder, { recursive: true });
  //   console.log("RESULT:", result);
  // }
  // catch(err) {
  //   console.error("Copy Error:", err);
  // }
})();
