import { __decorate } from "tslib";
import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import { bind, label } from '@roots/bud-framework/extension/decorators';
let BudWpEditorQuery = class BudWpEditorQuery extends Extension {
    async register(bud) {
        bud.build.setLoader(`wp-editor-query-loader`, await bud.module.resolve('bud-wp-editor-query/wp-editor-query-loader'));
        bud.build.setItem(`wp-editor`, {
            loader: 'wp-editor-query-loader',
            options: {},
        });
    }
    async configAfter(bud) {
        bud.build.rules.css?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
        bud.build.rules.css?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
        bud.build.rules.sass?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
        bud.build.rules['css-module']?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
        bud.build.rules['sass-module']?.setUse((items = []) => {
            items.splice(items.indexOf('postcss'), 0, 'wp-editor');
            return items;
        });
    }
};
__decorate([
    bind
], BudWpEditorQuery.prototype, "register", null);
__decorate([
    bind
], BudWpEditorQuery.prototype, "configAfter", null);
BudWpEditorQuery = __decorate([
    label(`bud-wp-editor-query`)
], BudWpEditorQuery);
export default BudWpEditorQuery;
