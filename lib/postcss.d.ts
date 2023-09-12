export declare const ExtractEditorRules: {
  postcssPlugin: string
  prepare(): {
    Once(): void
    OnceExit(root: any): void
    AtRule: {
      media: (atRule: any) => any
    }
  }
}
export declare const RemoveEditorRules: {
  postcssPlugin: string
  AtRule: {
    media: (atRule: any) => any
  }
}
