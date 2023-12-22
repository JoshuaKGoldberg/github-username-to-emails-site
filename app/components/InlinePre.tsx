import React from "react";

import styles from "./InlinePre.module.css";

export function InlinePre({ children }: React.PropsWithChildren) {
	return <pre className={styles.inlinePre}>{children}</pre>;
}
