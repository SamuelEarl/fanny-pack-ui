import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import sveltePreprocess from "svelte-preprocess";
import postcssPresetEnv from "postcss-preset-env";
import postcssGlobalData from "@csstools/postcss-global-data";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
    // The order of preprocessors matters: 
    // https://svelte.dev/docs/v4-migration-guide#preprocessors
    mdsvex(mdsvexConfig),
    vitePreprocess(),
    // You need to also configure the `svelte-preprocess` plugin:
    // https://kit.svelte.dev/docs/integrations#preprocessors-svelte-preprocess
		sveltePreprocess({
			postcss: {
				plugins: [
          // Configure the `@custom-media` queries through the `@csstools/postcss-global-data` plugin.
          // See https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media
          postcssGlobalData({
            files: [
              "src/assets/styles/media-queries.css",
            ],
          }),
					// * Configure nesting rules through the postcssPresetEnv plugin:
          // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
					// * How to configure the postcssPresetEnv plugin:
					// https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md
					// * Disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension in VS Code to prevent false error highlighting:
					// https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting
					postcssPresetEnv({
						stage: 0,
						features: {
							"nesting-rules": true
						},
						browsers: "last 2 versions",
					}),
				]
			}
		}),
	],

	kit: {
		adapter: adapter(),
	}
};

export default config;
