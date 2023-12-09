#!/usr/bin/env node

// TODOS:
// * Read or watch tutorials about the Yargs package to create CLI tools.


// ==========================================
// HOW TO USE THIS CLI
// ------------------------------------------
// Navigate to your project's root directory, execute the npx command, and pass the filepaths to each option:
// `npx @fanny-pack-ui/svelte-kit --components src/components --assets src/assets --docs src/routes/docs`
// ==========================================


// Fanny Pack UI is a starter kit for UI components. You can use this starter and customize things as much as you want.
// This npx script will copy the necessary files from the Fanny Pack repo to the user's project.
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
// Look at other possible arguments that I want to use based on the Get Started instructions (https://fanny-pack-ui.pages.dev/get-started).

// const argv = yargs(process.argv.slice(2)).options({
//   a: { type: "boolean", default: false },
//   b: { type: "string", demandOption: true },
//   c: { type: "number", alias: "chill" },
//   d: { type: "array" },
//   e: { type: "count" },
//   f: { choices: ["1", "2", "3"] }
// }).argv;

const argv = yargs(process.argv.slice(2)).options({
  comp: { type: "string", alias: "components", default: "src/components" },
  assets: { type: "string", default: "src/assets" },
  docs: { type: "string", default: "src/routes/docs" }
}).argv;

console.log("CLI Arguments:", argv);

// fs.cp(
//   "/src/lib", "/src/components", 
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

const componentsSrcFolder = "https://github.com/SamuelEarl/fanny-pack-ui/src/lib";
console.log("componentsSrcFolder:", componentsSrcFolder);
// const componentsDestFolder = path.join(__dirname, argv.components);
const componentsDestFolder = argv.components;
console.log("componentsDestFolder:", componentsDestFolder);

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

    const componentEmitter = degit(componentsSrcFolder, { force: true });
    const assetsEmitter = degit(assetsSrcFolder, { force: true });
    const docsEmitter = degit(docsSrcFolder, { force: true });
    
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
