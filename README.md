# svlete-aws-lambda

**This adapter allows you to run  SvelteKit site on  [AWS](https://aws.amazon.com) lambda.**

---

### svelte.config.js

```
import { adapter } from 'sveltekit-lambda-adapter';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
```
---
### build.js

```
import {bundleApp} from "sveltekit-lambda-adapter"
bundleApp()
```
---
# Build app

```bash
npm run build
```
```bash
node build.js
```

---
[Chechout this blog](https://medium.com/@anasmohammed361/sveltekit-on-aws-lambda-cloudfront-s3-79d60d572f4d)
