import { __decorate } from "tslib";
import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import webpack from 'webpack';
import { bind, label,
// dependsOn
 } from '@roots/bud-framework/extension/decorators';
let BudWpEditorQuery = class BudWpEditorQuery extends Extension {
    async register(bud) {
        bud.build.setLoader(`wp-editor-query-loader`, await bud.module.resolve('bud-wp-editor-query/wp-editor-query-loader'));
        bud.build.setItem(`wp-editor`, {
            loader: 'wp-editor-query-loader',
            options: {}
        });
        bud.build.rules.css?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
    }
    async apply(compiler) {
        compiler.hooks.thisCompilation.tap('BudWpEditorQuery', (compilation) => {
            compilation.hooks.processAssets.tap({
                name: 'BudWpEditorQuery',
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                additionalAssets: true
            }, (assets) => {
                for (let i in assets) {
                    const asset = compilation.getAsset(i); // <- standardized version of asset object
                    const contents = asset.source.source(); // <- standardized way of getting asset source
                    // standardized way of updating asset source
                    compilation.updateAsset(i, new webpack.sources.RawSource(contents));
                }
            });
        });
    }
};
__decorate([
    bind
], BudWpEditorQuery.prototype, "register", null);
__decorate([
    bind
], BudWpEditorQuery.prototype, "apply", null);
BudWpEditorQuery = __decorate([
    label(`bud-wp-editor-query`)
    // @dependsOn('@roots/bud-extensions/postcss')
], BudWpEditorQuery);
export default BudWpEditorQuery;
