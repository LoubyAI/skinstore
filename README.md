# Skins Storefront

[Open the project landing page](https://loubyai.github.io/skinstore/) to preview all three pages and compare Bootstrap and Tailwind.

## Compair Bootstrap vs Tailwind:

- Bootstrap styles inside a html element using class="" with with prestyled component like btn where it appliese several styles at once adding padding/font/settings/round corners and transistion  like for hovering on a button. 
 The btn style is defined inside bootstrap.min.css and styled in style.css.
  - **Pros** include ready-made styles for buttons, forms, and tables that help you build a consistent page quickly.
  - **Cons** include writing extra CSS to customize colors, spacing, and component styles.
  - **Good for** admin dashboards, booking forms, and internal tools where standard components cover most of the design.
  - [Check out the Bootstrap page](bootstrap/index.html)

- Tailwind styles also inside a html element using class="" with but with individual styles class="round-full bg-blush ". Rules on like the color of bg-blush is inside tailwind.css. 
  - **Pros** include control over layout, spacing, and colors, which helps you match a custom design.
  - **Cons** include longer class lists in the HTML and the need to rebuild this project's CSS after you change its Tailwind classes.
  - **Good for** branded storefronts like Skins, portfolios, and campaign websites that need a custom layout and visual style.
  - [Check out the Tailwind page](tailwind/index.html)

## Interactive page:
- Uses plain JavaScript and html and css. 
  - [Check out the interactive routine builder](interactive/index.html)




## Preview locally

Open the `index.html` file in the version you want to preview. Each version includes its assets and JavaScript, so you can preview it without installing anything.

## Rebuild the Tailwind stylesheet

Run these commands from the project root if you change the Tailwind styles or utility classes.

```sh
cd tailwind
npm ci
npm run build
```
