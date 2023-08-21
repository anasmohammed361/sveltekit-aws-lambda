import type { Builder } from '@sveltejs/kit';
import { bundleApp } from './bundle/build';
declare function adapter(): {
    name: string;
    adapt(builder: Builder): Promise<void>;
};
export { adapter, bundleApp };
