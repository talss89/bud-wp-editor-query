import { __decorate } from "tslib";
import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import { bind, label } from '@roots/bud-framework/extension/decorators';
let BudWpEditorQuery = class BudWpEditorQuery extends Extension {
    async register(bud) {
        bud.build.setLoader(`wp-editor-query-loader`, await bud.module.resolve('bud-wp-editor-query/wp-editor-query-loader'));
        bud.build.setItem(`wp-editor`, {
            loader: 'wp-editor-query-loader',
            options: {
                frontend: false,
            },
        });
        bud.build.rules.css?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
        bud.build.setRule('editor-css', { ...bud.build.rules?.css });
    }
};
__decorate([
    bind
], BudWpEditorQuery.prototype, "register", null);
BudWpEditorQuery = __decorate([
    label(`bud-wp-editor-query`)
], BudWpEditorQuery);
export default BudWpEditorQuery;
