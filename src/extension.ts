import { Bud } from '@roots/bud-framework'

import { Extension } from '@roots/bud-framework/extension'
import type { WebpackPluginInstance } from '@roots/bud-framework/config'

import {
  bind,
  label
} from '@roots/bud-framework/extension/decorators'

interface Options {
}

@label(`bud-wp-editor-query`)
export default class BudWpEditorQuery extends Extension<Options, WebpackPluginInstance> {

  @bind
  public override async register(bud: Bud) {
    
  }
}