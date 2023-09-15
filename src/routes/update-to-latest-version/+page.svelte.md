# How to update `@fanny-pack-ui/svelte-kit` to the latest version in your app
If you have installed `@fanny-pack-ui/svelte-kit` from npm, then you can follow these instructions to update Fanny Pack UI to the latest version in your app.

*NOTE: Each of the `npm` or `ncu` commands should be executed from inside your project's root directory.*

<br>

## Step 1: See which packages are outdated:
```
npm outdated
```

<br>

## Step 2: Install the `npm-ckeck-updates` package globally:

```
npm install -g npm-check-updates
```

<br>

## Step 3: Update the `@fanny-pack-ui/svelte-kit` package:

```
ncu -u @fanny-pack-ui/svelte-kit
```
This will upgrade the `@fanny-pack-ui/svelte-kit` package version hint in your `package.json` file, so npm can install the updated version in the next step.

<br>

## Step 4: Install the updated version:

```
npm install
```
The package version in your `node_modules` folder should now be updated.

***Source: [Update all the Node.js dependencies to their latest version](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)***

<br>

## Step 5: Update your theme files

If you need to update `@fanny-pack-ui/svelte-kit` to the latest version, then you might also need to update the `theme.css` file. Refer to the instuctions in the [Get Started](/get-started) page for theming details.

**IMPORTANT:**

Before you replace or delete your old `theme.css` file, you should rename your old `theme.css` file to something like `theme-OLD.css`. That way you can reference any changes that you made in your old file and copy those changes to your new `theme.css` file.
