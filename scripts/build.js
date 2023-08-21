import { build } from 'esbuild';
import * as path from 'path';
import { cp } from 'fs/promises';
async function main() {
	await build({
		entryPoints: [path.join('out', 'server', 'lambda-handler', 'index.js')],
		bundle: true,
		platform: 'node',
		target: ['esnext'],
		format: 'esm',
		outExtension: {
			'.js': '.mjs'
		},
		banner: {
			js: [
				`import { createRequire as topLevelCreateRequire } from 'module';`,
				`const require = topLevelCreateRequire(import.meta.url);`
			].join('')
		},
		outdir: path.join('build')
	});
	await cp(path.join('out','prerendered'),path.join('build','prerendered'),{
		recursive:true
	});
}
main()