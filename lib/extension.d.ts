/// <reference types="webpack" />
import { Bud } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework/extension';
import type { WebpackPluginInstance } from '@roots/bud-framework/config';
interface Options {
}
export default class BudWpEditorQuery extends Extension<Options, WebpackPluginInstance> {
    register(bud: Bud): Promise<void>;
}
export {};
