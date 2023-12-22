import { SerializeFrom } from "@remix-run/node";
import { GitHubUsernameEmails } from "github-username-to-emails";

import { InlinePre } from "./InlinePre.tsx";

export interface ResultsProps {
	data: SerializeFrom<GitHubUsernameEmails>;
	username: string;
}

export function Results({ data, username }: ResultsProps) {
	const fromEvents = Object.entries(data.events);

	return (
		<div>
			<h2>
				Results: <InlinePre>{username}</InlinePre>
			</h2>
			<h3>Account Email</h3>
			<div>
				{data.account ? (
					<>
						Found an email under the account:
						<InlinePre>{data.account}</InlinePre>
					</>
				) : (
					<>No email found under account...</>
				)}
			</div>
			<h3>Events Email(s)</h3>
			<div>
				{fromEvents.length ? (
					<>
						Found the following emails:
						<ul>
							{fromEvents.map(([email, names]) => (
								<li key={email}>
									<InlinePre>{email}</InlinePre>, with names: {names.join(", ")}
								</li>
							))}
						</ul>
					</>
				) : (
					<>No emails found under events...</>
				)}
			</div>
		</div>
	);
}
