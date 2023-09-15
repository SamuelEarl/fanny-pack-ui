# How to package and publish the Fanny Pack UI to npm

Sources: 

* https://kit.svelte.dev/docs/packaging
* https://blog.logrocket.com/build-your-own-component-library-svelte/

## Step 1: Organize your components so they can be imported easily
Inside of the `src/lib` folder, create a folder for each component. Inside of each of those folders create an `index.js` file that exports the component, like this:

```
export { default as Button } from "./Button.svelte";
```

Now create an `index.js` file directly inside of the `src/lib` folder. That `index.js` file should re-export each component, like this:

```
export { Button } from "./Button";
```

To see an example of this component exporting and re-exporting, look at the `carbon-components-svelte` GitHub repo: https://github.com/carbon-design-system/carbon-components-svelte/tree/master/src.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


## Step 2: Ensure that required dependencies are installed in the `peerDependencies` object
In order for Fanny Pack to work properly, any projects that install Fanny Pack will also need to install packages like `@iconify/svelte` and `d3`. These packages that need to be installed along with Fanny Pack should be listed in the `peerDependencies` object. For details see [Understanding Peer Dependencies in JavaScript](https://blog.bitsrc.io/understanding-peer-dependencies-in-javascript-dbdb4ab5a7be).

When npm creates the tarball during the `npm publish` command it will reference the `peerDependencies` object and automatically bundle any `peerDependencies` packages into your library's bundle. So make sure that any dependencies that are required for your package to work properly are installed as `peerDependencies`.(See [NPM does not publish dependencies](https://stackoverflow.com/questions/31215356/npm-does-not-publish-dependencies), which is similar to how `peerDependencies` work.) You could use the `dependencies` option, but for a library that will be used in other projects the `peerDependencies` option seems to be a better fit.


## Step 3: Bump the version number up
You have to make sure that the package name and package version combination don't exist already; if so, the package will not be published on npm. So you need to bump up the version number in the `package.json` file (that is in the root directory) before you continue.


## Step 4: Push your updates to GitHub
Make sure to save your code by `add`ing, `commit`ing, and `push`ing to GitHub before you continue.


## Step 5: Turn your component library into an npm package
Run the following from the root of the project:

**********
NOTE: I need to read up on the changes for packaging code up into a library: https://kit.svelte.dev/docs/packaging
**********

```
npm run package
```

This command will take all the files that are under the `src/lib` folder and turn them into a package. This command will generate a new `dist` directory at the root of your project. Inside of that `dist` directory you will notice that there is a new `package.json` file. This file consists of an attribute called `exports`, which consists of all the paths or entry points to the individual components that we have developed.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


## Step 6: Login to npm
Read how to do login here: http://npm.github.io/installation-setup-docs/installing/logging-in-and-out.html


## Step 7: Publish to npm with a scoped package
In order to distribute this package to other developers and allow them to install it as an npm package you need to publish it to npm. To publish this as an npm module run the following command from inside the directory that contains your `package.json` file:

```
npm publish
```

NOTE: Since this uses a scoped package name, the first time you publish this package you will have to specify that this should be a public package. (If you want this to be a private package with a scoped name, then you can pay for that.)

```
npm publish ./dist --access=public
```

Or maybe you can leave the `./dist` out, like this:

```
npm publish --access=public
```

Sources:
  * *https://blog.logrocket.com/build-your-own-component-library-svelte/*
  * *[How To Create And Publish Your First NPM Package](https://www.youtube.com/watch?v=J4b_T-qH3BY)*


---


# How to develop a local package and install it as an npm package

**IMPORTANT NOTE: SvelteKit now uses your app's `package.json` file instead of creating a new one for you. So the process of developing a local package might not be as easy as it used to be. See https://kit.svelte.dev/docs/packaging.**

You can install the local `package` directory as a package in your `package.json` file. This comes in handy in situations where you want to develop your component library locally. You could then move your package to npm and use it in other projects.

Many of these concepts are borrowed from this tutorial: [The Ultimate Guide to Building a UI Component Library—Part 2: Establishing a Development Environment](https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-2-environment)

## Step 1: Turn your component library into a package

Follow steps 1 and 5 under the heading "How to package and publish the Fanny Pack UI to npm" (above).

You can then either publish this package to npm and install it from there (above, which is good for distributing the component library to other developers to use in their projects), or you can install the local `package` directory as a package in your `package.json` file (below, which is good for locally developing the component library).


## Step 2: Allow Vite to serve files from the `package` folder

Vite will not serve files from the `package` folder by default. If you try to import your components into a `src/routes` file, then you will see the following error:

```
The request url "/path/to/package/folder" is outside of Vite serving allow list.
```

To fix this problem, open the `svelte.config.js` file, add the following `vite.server.fs.allow` config:

```
kit: {
  ...

  vite: () => ({
    server: {
      fs: {
        allow: [
          "package"
        ]
      }
    }
  }),
},
```

See:
* https://vitejs.dev/config/#server-fs-allow
* https://github.com/sveltejs/kit/issues/2701


## Step 3: Install your local library/package and import components

In order to use your local component library in the rest of your app (i.e. the files inside your `src/routes` directory), you will have to install them. From the project root directoy run the following command:

```
npm install --save-dev ./package
```

When you use `npm install` you almost always want to install npm packages from the global npm registry. For example, `npm install --save-dev svelte` tells npm to look for a package named "svelte" in its registry, and to install it into your application.

However, npm can also install local packages (aka a directory on your local machine that has a `package.json` file in it), and you can do so by passing npm a path to the directory to install. So in this case, `npm install --save-dev ./package` tells npm to install the package in the `package` directory in your demo app.

If you open your demo application's `package.json` file, you'll see a new `devDependency` for "@fanny-pack-ui/svelte-kit" that looks like this:

```
"@fanny-pack-ui/svelte-kit": "file:package",
```

This is a link that gives you the ability to use your components in your example app. This is how you would import a component into a `.svelte` file in the example app:

```
import { Button } from "@fanny-pack-ui/svelte-kit";
```

## Step 4: Develop and edit components and update to the latest version from your local `package` directory

Since you have already installed the local `@fanny-pack-ui` library as a package, the link has been established from the files in the `package` folder to the `package.json` file. So now when you create any new components or update any existing components, all you need to do to get those updates is run the `npm run package` command to rebuild the `@fanny-pack-ui` library into a package. The link in the `package.json` file will simply reference the latest version of your library/package. And you can keep building/updating your components and then running `npm run package`.
