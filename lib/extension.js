import { __decorate } from "tslib";
import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import { bind, label } from '@roots/bud-framework/extension/decorators';
let BudWpEditorQuery = class BudWpEditorQuery extends Extension {
    async register(bud) {
        process.exit(1);
    }
};
__decorate([
    bind
], BudWpEditorQuery.prototype, "register", null);
BudWpEditorQuery = __decorate([
    label(`bud-wp-editor-query`)
], BudWpEditorQuery);
export default BudWpEditorQuery;
