import type BudWpEditorQuery from './extension.js'
import type {Item, Loader, Rule} from '@roots/bud-build'

declare module '@roots/bud-framework' {
  interface Modules {
    'bud-wp-editor-query': BudWpEditorQuery
  }

  interface Loaders {
    'wp-editor-query-loader': Loader
  }

  interface Items {
    'wp-editor': Item
  }

  interface Rules {
    'editor-css': Rule
  }

  interface Bud {}

  interface Context {}
}
