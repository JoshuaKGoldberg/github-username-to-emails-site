import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import markdown from "@eslint/markdown";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import markdownLinks from "eslint-plugin-markdown-links";
import n from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	globalIgnores(
		["build", "dist", "node_modules", "pnpm-lock.yaml", "public"],
		"Global Ignores",
	),
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	{
		extends: [
			comments.recommended,
			eslint.configs.recommended,
			jsdoc.configs["flat/contents-typescript-error"],
			jsdoc.configs["flat/logical-typescript-error"],
			jsdoc.configs["flat/stylistic-typescript-error"],
			n.configs["flat/recommended"],
			perfectionist.configs["recommended-natural"],
			regexp.configs["flat/recommended"],
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: ["**/*.{js,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ["*.config.*s"] },
			},
		},
		rules: {
			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: { perfectionist: { partitionByComment: true, type: "natural" } },
	},
	{
		extends: [jsonc.configs["flat/recommended-with-json"]],
		files: ["**/*.json"],
	},
	{
		extends: [markdown.configs.recommended, markdownLinks.configs.recommended],
		files: ["**/*.md"],
		rules: {
			// https://github.com/eslint/markdown/issues/294
			"markdown/no-missing-label-refs": "off",
		},
	},
	{
		extends: [
			comments.recommended,
			eslint.configs.recommended,
			n.configs["flat/recommended"],
			perfectionist.configs["recommended-natural"],
			regexp.configs["flat/recommended"],
		],
		files: ["**/*.mjs"],
	},
	{
		files: ["**/*.test.*", "eslint.config.*"],
		rules: { "n/no-unsupported-features/node-builtins": "off" },
	},
	{
		extends: [
			jsxA11y.flatConfigs.recommended,
			reactHooks.configs.flat.recommended,
		],
		files: ["**/*.tsx"],
	},
	{
		extends: [yml.configs["flat/standard"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": "error",
			"yml/sort-keys": "error",
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
	{
		files: ["eslint.config.*"],
		rules: {
			// eslint-plugin-jsx-a11y doesn't provide types
			"@typescript-eslint/no-unsafe-member-access": "off",
		},
	},
	{
		extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
		files: ["package.json"],
	},
);
