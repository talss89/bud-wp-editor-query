import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import type { WebpackPluginInstance } from '@roots/bud-framework/config';
import type { Compiler } from 'webpack';
interface Options {
}
export default class BudWpEditorQuery extends Extension<Options, WebpackPluginInstance> {
    register(bud: Bud): Promise<void>;
    apply(compiler: Compiler): Promise<void>;
}
export {};
