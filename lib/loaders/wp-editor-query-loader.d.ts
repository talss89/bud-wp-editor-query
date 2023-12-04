import type { LoaderContext } from 'webpack';
import type { Bud } from '@roots/bud-framework';
interface Options {
    bud: Bud;
    tailwind: any;
}
export default function (this: LoaderContext<Options>, source: any): void;
export {};
