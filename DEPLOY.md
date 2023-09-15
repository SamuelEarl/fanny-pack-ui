# Deploy a SvelteKit app to Cloudflare

## Create a new project
1. Log into your Cloudflare account.
2. Click "Pages" in the left menu.
3. Click the "Create a project" button --> "Connect to Git".
4. Click "Add account".
5. See the GitHub account that contains your repo.
6. Select the repo that you want to deploy. Click "Save".

## Deploy a site from your account
1. Select the repo that you just added, then click "Begin setup".

## Set up builds and deployments
* Follow these instructions for deploying a SvelteKit project: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/, but use these settings instead of the ones described in that article:

NOTE: You can look at the other projects you have under the "Pages" link for examples. Click the "Pages" link in the sidebar --> "Settings" tab.

1. In your `svelte.config.js` file, use the `adapter-auto` that is already installed by default in SvelteKit instead of the `adapter-static` that is mentioned in the Cloudflare guide.
2. When creating a new project in your Cloudflare dashboard, use the "Framework preset" for SvelteKit.
3. IMPORTANT: SvelteKit requires Node.js v14.x or later to build successfully. You must expand the `Environment variables (advanced)` section and add a `NODE_VERSION` variable with a value of `16` or greater. 
4. Click the "Save and Deploy" button.
5. Now when you push your code to the `main` branch your app will automatically build and deploy.

NOTE: Follow these instructions to add custom domains, etc: https://developers.cloudflare.com/pages/get-started/.
