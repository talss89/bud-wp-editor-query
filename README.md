# bud-wp-editor-query

**Use with Bud `^6.16.1`**

Extracts wp-editor styles into a separate stylesheet. For WordPress FSE themes. A rewrite of the now defunct https://github.com/talss89/wp-editor-query-plugin

Thanks to [@kellymears](https://github.com/kellymears) and [@strarsis](https://github.com/strarsis) for their help on this.

This is based off the refactor and suggestions that [@kellymears made in this PR](https://github.com/talss89/wp-editor-query-plugin/pull/2).

*This is an early release, and may contain bugs. Please raise issues here - I will be maintaining this actively.*

## Install

`npm install bud-wp-editor-query --save-dev` or `yarn add bud-wp-editor-query -D`

## How to use

1. Install it.
2. Mark your stylesheet using the `@media (wp-editor)` syntax below.
3. Your editor styles will be extracted to `./dist/editor/<module>.css` (or `./public/editor/<module>.css` if you're using Sage).

## Syntax

```css
@media all, (wp-editor) {
  /* Style is in both main and editor CSS */

  .your-styles-here {
    color: blue;
  }
}

@media (wp-editor) {
  /* Style is ONLY in editor CSS */

  .your-styles-here {
    color: blue;
  }
}

/* Nesting is OK... */

@media (wp-editor) {
  @media screen and (min-width: 1024px) {
    .your-style-here {
      width: 50%;
    }
  }
}

/* Non standard bubble-up... */

.parent {
  color: red;

  @media (wp-editor) {
    color: blue;
  }
}
```
