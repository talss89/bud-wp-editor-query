import {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import type {WebpackPluginInstance} from '@roots/bud-framework/config'

import {bind, label} from '@roots/bud-framework/extension/decorators'

interface Options {}

@label(`bud-wp-editor-query`)
export default class BudWpEditorQuery extends Extension<
  Options,
  WebpackPluginInstance
> {
  @bind
  public override async register(bud: Bud) {
    bud.build.setLoader(
      `wp-editor-query-loader`,
      await bud.module.resolve(
        'bud-wp-editor-query/wp-editor-query-loader',
      ),
    )
    bud.build.setItem(`wp-editor`, {
      loader: 'wp-editor-query-loader',
      options: {
        bud: bud,
        tailwind: await this.resolve(`tailwindcss`, import.meta.url)
      },
    }) 
  }

  @bind
  public override async configAfter(bud: Bud) {

    bud.build.rules.css?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })

    bud.build.rules.css?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })

    bud.build.rules.sass?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })

    bud.build.rules['css-module']?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })

    bud.build.rules['sass-module']?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })
  }

}
