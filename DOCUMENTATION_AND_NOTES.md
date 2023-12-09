# Fanny Pack UI - Components Built with and for SvelteKit
**NOTE: Webpack throws errors with import statements that use aliases like `$`. So I don't think I can use Storybook. Oh, well. I will just create my own interactive documentation using MDSVEX. Webpack is pretty slow and I don't love using apps like Storybook because of the limitations that you run into sometimes, so I prefer to create my own interactive documentation.**


Other helpful guides for building component libraries:
* [The Ultimate Guide to Building a UI Component Library](https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-1-plan)
* [Case Study: Building a Component Library](https://dev.to/kathryngrayson/case-study-building-a-component-library-e90#installing)
* [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

---

# How to develop new components or edit existing components
1. I should create the component first inside the `/src/lib` directory (which is where a component library would need to be created).
2. Then test that component out on a page in the `/src/routes` directory to make sure that the component works properly in a regular SvelteKit app.
3. Write comprehensive tests for the component.
4. Then, for documentation purposes and to give other developers the ability to try out different variations of each component, I will create interactive documentation with controls (similar to what Storybook does) for each component in the `/src/routes` directory. These docs will be similar to the docs found in Carbon Components Svelte (https://carbon-components-svelte.onrender.com/) and maybe Semantic UI.


## Documentation Ideas and Organization
I am referencing https://carbon-components-svelte.onrender.com/ for ideas on how to create this documentation.

---

# How to add `postcss-preset-env` (for native CSS nesting) and `mdsvex` (for Markdown documentation)

* The `postcss-preset-env` config and notes are below.
* Use `svelte-add` to install `mdsvex`, which will configure everything for you: https://github.com/svelte-add/mdsvex. Then you can create `.svelte.md` files and start creating regular Svelte components with Markdown syntax sprinkled throughout. I like to use Markdown to document code blocks in between opening and closing triple backticks. 
    * NOTE: I think `mdsvex` conflicts with Storybook's MDX installation and throws silent errors, so if you want to install `mdsvex` alongside Storybook then you might run into problems. I would just use the default MDX installation.

```js
// svelte.config.js

import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import postcssPresetEnv from "postcss-preset-env";
// __dirname is not available in ES modules: https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
// This issue has a fix: https://github.com/nodejs/help/issues/2907
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				plugins: [
					// * How to configure the postcssPresetEnv plugin:
					// https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md
					// * Disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension in VS Code to prevent false error highlighting:
					// https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting
					postcssPresetEnv({
						stage: 0,
						features: {
							"nesting-rules": true
						},
						browsers: "last 2 versions"
					})
				]
			}
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",

		vite: () => ({
			// Aliases: https://dev.to/danawoodman/how-to-add-module-import-aliases-in-sveltekit-2ck
			resolve: {
				alias: {
					$: path.resolve(__dirname, "/src")
				}
			},

			server: {
				fs: {
					allow: ["package"]
				}
			}
		})
	}
};

export default config;
```

---

# How to update SveltKit to latest version

1. Search for "sveltekit changelog".
2. Find the latest version number.
3. Run `npm update @sveltejs/kit@<version#>`. For example: `npm update @sveltejs/kit@1.0.0-next.445`

---

# How to Create an NPX Tool

https://blog.shahednasser.com/how-to-create-a-npx-tool/
