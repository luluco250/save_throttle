import esbuild from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import process from "node:process";
import path from "node:path";
import url from "node:url";

function isExecuting() {
	const importPath = path.resolve(url.fileURLToPath(import.meta.url));
	const execPath = path.resolve(process.argv[1]);
	return importPath === execPath;
}

if (!isExecuting()) {
	console.log("This file is not meant to be imported.")
	process.exit(1);
}

const serve = process.argv.some((value, _) => value === "serve");

/** @type {import("esbuild").BuildOptions} */
const baseBuildOptions = {
	entryPoints: ["./source/main.tsx"],
	bundle: true,
	outdir: "./web",
	plugins: [solidPlugin()],
	logLevel: "debug",
	format: "esm",
	platform: "browser",
	target: ["es2022"]
};

if (!serve) {
	console.log("Building...");
	await esbuild.build({
		...baseBuildOptions,
		minify: true,
		treeShaking: true,
	});
	console.log("Done building.")
	process.exit(0);
}

console.log("Serving...");
const context = await esbuild.context({
	...baseBuildOptions,
	sourcemap: "linked",
});
await Promise.all([
	context.serve({
		port: 1234,
		servedir: "./web",
	}),
	context.watch(),
]);
console.log("Done serving.");
