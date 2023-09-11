import mediaquery from 'css-mediaquery';
// import postcss from 'postcss'
import store from './store.js';
const processEditorBlock = (atRule, removeFromMain = false) => {
    const ret = atRule.clone();
    atRule.replaceWith(atRule.nodes);
    return ret;
};
export const ExtractEditorRules = {
    postcssPlugin: "WpEditorExtractRules",
    AtRule(atRule) {
        if (atRule.name === `media`) {
            const ast = mediaquery.parse(atRule.params);
            if (ast.length == 1 && ast[0].expressions[0].feature == 'wp-editor') {
                // The block is exclusively for the editor.
                store.add(atRule.nodes.toString().split('},').join('}\n\n'));
            }
            else if (mediaquery.match(atRule.params, { type: 'screen', 'wp-editor': undefined })) {
                // The block is for both editor and frontend
                //store.add(atRule.clone().replaceWith(atRule.nodes).toString())
            }
        }
    },
};
export const RemoveEditorRules = {
    postcssPlugin: "WpEditorRemoveRules",
    AtRule(atRule) {
        if (atRule.name === `media`) {
            const ast = mediaquery.parse(atRule.params);
            if (ast.length == 1 && ast[0].expressions[0].feature == 'wp-editor') {
                // The block is exclusively for the editor.
                atRule.remove();
            }
            else if (mediaquery.match(atRule.params, { type: 'screen', 'wp-editor': undefined })) {
                // The block is for both editor and frontend
                return processEditorBlock(atRule, true);
            }
        }
    },
};
