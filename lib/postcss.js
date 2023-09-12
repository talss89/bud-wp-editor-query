import mediaquery from 'css-mediaquery';
import postcss from 'postcss';
const unwrapAndBubble = atRule => {
    if (atRule.nodes && atRule.nodes.length > 0 && atRule.nodes[0].type == 'decl') {
        const ghostNode = new postcss.Rule({ selector: atRule.parent.selector });
        ghostNode.append(atRule.clone().nodes);
        atRule.replaceWith(atRule.nodes);
    }
};
const shouldReplaceItself = ast => {
    return (ast.length < 2 &&
        (isMediaQueryForEditor(ast) || isMediaQueryForFrontend(ast)));
};
const isMediaQueryForEditor = ast => {
    return (ast.filter(a => a.expressions.filter(e => e.feature === `wp-editor`).length > 0).length > 0);
};
const isMediaQueryForFrontend = ast => {
    return (ast.filter(a => a.expressions.filter(e => e.feature === `wp-editor`).length === 0).length > 0);
};
export const ExtractEditorRules = {
    postcssPlugin: 'WpEditorExtractRules',
    prepare() {
        const variables = {};
        return {
            Once() {
                variables.extracted = new postcss.Root();
            },
            OnceExit(root) {
                root.nodes = variables.extracted.nodes;
                root.cleanRaws();
            },
            AtRule: {
                media: atRule => {
                    if (atRule.params.indexOf('wp-editor') === -1)
                        return;
                    const ast = mediaquery.parse(atRule.params);
                    if (isMediaQueryForEditor(ast)) {
                        // The block is exclusively for the editor.
                        unwrapAndBubble(atRule);
                        return variables.extracted.append(atRule.nodes);
                    }
                    atRule.remove();
                },
            },
        };
    },
};
export const RemoveEditorRules = {
    postcssPlugin: 'WpEditorRemoveRules',
    AtRule: {
        media: atRule => {
            if (atRule.params.indexOf('wp-editor') === -1)
                return;
            const ast = mediaquery.parse(atRule.params);
            if (isMediaQueryForFrontend(ast)) {
                unwrapAndBubble(atRule);
                if (shouldReplaceItself(ast)) {
                    return atRule.replaceWith(atRule.nodes);
                }
                return;
            }
            atRule.remove();
        },
    },
};
