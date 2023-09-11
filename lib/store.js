class EditorStore {
    styles;
    constructor() {
        this.styles = "";
    }
    add(content) {
        this.styles += `${content}\n\n`;
    }
}
;
export default new EditorStore();
