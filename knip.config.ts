import type { KnipConfig } from "knip";

export default {
	entry: ["server.mjs!"],
	ignoreDependencies: ["isbot"],
	ignoreExportsUsedInFile: { interface: true, type: true },
	treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
