import {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import type {WebpackPluginInstance} from '@roots/bud-framework/config'

import {
  bind,
  label
} from '@roots/bud-framework/extension/decorators'

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
        frontend: false,
      },
    })

    bud.build.rules.css?.setUse((items = []) => {
      items.splice(items.indexOf('postcss'), 0, 'wp-editor')
      return items
    })

    bud.build.setRule('editor-css', {...bud.build.rules?.css})
  }
}
