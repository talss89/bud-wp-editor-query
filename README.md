# bud-wp-editor-query

Extracts wp-editor styles into a separate stylesheet. For WordPress FSE themes. A rewrite of the now defunct https://github.com/talss89/wp-editor-query-plugin

Thanks to [@kellymears](https://github.com/kellymears) and [@strarsis](https://github.com/strarsis) for their help on this.

This is based off the refactor and suggestions that [@kellymears made in this PR](https://github.com/talss89/wp-editor-query-plugin/pull/2).

## Install

`npm install bud-wp-editor-query --save-dev` or `yarn add bud-wp-editor-query -D`

## How to use

That's it. Install it. Editor stylesheet will be at `./dist/editor/<module>.css`

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

```
