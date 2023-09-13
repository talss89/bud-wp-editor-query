import { parse, join } from 'node:path';
import postcss from 'postcss';
import { ExtractEditorRules, RemoveEditorRules } from '../postcss.js';
const matchWpEditorUntilEndOfExpression = /,?(and|not)?\s*?\(\s?wp-editor\s?\).*(?=[{])/g;
export default function (source) {
    const callback = this.async();
    const parsed = parse(this.resourcePath);
    if (!containsQuery(source))
        return callback(null, source);
    postcss([ExtractEditorRules])
        .process(source, { from: parsed.base })
        /**
         * Extract the editor specific css from the source file
         * and emit it as a separate file
         */
        .then(extracted => {
        const emitPath = join(`editor`, parsed.base);
        if (extracted.toString().length > 0)
            this.emitFile(emitPath.replace(/\.(scss|sass)$/i, '.css'), extracted.toString().replace(matchWpEditorUntilEndOfExpression, ''));
        /**
         * Remove the editor specific css from the source file
         * and return the result
         */
        postcss([RemoveEditorRules])
            .process(source, { from: parsed.base })
            .then(result => {
            callback(null, result.toString().replace(matchWpEditorUntilEndOfExpression, ''));
        });
    });
}
const containsQuery = source => source.match(/@media.*\(?wp-editor\)?/);
