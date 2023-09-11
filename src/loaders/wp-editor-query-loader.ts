import type { LoaderContext } from 'webpack'
import { join, parse } from 'node:path'

import postcss from 'postcss'
import { ExtractEditorRules, RemoveEditorRules } from '../postcss.js'
import store from '../store.js' 

interface Options { }

export default function (this: LoaderContext<Options>, source) {
    // const options = this.getOptions();
    const callback = this.async();
    const parsed = parse(this.resourcePath);

    if (!containsQuery(source)) return source;

    store.styles = "";

    postcss([ExtractEditorRules])
    .process(source, { from: parsed.base })
    /**
     * Extract the editor specific css from the source file
     * and emit it as a separate file
     */
    .then((extracted) => {
      const emitPath = join(`editor`, parsed.base);
      this.emitFile(emitPath, store.styles, '');

      /**
       * Remove the editor specific css from the source file
       * and return the result
       */
      postcss([RemoveEditorRules])
        .process(source, { from: parsed.base })
        .then((result) => {
          callback(null, result.toString());
        });
    });

    return source;
}

const containsQuery = (source) => source.match(/@media.*\(?wp-editor\)?/)
