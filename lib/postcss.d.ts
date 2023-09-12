export declare const ExtractEditorRules: {
  postcssPlugin: string
  prepare(): {
    Once(): void
    OnceExit(root: any): void
    AtRule(atRule: any): any
  }
}
export declare const RemoveEditorRules: {
  postcssPlugin: string
  AtRule: {
    media: (atRule: any) => any
  }
}
