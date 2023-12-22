import type { LoaderFunctionArgs } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";

import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	useLoaderData,
} from "@remix-run/react";
import { getGitHubUsernameEmails } from "github-username-to-emails"; // or cloudflare/deno

import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { Results } from "./components/Results.tsx";

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ href: cssBundleHref, rel: "stylesheet" }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username");

	return username ? json(await getGitHubUsernameEmails({ username })) : null;
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	const [params] = useSearchParams();
	const username = params.get("username") || undefined;

	return (
		<html lang="en">
			<head>
				<link href="data:image/x-icon;base64,AA" rel="icon" />
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				<form method="GET">
					<label htmlFor="username">Username:</label>
					<input
						defaultValue={username}
						id="username"
						name="username"
						type="text"
					/>
					<button type="submit">Submit</button>
				</form>
				{/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
				{data && <Results data={data} username={username!} />}
				<Footer />
				<Outlet />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
