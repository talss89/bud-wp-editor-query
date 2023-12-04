import type { LoaderContext } from 'webpack'
import { parse, join } from 'node:path'

import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import { ExtractEditorRules, RemoveEditorRules } from '../postcss.js'

import type { Bud } from '@roots/bud-framework';

interface Options {
  bud: Bud
  tailwind: any
}

const matchWpEditorUntilEndOfExpression = /,?(and|not)?\s*?\(\s?wp-editor\s?\).*(?=[{])/g;

export default function (this: LoaderContext<Options>, source) {
  const callback = this.async()
  const parsed = parse(this.resourcePath)
  const bud = this.getOptions().bud

  if (!containsQuery(source)) return callback(null, source)

  postcss([ExtractEditorRules])
    .process(source, { from: parsed.base })
    /**
     * Extract the editor specific css from the source file
     * and emit it as a separate file
     */
    .then(async extracted => {
      const emitPath = join(`editor`, parsed.base)

      if (extracted.toString().length > 0) {

        if (bud.tailwind) {
          //@ts-ignore
          postcss([tailwindcss(bud.tailwind.getResolvedConfig())])
            .process(`@import 'tailwindcss/base';\n @import 'tailwindcss/components';\n` + extracted.css + `\n@import 'tailwindcss/utilities';\n`, { from: parsed.base })
            .then(result => {
              this.emitFile(emitPath.replace(/\.(scss|sass)$/i, '.css'), result.toString().replace(matchWpEditorUntilEndOfExpression, ''))
            })
        }

      }

      /**
       * Remove the editor specific css from the source file
       * and return the result
       */
      postcss([RemoveEditorRules])
        .process(source, { from: parsed.base })
        .then(result => {
          callback(null, result.toString().replace(matchWpEditorUntilEndOfExpression, ''))
        })
    })
}

const containsQuery = source => source.match(/@media.*\(?wp-editor\)?/)
