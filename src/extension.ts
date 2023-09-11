import { Bud } from '@roots/bud-framework'

import { Extension } from '@roots/bud-framework/extension'
import type { WebpackPluginInstance } from '@roots/bud-framework/config'
import type { Compilation, Compiler } from 'webpack'

import webpack from 'webpack'

import {
  bind,
  label,
  // dependsOn
} from '@roots/bud-framework/extension/decorators'

interface Options {
}

@label(`bud-wp-editor-query`)
// @dependsOn('@roots/bud-extensions/postcss')
export default class BudWpEditorQuery extends Extension<Options, WebpackPluginInstance> {

  @bind
  public override async register(bud: Bud) {
    bud.build.setLoader(`wp-editor-query-loader`, await bud.module.resolve('bud-wp-editor-query/wp-editor-query-loader'))
    bud.build.setItem(`wp-editor`, {
        loader: 'wp-editor-query-loader',
        options: {}
      })
    bud.build.rules.css?.setUse((items = []) => {
        items.splice(items.indexOf('postcss'), 0, 'wp-editor')
        return items;   
    })
  }

  @bind
  public override async apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('BudWpEditorQuery', (compilation: Compilation) => {
        compilation.hooks.processAssets.tap(
            {
              name: 'BudWpEditorQuery',
              stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
              additionalAssets: true          
            },
            (assets) => {
              for (let i in assets) {
                const asset = compilation.getAsset(i);  // <- standardized version of asset object
                const contents = asset.source.source(); // <- standardized way of getting asset source
          
                // standardized way of updating asset source
                compilation.updateAsset(                
                  i,
                  new webpack.sources.RawSource(contents)
                );                                     
              }
            }
          );
    });
  }
}