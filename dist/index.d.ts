import type { Builder } from '@sveltejs/kit';
export default function (): {
    name: string;
    adapt(builder: Builder): Promise<void>;
};
