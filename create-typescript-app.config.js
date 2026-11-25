// 👋 Hi! This is an optional config file for create-typescript-app (CTA).
// Repos created with CTA or its underlying framework Bingo don't use one by default.
// A CTA config file allows automatic updates to the repo that preserve customizations.
// For more information, see Bingo's docs:
//   https://www.create.bingo/execution#transition-mode
// Eventually these values should be inferable, making this config file unnecessary:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
import {
	blockCodecov,
	blockDevelopmentDocs,
	blockESLint,
	blockGitHubActionsCI,
	blockKnip,
	blockReleaseIt,
	blockSideEffects,
	blockTSDown,
	blockVitest,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			exclude: [
				blockCodecov,
				blockKnip,
				blockReleaseIt,
				blockSideEffects,
				blockTSDown,
				blockVitest,
			],
		},
		extensions: [
			blockDevelopmentDocs({
				sections: {
					Building: {
						contents: `
Run [Remix](https://remix.run) with a local dev server that hot-module-refreshes on file changes:

\`\`\`shell
pnpm dev
\`\`\`
`,
						innerSections: [
							{
								contents: `
Run Remix's builder to create a local version of the site:

\`\`\`shell
pnpm build
\`\`\`
`,
								heading: "Production Builds",
							},
						],
					},
					Linting: {
						contents: {
							items: [
								"- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
								"- `pnpm lint:knip:production` ([knip](https://knip.dev/features/production-mode)): Detects unused files, dependencies, and code exports in production code, not counting usage from tests",
							],
						},
					},
				},
			}),
			blockESLint({
				beforeLint:
					"Note that you'll need to run `pnpm build` before `pnpm lint` so that lint rules which check the file system can pick up on any built files.",
				extensions: [
					{
						extends: [
							"jsxA11y.flatConfigs.recommended",
							"reactHooks.configs.flat.recommended",
						],
						files: ["**/*.tsx"],
					},
					{
						extends: [
							"comments.recommended",
							"eslint.configs.recommended",
							'n.configs["flat/recommended"]',
							'perfectionist.configs["recommended-natural"]',
							'regexp.configs["flat/recommended"]',
						],
						files: ["**/*.mjs"],
					},
					{
						files: ["eslint.config.*"],
						rules: [
							{
								comment: "eslint-plugin-jsx-a11y doesn't provide types",
								entries: {
									"@typescript-eslint/no-unsafe-member-access": "off",
								},
							},
						],
					},
				],
				ignores: ["build", "public"],
				imports: [
					{
						source: {
							packageName: "eslint-plugin-jsx-a11y",
							version: "6.10.2",
						},
						specifier: "jsxA11y",
					},
					{
						source: {
							packageName: "eslint-plugin-react-hooks",
							version: "7.1.1",
						},
						specifier: "reactHooks",
					},
				],
				scriptFileExtensions: ["tsx"],
			}),
			blockGitHubActionsCI({
				jobs: [
					{ name: "Build", steps: [{ run: "pnpm build" }] },
					{ name: "Lint Knip", steps: [{ run: "pnpm lint:knip" }] },
					{
						name: "Lint Knip Production",
						steps: [{ run: "pnpm lint:knip:production" }],
					},
				],
			}),
		],
	},
});
