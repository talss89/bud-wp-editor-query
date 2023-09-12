class EditorStore {
  styles: string

  constructor() {
    this.styles = ''
  }

  add(content) {
    this.styles += `${content}\n\n`
  }
}

export default new EditorStore()
