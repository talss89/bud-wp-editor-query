import mediaquery from 'css-mediaquery'
import postcss from 'postcss'
const unwrapAndBubble = atRule => {
  if (atRule.nodes.length > 0 && atRule.nodes[0].type == 'decl') {
    const ghostNode = new postcss.Rule({selector: atRule.parent.selector})
    ghostNode.append(atRule.clone().nodes)
    atRule.replaceWith(atRule.nodes)
    atRule.remove()
  }
}
export const ExtractEditorRules = {
  postcssPlugin: 'WpEditorExtractRules',
  prepare() {
    const variables = {}
    return {
      Once() {
        variables.extracted = new postcss.Root()
      },
      OnceExit(root) {
        root.nodes = variables.extracted.nodes
        root.cleanRaws()
      },
      AtRule(atRule) {
        if (atRule.name === `media`) {
          const ast = mediaquery.parse(atRule.params)
          if (
            ast.length == 1 &&
            ast[0].expressions[0].feature == 'wp-editor'
          ) {
            // The block is exclusively for the editor.
            unwrapAndBubble(atRule)
            return variables.extracted.append(atRule.nodes)
          }
        }
        atRule.remove()
      },
    }
  },
}
export const RemoveEditorRules = {
  postcssPlugin: 'WpEditorRemoveRules',
  AtRule: {
    media: atRule => {
      const ast = mediaquery.parse(atRule.params)
      if (
        ast.length == 1 &&
        ast[0].type === 'screen' &&
        ast[0].expressions[0].feature == 'wp-editor'
      ) {
        unwrapAndBubble(atRule)
        return atRule.replaceWith(atRule.nodes)
      }
      atRule.remove()
    },
  },
}
