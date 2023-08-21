import type { Builder } from '@sveltejs/kit';
import { bundleApp } from './bundle/build.js';
declare function adapter(): {
    name: string;
    adapt(builder: Builder): Promise<void>;
};
export { adapter, bundleApp };
