# Skins Storefront

## Compair Bootstrap vs Tailwind:

- Bootstrap styles inside a html element using class="" with with prestyled component like btn where it appliese several styles at once adding padding/font/settings/round corners and transistion  like for hovering on a button. 
 The btn style is defined inside bootstrap.min.css and styled in style.css.
  - [Check out the Bootstrap page](bootstrap/index.html)

- Tailwind styles also inside a html element using class="" with but with individual styles class="round-full bg-blush ". Rules on like the color of bg-blush is inside tailwind.css. 
  - [Check out the Tailwind page](tailwind/index.html)

### Pros and cons

| Framework | Pros | Cons | When I would use it |
| --- | --- | --- | --- |
| Bootstrap | Ready-made styles for buttons, forms, and tables help you build a consistent page quickly. | A custom design can take extra CSS to change the default colors, spacing, and component styles. | A dashboard that needs standard forms and tables. |
| Tailwind | Utility classes give you control over layout, spacing, and colors, which helps you match a custom design. | The HTML can get crowded with class names. This project also needs a CSS rebuild after you change its Tailwind classes. | A branded storefront like Skins that needs its own colors and layout. |

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
