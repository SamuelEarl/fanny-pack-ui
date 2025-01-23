<script lang="ts">
  import Logo from "/src/assets/images/fanny-pack.svg";
  import GitHub from "/src/assets/images/github.svg";

  // Get app version from package.json using Vite: https://stackoverflow.com/questions/67194082/how-can-i-display-the-current-app-version-from-package-json-to-the-user-using-vi.
  let version = __APP_VERSION__;
</script>


<div id="home">
  <div id="img-container">
    <img src={Logo} alt="Fanny Pack Logo" />
  </div>
</div>

---

*IMPORTANT: These components are not ready for production yet.*

---

<div id="github-icon-version-container">
  <a href="https://github.com/SamuelEarl/fanny-pack-ui">
    <img src={GitHub} alt="GitHub" />
  </a>
  <span>Version: {version}</span>
</div>

---

Fanny Pack UI is a collection of random junk that you can throw into your SvelteKit apps and theme to your heart's content.
 
These components do not follow a specific organization's design system (e.g. Material Design, Fluent Design), so you can create apps with these components and customize them to fit your unique style needs. However, these components have been designed with a "flat" theme in mind, which means that in most cases there is no appearance of depth in the components (e.g. through the use of box shadows). Instead of using the concept of depth, these components are "highlighted" when a user hovers over them or when a component receives focus. 

*NOTE: There are a few exceptions to the "no depth" styling. For example, if there is a dropdown menu in a component (e.g. select boxes, date pickers), then there is a slight box shadow around the dropdown menu to give it the appearance of laying above the page rather than blending in with the page.*

You can use your own fonts and these components will inherit those fonts. You can read the tutorial on [how to install your own fonts](/get-started#install-fonts) in your app.

These components are also designed for responsiveness and with accessibility in mind (following the guidelines from W3.org's [ARIA in HTML](https://www.w3.org/TR/html-aria/#docconformance) page).

If you want to customize these components even more than what is available to you, then please feel free to copy the code and customize it however you want. The code is intentially simple, easy to understand, heavily commented/documented, and not very DRY (don't repeat yourself) to allow users to copy only the components they want (instead of the entire package) and easily customize the code without very many dependencies on other components. There are some cases where the code is DRY, but it's not too DRY.

Fanny Pack UI takes advantage of CSS variables, utility classes, and reusable components, which makes for a scalable approach to CSS. To learn more about the importance of scalable and maintainable CSS, please read the following section.

<br>

# The Importance of Scalable & Maintainable CSS

What does it mean to have scalable CSS? 

CSS coding standards help to maintain consistent theming throughout an app and they make future code maintenance easier. **Scalable CSS means that the CSS styles are defined and organized in such a way that you can maintain coding standards, even when the CSS is used in large projects or with multiple team members.** One common way to implement CSS coding standards is through utility classes.

One of the biggest challenges of using CSS is when you are using it in a large project or with multiple team members. If the CSS styles are not defined and used in a scalable way, then you will likely have a maintenance nightmare on your hands. Let me provide an example to illustrate.

Imagine working on a large project that has been around for years and it has a lot of legacy code (along with a lot of global CSS). Your boss asks you to update a page along with some styles for that page. Since the CSS is global, if you change some of the existing styles, then you might accidentally change styles on another, unrelated page. That's a big problem. So you have to create new styles and namespace the ids and classes for those styles so you avoid accidentally changing the styles on another page. Namespacing styles will work because it allows you to isolate the styles for that page, but that is a one of many non-scalable approaches to CSS.

Component-based frameworks, like SvelteKit, will namespace styles for you, which helps to implement scalable CSS. But it's not foolproof. You can still create non-scalable CSS easily. Here are just a few issues that you might run into with non-scalable CSS approaches, even when using component-based frameworks:

* Adding more namespaced styles in an effort to update your CSS without breaking CSS that already exists will only increase the CSS file size. That's a bad practice.
* What if your company wants to do a redesign? How will all the pages that have isolated styles get redesigned without re-styling each page individually? 
* How can you ensure that other developers on your team are styling their pages following your company's design system? Unless developers are carefully referencing your company's design guide they could easily stray from the design system. And how many developers do you think carefully reference a company's design guide, especially when they are under pressure to get a feature out?
* How do you onboard new developers if you don't have a standard way to style your pages? How would they get trained to handle CSS styles? You could have a mess of CSS styles on each page or component that don't follow any standard practices.

To understand the value of CSS coding standards through the use of utility classes, consider the following example from [codyhouse.co](https://codyhouse.co/blog/post/css-grid-layout-vs-framework-grid) about different ways to handle grid layouts:

<hr>

<div class="example">
  <h2>Starting a project using only CSS Grid</h2>

  Let's imagine we're starting a project where, at some point, we need to create a grid.

  ```css
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  ```

  As we move forward with the project, chances are we need to create more grids:

  ```css
  .gallery, .form-grid, .list {
    display: grid;
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48rem) {
    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .form-grid {
    grid-template-columns: minmax(100px, 250px) 1fr 1fr;
    grid-gap: 20px;
  }

  .list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  ```

  So far, so good! If our project was mostly done, why bother even thinking about importing a grid system? CSS Grid easily gets the job done.

  <h2>The project grows in complexity</h2>

  Imagine we need to apply the same grid to two components. What are we supposed to do?

  **Option 1)** Use the same class.

  ```html
  <div class="form-grid">
    <!-- ... -->
  </div>

  <div class="form-grid">
    <!-- ... -->
  </div>

  <style>
    .form-grid {
      display: grid;
      grid-template-columns: minmax(100px, 250px) 1fr 1fr;
      grid-gap: 20px;
    }
  </style>
  ```

  This approach could go wrong for many reasons. First, a picky developer who loves semantics would dye inside a little [if a `.form-grid` was used on an element that is not a `<form>`]. Most importantly, we would create an invisible connection between two components: changing the CSS of the first one would affect the second one. You're creating a trap for your future self.

  **Option 2)** Create a new grid.

  ```html
  <div class="form-grid">
    <!-- ... -->
  </div>

  <div class="portfolio-gallery">
    <!-- ... -->
  </div>

  <style>
    .form-grid, .portfolio-gallery {
      display: grid;
      grid-template-columns: minmax(100px, 250px) 1fr 1fr;
      grid-gap: 20px;
    }
  </style>
  ```

  Creating a new grid for the new component and grouping the classes would be the safest approach. Besides, it won't affect the CSS size.

  Now imagine we get to the point where our project needs multiple (similar) grids. Should we keep creating a new grid for each component?

  ```css
  .gallery, .form-grid, .portfolio-gallery, .contact-gallery, .list {
    display: grid;
  }

  .gallery, .form-grid, .portfolio-gallery {
    gap: 20px;
  }

  .form-grid, .portfolio-gallery {
    grid-template-columns: repeat(3, 1fr);
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48rem) {
    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .contact-gallery {
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
  }

  .list {
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  ```

  Here are the weakest points of the above approach:

  <ol>
    <li>Even though the grid classes are in the same SCSS file (highly unusual - typically, they'll end up in different SCSS/component files), and the number of grids is relatively small, dealing with the grid system is already getting more complicated.</li>
    <li>Each grid requires a different class name, and naming too many things can be frustrating.</li>
    <li>Because the classes are intertwined, modifying, or creating new grids requires a high concentration level. The risk of breaking things is high.</li>
  </ol>

  Sooner or later, we end up doing the only thing that makes sense: **we create abstractions** [with utility classes].

  ```css
  .grid { display: grid; }
  .grid-col-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-col-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-col-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-auto { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .gap-sm { gap: 16px; }
  .gap-md { gap: 20px; }
  .gap-lg { gap: 40px; }
  ```

  Our grid utility classes are born out of necessity!

  Here are the main advantages of abstracting grid utility classes:

  <ol>
    <li>All the grid utility classes are in the same SCSS file and are easy to read.</li>
    <li>You can quickly expand the system if required by the project.</li>
    <li>No more naming things.</li>
    <li>If you use the same grid system across multiple projects, you won't need to inspect the CSS at all.</li>
    <li>Dealing with simpler CSS means reducing the risk of breaking things.</li>
  </ol>
</div>

<hr>

## Different Strokes for Different Folks

Libraries like TailwindCSS are awesome and handle a lot of the heavy lifting for you in terms of creating a utility class system. However, they can also be difficult to work with for a few reasons:

* It is one more thing to learn, which may not be around later on. Web standards will be around for a long time, but libraries come and go pretty quickly sometimes. Everytime I get back into a Tailwind project I have to reference the Tailwind docs a lot. That's not necessarily a bad thing, but it is really nice to just use standard CSS, which has a much larger community to lean on when I run into a CSS issue.
* You have to do things their way, which you might not like or which might not make sense to you.
* Creating a custom theme can get pretty hairy and confusing. For example, if I want to create a custom `text-color` class in Tailwind, I can define a color like this in the `tailwind.config.cjs` file: `"text-color": "#0f172a"`. But then when I want to use the `text-color` class I can't just reference `"text-color"` in my HTML. I actually have to reference `"text-text-color"`. But I can work around this issue by creating custom classes in the `base` layer of my `main.css` file, like this: `.text-color { @apply text-text-color; }`. But now I am duplicating code just to get the same benefits that I could get by using CSS variables. So why not just use CSS variables? When working on a team (and even when working on solo projects) those custom classes in the `base` layer can often get lost and forgotten, especially if you are defining a lot of custom classes. 
* Tailwind colors can get pretty confusing when you start to introduce things that are a little more complex. For example, I wanted to add a simple box shadow to some elements when they were hovered. I define a default border color that I could use for certain elements (e.g. input fields, select boxes, checkboxes, radio buttons). I named that custom color value `border-color-default`. After defining that custom color value I was able to use it anywhere if I prefixed it with the corresponding element prefix. For example, I could set a default border color with the `border-border-color-default` or I could color some text with `text-border-color-default` (even though that seems a little confusing). (NOTE: The `border-border` part gets a little confusing, but there is a work around for that, as explained above.) Once that `border-color-default` class was defined I wanted to create a box shadow that basically added a 2px border around elements that were hovered. So I set this utility in the `tailwind.config.cjs` file:<br><br>
  ```
  boxShadow: {
    "hover": "0 0 0 2px",
  }
  ```
  
  That allowed me to set a box-shadow that had the same color as my default border color with this utility classes: `shadow-hover shadow-border-color-default`. (Or was it `shadow-hover shadow-border-color-default-hover`? I can't remember.)

  Then I could apply that to the hover state of an element with these utility classes: `hover:shadow-hover hover:shadow-border-color-default`. (Or maybe it was `hover:shadow-hover hover:shadow-border-color-default-hover`). 

  I remember using those utility classes on some elements and then I hadn't used them for a while. When I tried to use those utility classes again later on, I could not remember how to apply them to some elements. (The naming conventions that Tailwind uses are not always obvious when you want to apply a utility class. This is often because of the fact that custom utility classes are defined in different areas rather than all together. The Tailwind docs lay all of the default utility class names out very nicely for you and you see what is available and how to use them. But if you create custom utility classes then there is no documentation for those unless you create your own.) 
  
  Maybe I could have named my custom `boxShadow` `hover` utility class something else that would have made more sense in a class name. Or maybe I could have created another custom class in the `base` layer to make it easier to apply those utility classes. Either way, the fact remains that it was difficult for me to use those utility classes, even though I was the one who defined them. At the end of the day, I prefer this much more:

  ```
  .element:hover {
    box-shadow: 0 0 0 2px var(--border-color-default);
  }
  ```

  Or better yet:

  ```
  --box-shadow-default: 0 0 0 2px var(--border-color-default);
  ```
  ```
  .element:hover {
    box-shadow: var(--box-shadow-default);
  }
  ```

  That is much easier to reason about, at least for me. No strange naming rules to remember. No defining styles in multiple places or using workarounds to define a sensible name for custom styles. Just plain, standards-based CSS that is defined in one location.

<br>

Tailwind is great if you just want to use their default settings, but if you want a custom theme, then it might be easier to stick with the strengths of CSS variables and reusable components with some of your own utility classes sprinkled throughout.

* What happens when a framework like Tailwind has a major version change? Should you update everything that was affected? Should you ignore the version change? You don't have that problem with standard CSS.
* Frameworks like SvelteKit isolate styles to the local scope by default. So using a utility library like Tailwind does not provide the same value in SvelteKit as it does in a framework like React or as it does if you were not using a frontend framework.

I wonder if a lot of developers assume that everyone else loves Tailwind, so they feel like they should use it too rather than evaluating it and deciding if it works for them. I remember reading a post on StackOverflow many years ago where the original question was something like, "Which framework should I use between Ruby on Rails and Django?" I think some of the responses got into a bit of a framework war, but one person said that you should evaluate both frameworks and their languages and go with the one you like the most. And then he said that the decision really comes down to your own personal preference. His actual words were "there are different strokes for different folks." That is one of the best pieces of advice I have heard about web development! Don't worry about what other people prefer. Go with what you prefer. That seems to be the easiest and best way to make a programming decision. And then you can move forward with peace of mind because you are not worried about what others think.

My personal preference is to use CSS variables and create the CSS utility classes that I need as I need them (for styles that are repeated multiple times throughout an app, like animations). If you go this route, then you would have to make sure that those variables and classes are clearly defined in a single location and train your team to reference and use those styles religiously. For example, you could have a `colors.css` file that holds all of your color variables, a `layout.css` file that holds all of your layout and grid classes, a `sizes.css` file that holds all of your size and spacing variables, etc. You could then import all of those files into your `main.css` file and import your `main.css` file into your `+layout.svelte` file. 

Tailwind is very well organized, so if you wanted to create your own small (or large) set of utility classes, then you could reference what they have done.

Truthfully, there is no sure fire way that will keep your CSS scalable in all situations. Even if you use Tailwind, there are still plenty of situations where you can (and even have to at times) breakout of Tailwind and use plain CSS again. I guess it just comes down to this one true principle: **There are different strokes for different folks.** If you like Tailwind, then use it. If you prefer something else, then go with that. Just decide on something and move forward.

When we need to style an element, a component, or a page, we will sometimes (or often) style those things in isolation, which often leads to a lot of duplicated styles and brittle CSS code. However, **a scalable CSS approach will define styles in one location and then reference those styles wherever they are needed**. Scalable CSS will use some combination of CSS variables, components, and  utility classes. These concepts also keep our styles DRY and more maintainable. These scalable CSS concepts are similar to the concept of "a single source of truth" where you define or store something in a single location and then reference it wherever it is needed.


<!-- TODO: I need to read through these notes and keep whatever makes sense and is applicable to the issue of CSS variables vs utility classes. -->
<!-- # CSS Variables vs Utility Classes

I have debated whether or not to create my own utility classes and just reference those throughout my app, similar to Tailwind. But if I wanted to do that, then why not just use Tailwind? (Also see the home page of the design-system - i.e. Fanny Pack UI - for an explanation of why I decided to move away from Tailwind.) I prefer using CSS variables inside my components and a few utility classes when necessary (for styles that are repeated multiple times throughout an app, like animations or maybe even disabled states).

I don't like using utility classes and prefer to reference CSS variables where necessary. I will use CSS variables in class definitions or as inline styles, whatever makes the most sense for the situation. (See the Button component for an example of using CSS variables in both class definitions and in inline styles.)

If I were to try to create a bunch of utility classes, then I would be in the unenviable position of maintaining a library of utility classes that could be very brittle and difficult to maintain. A small set of reusable CSS variables are much easier to reason about than a large library of utility classes. For example, I can define a few CSS variables and reference them wherever I need. For example:

.title {
  color: var(--primary-color);
  font-size: var(--font-size-xl);
}

.button {
  background-color: var(--primary-color);
  color: var(--text-color-default);
}

If you combine CSS variables with base element styles (e.g. in a `base.css` file) and reusable components, then you have a really simple design system that is pretty easy to reason about and maintain.

If I were to create my own utility classes in a similar way to Tailwind, then I would have to create a new utility class for each property (not each element):

.text-color-default {
  color: var(--text-color-default);
}

.text-color-primary {
  color: var(--primary-color);
}

.font-size-xl {
  font-size: var(--font-size-xl);
}

.bg-color-primary {
  background-color: var(--primary-color);
}

...and then I have to reference those classes in my HTML for each property that I want to use. So I am creating CSS variables and referencing those in each utility class and then referencing each utility class in my HTML. It starts to become pretty confusing because you no longer have a single source of truth (i.e. a single place where your CSS styles are defined). You now have CSS variables that define some things and utility classes that define other things. It also becomes a lot of CSS code to maintain and CSS code is very brittle. One simple typo from a well intentioned developer will break a class, but you won't get any error messages telling you that your CSS code is broken.

I prefer to create utility classes when it is beneficial to do so (e.g. a particular style is used repeatedly, like animations), then you can create those as needed and reference the CSS variables when necessary. Also, frameworks like SvelteKit isolate styles to the local scope by default. So using a utility library like Tailwind does not provide the same value in SvelteKit as it does in a framework like React or as it does if you were not using a frontend framework.

As I have debated the ideas of CSS variables vs utility classes and which would be more beneficial, I have come to this conclusion (at least for now): Maybe none of that matters. Maybe I should use whatever feels easiest and most natural for now and I can always refactor later, if I want to. -->


<style>
  #home {
    
    & #img-container {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      & img {
        width: 512px;
      }
    }
  }

  #github-icon-version-container {
    display: flex;
    align-items: center;
    gap: 10px;

    & a {
      border-bottom: none;

      & img {
        width: 30px;
      }
    }
  }

  .example {
    font-style: italic;
  }
</style>
