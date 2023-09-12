
import type BudWpEditorQuery from './extension.js'
import type {Item, Loader} from '@roots/bud-build'

declare module '@roots/bud-framework' {
  interface Modules {
    'bud-wp-editor-query': BudWpEditorQuery
  }

  interface Loaders {
    'wp-editor-query-loader': Loader
    'mini-css-extract-loader': Loader
  }

  interface Items {
    'wp-editor': Item
    'wp-editor-frontend': Item
    postcss: Item
  }

  interface Rules {
    'editor-css': Rule
  }

  interface Rule {
    issuerLayer: string
  }

  interface Bud {}

  interface Context {}
}
