import { $session } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import Profile from "./profile";

export default async function Header() {
	const result = await $session();
	if (!result.success) {
		console.log(result.error);
		return null;
	}

	const menu = [
		{
			label: "Templates",
			href: "/templates",
		},
	];

	return (
		<nav className="border-b h-16 px-6 flex-shrink-0">
			<div className="flex items-center w-full h-full justify-between">
				<div className="flex items-center">
					<Link href="/" className="font-bold">
						GenDoc.
					</Link>
					<div className="flex items-center gap-4 ml-4 text-muted-foreground text-sm">
						{menu.map((item) => (
							<Link key={item.href} href={item.href}>
								{item.label}
							</Link>
						))}
					</div>
				</div>
				<Profile name={result.data.name} username={result.data.username} />
			</div>
		</nav>
	);
}
