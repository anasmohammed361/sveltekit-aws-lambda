import type { Builder } from "@sveltejs/kit";
declare function bundleApp(): Promise<void>;
declare function adapter(): {
    name: string;
    adapt(builder: Builder): Promise<void>;
};
export { adapter, bundleApp };
